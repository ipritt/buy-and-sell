import { Injectable, inject } from '@angular/core';
import { Listing } from './types';
import { Observable, from, of, switchMap, take, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Auth, authState } from '@angular/fire/auth';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
};

const httpOptionsWithAuthToken = (token: string) => ({
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'AuthToken': token
    })
});

@Injectable({ providedIn: 'root' })
export class ListingsService {
    private readonly http = inject(HttpClient);
    private readonly auth = inject(Auth);

    getListings(): Observable<Listing[]> {
        return this.http.get<Listing[]>('/api/listings');
    }

    getListingById(id: string): Observable<Listing> {
        return this.http.get<Listing>(`/api/listings/${id}`);
    }

    getListingsForUser(): Observable<Listing[]> {
        return authState(this.auth).pipe(
            switchMap(user => {
                if (!user) {
                    return of([]);
                }
                return from(user.getIdToken()).pipe(
                    switchMap(token =>
                        this.http.get<Listing[]>(
                            `/api/users/${user.uid}/listings`,
                            httpOptionsWithAuthToken(token)
                        )
                    )
                );
            })
        );
    }

    addViewToListing(id: string): Observable<Listing> {
        return this.http.post<Listing>(`/api/listings/${id}/add-view`, {}, httpOptions);
    }

    createListing(name: string, description: string, price: number): Observable<Listing> {
        return authState(this.auth).pipe(
            take(1),
            switchMap(user => {
                if (!user) {
                    return throwError(() => new Error('Sign-in is required to create a listing.'));
                }
                return from(user.getIdToken()).pipe(
                    switchMap(token =>
                        this.http.post<Listing>(
                            '/api/listings',
                            { name, description, price },
                            httpOptionsWithAuthToken(token)
                        )
                    )
                );
            })
        );
    }

    editListing(id: string, name: string, description: string, price: number): Observable<Listing> {
        return authState(this.auth).pipe(
            take(1),
            switchMap(user => {
                if (!user) {
                    return throwError(() => new Error('Sign-in is required to edit a listing.'));
                }
                return from(user.getIdToken()).pipe(
                    switchMap(token =>
                        this.http.post<Listing>(
                            `/api/listings/${id}`,
                            { name, description, price },
                            httpOptionsWithAuthToken(token)
                        )
                    )
                );
            })
        );
    }

    deleteListing(id: string): Observable<void> {
        return authState(this.auth).pipe(
            take(1),
            switchMap(user => {
                if (!user) {
                    return throwError(() => new Error('Sign-in is required to delete a listing.'));
                }
                return from(user.getIdToken()).pipe(
                    switchMap(token =>
                        this.http.delete<void>(`/api/listings/${id}`, 
                            httpOptionsWithAuthToken(token)
                        )
                    )
                );
            })
        );
    }
}
