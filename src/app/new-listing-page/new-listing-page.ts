import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ListingDataForm } from '../listing-data-form/listing-data-form';
import { ListingsService } from '../listings';
import { Listing } from '../types';

@Component({
  imports: [ListingDataForm],
  selector: 'app-new-listing-page',
  styleUrl: './new-listing-page.css',
  templateUrl: './new-listing-page.html',
})
export class NewListingPage implements OnInit {
  
  constructor(private router: Router, private listingsService: ListingsService) {}

  ngOnInit(): void {}

  onSubmit(listing: Listing): void {
    this.listingsService.createListing(
      listing.name,
      listing.description,
      Number(listing.price)
    ).subscribe(() => {
      this.router.navigateByUrl('/my-listings');
    });
  }
}
