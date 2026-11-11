import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Listing } from '../types';
import { ListingsService } from '../listings';

@Component({
  imports: [RouterLink],
  selector: 'app-my-listings-page',
  styleUrl: './my-listings-page.css',
  templateUrl: './my-listings-page.html',
})

export class MyListingsPage implements OnInit {
  listings = signal<Listing[]>([]);

  constructor(private listingsService: ListingsService) {}

  ngOnInit(): void {
    this.listingsService.getListingsForUser().subscribe(listings => this.listings.set(listings));
  }

  onDeleteClicked(listingId: string): void {
      this.listingsService.deleteListing(listingId).subscribe(() => {
      this.listings.update(listings => listings.filter(listing => listing.id !== listingId));
    })
  }

}
