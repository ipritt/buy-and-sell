import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { ListingsService } from '../listings';
import { Listing } from '../types';
import { ListingDetailPage } from './listing-detail-page';

describe('ListingDetailPage', () => {
  let component: ListingDetailPage;
  let fixture: ComponentFixture<ListingDetailPage>;
  const listing: Listing = {
    id: '123',
    name: 'Guitar',
    description: 'My old guitar',
    price: '200.00',
    user_id: '12345',
    views: 3,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListingDetailPage],
      providers: [
        provideRouter([]),
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: convertToParamMap({ id: listing.id }) } },
        },
        {
          provide: ListingsService,
          useValue: {
            getListingById: () => of(listing),
            addViewToListing: () => of(listing),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ListingDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('displays the listing returned by the service', () => {
    expect(fixture.nativeElement.textContent).toContain('Guitar');
    expect(fixture.nativeElement.textContent).toContain('My old guitar');
    expect(fixture.nativeElement.textContent).toContain('$200.00');
    expect(fixture.nativeElement.textContent).not.toContain('Loading...');
  });
});
