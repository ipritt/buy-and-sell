import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Listing } from '../types';
import { ListingsService } from '../listings';

@Component({
  imports: [FormsModule],
  selector: 'app-contact-page',
  styleUrl: './contact-page.css',
  templateUrl: './contact-page.html',
})
export class ContactPage implements OnInit {
  email: string = '';
  message = signal('');
  listing: Listing | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private listingsService: ListingsService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.listingsService.getListingById(id!).subscribe(listing => {
      this.listing = listing;
      this.message.set(`Hi, I'm interested in your ${this.listing.name.toLowerCase()}!`);
    });
  }

  sendMessage(): void {
    alert('Your message has been sent!');
    this.router.navigateByUrl('/listings');
  }
}
