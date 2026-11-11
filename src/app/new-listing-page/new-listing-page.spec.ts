import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { vi } from 'vitest';
import { ListingsService } from '../listings';
import { Listing } from '../types';
import { NewListingPage } from './new-listing-page';

describe('NewListingPage', () => {
  let component: NewListingPage;
  let fixture: ComponentFixture<NewListingPage>;
  let createListing: ReturnType<typeof vi.fn>;
  let navigateByUrl: ReturnType<typeof vi.fn>;
  const listing: Listing = {
    id: '',
    name: 'Guitar',
    description: 'My old guitar',
    price: '200',
    user_id: '',
    views: 0,
  };

  beforeEach(async () => {
    createListing = vi.fn().mockReturnValue(of(listing));
    navigateByUrl = vi.fn().mockReturnValue(Promise.resolve(true));

    await TestBed.configureTestingModule({
      imports: [NewListingPage],
      providers: [
        provideRouter([]),
        {
          provide: Router,
          useValue: { navigateByUrl },
        },
        {
          provide: ListingsService,
          useValue: { createListing },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NewListingPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('passes submitted form values to the listings service', () => {
    component.onSubmit(listing);

    expect(createListing).toHaveBeenCalledWith('Guitar', 'My old guitar', 200);
    expect(navigateByUrl).toHaveBeenCalledWith('/my-listings');
  });
});
