import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, provideRouter, Router } from '@angular/router';
import { of } from 'rxjs';
import { vi } from 'vitest';
import { ListingsService } from '../listings';
import { Listing } from '../types';
import { EditListingPage } from './edit-listing-page';

describe('EditListingPage', () => {
  let component: EditListingPage;
  let fixture: ComponentFixture<EditListingPage>;
  let editListing: ReturnType<typeof vi.fn>;
  let navigateByUrl: ReturnType<typeof vi.fn>;
  const listing: Listing = {
    id: '123',
    name: 'Guitar',
    description: 'My old guitar',
    price: '200.00',
    user_id: '12345',
    views: 3,
  };

  beforeEach(async () => {
    editListing = vi.fn().mockReturnValue(of(listing));
    navigateByUrl = vi.fn().mockReturnValue(Promise.resolve(true));

    await TestBed.configureTestingModule({
      imports: [EditListingPage],
      providers: [
        provideRouter([]),
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: convertToParamMap({ id: listing.id }) } },
        },
        {
          provide: Router,
          useValue: { navigateByUrl },
        },
        {
          provide: ListingsService,
          useValue: {
            getListingById: () => of(listing),
            editListing,
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditListingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('loads the listing into the edit form', () => {
    const inputs = fixture.nativeElement.querySelectorAll('input');

    expect(inputs[0].value).toBe('Guitar');
    expect(inputs[1].value).toBe('My old guitar');
    expect(inputs[2].value).toBe('200.00');
  });

  it('submits updated fields for the current listing and navigates on success', () => {
    component.onSubmit({ ...listing, name: 'Updated guitar', price: '250' });

    expect(editListing).toHaveBeenCalledWith('123', 'Updated guitar', 'My old guitar', 250);
    expect(navigateByUrl).toHaveBeenCalledWith('/my-listings');
  });
});
