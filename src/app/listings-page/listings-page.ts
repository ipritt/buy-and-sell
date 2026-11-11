import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Listing } from '../types';
import { ListingsService } from '../listings';

@Component({
  imports: [RouterLink],
  selector: 'app-listings-page',
  styleUrl: './listings-page.css',
  templateUrl: './listings-page.html',
})
export class ListingsPage implements OnInit {
  listings = signal<Listing[]>([]);

  constructor(private listingsService: ListingsService) {}

  ngOnInit() {
    this.listingsService.getListings().subscribe((listings) => {
      this.listings.set(listings);
    });
  }
}
