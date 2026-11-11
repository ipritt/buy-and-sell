import { Component, OnInit, signal } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { Listing } from '../types';
import { ListingsService } from '../listings';

@Component({
  imports: [RouterLink],
  selector: 'app-listing-detail-page',
  styleUrl: './listing-detail-page.css',
  templateUrl: './listing-detail-page.html',
})
export class ListingDetailPage implements OnInit {
  isLoading = signal(true);
  listing = signal<Listing | undefined>(undefined);

  constructor(private route: ActivatedRoute, private listingsService: ListingsService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.listingsService.getListingById(id!).subscribe({
      next: (listing) => {
        this.listing.set(listing);
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
      }
    });
    this.listingsService.addViewToListing(id!).subscribe({
      next: (listing) => {
        this.listing.set(listing);
      },
      error: () => {
        // Handle error if needed
      }
    });
  } 
}
