import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListingDataForm } from '../listing-data-form/listing-data-form';
import { Listing } from '../types';
import { ListingsService } from '../listings';

@Component({
  imports: [ListingDataForm],
  selector: 'app-edit-listing-page',
  styleUrl: './edit-listing-page.css',
  templateUrl: './edit-listing-page.html',
})
export class EditListingPage implements OnInit {
  listing = signal<Listing | undefined>(undefined);
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private listingsService: ListingsService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.listingsService.getListingById(id).subscribe(listing => this.listing.set(listing));
    }
  }

  onSubmit(listing: Listing): void {
    const currentListing = this.listing();
    if (!currentListing) {
      return;
    }

    this.listingsService.editListing(
      currentListing.id,
      listing.name,
      listing.description,
      Number(listing.price)
    ).subscribe(() => {
      this.router.navigateByUrl('/my-listings');
    });
  }
}
