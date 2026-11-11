import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Listing } from "../types";

@Component({
  imports: [FormsModule],
  selector: 'app-listing-data-form',
  styleUrl: './listing-data-form.css',
  templateUrl: './listing-data-form.html',
})
export class ListingDataForm implements OnInit {
  @Input() buttonText: string = '';
  @Input() currentName: string = '';
  @Input() currentDescription: string = '';
  @Input() currentPrice: string = '';

  name: string = '';
  description: string = '';
  price: string = '';

  @Output() onSubmit = new EventEmitter<Listing>();
  
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.name = this.currentName;
    this.description = this.currentDescription;
    this.price = this.currentPrice;
  }

  onButtonClicked(): void {
    this.onSubmit.emit({ 
      id: "",
      name: this.name,
      description: this.description,
      price: this.price,
      user_id: "",
      views: 0
     });
  }
}
