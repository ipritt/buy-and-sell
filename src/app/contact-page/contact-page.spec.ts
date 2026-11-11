import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { ListingsService } from '../listings';
import { Listing } from '../types';
import { ContactPage } from './contact-page';

describe('ContactPage', () => {
  let component: ContactPage;
  let fixture: ComponentFixture<ContactPage>;
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
      imports: [ContactPage],
      providers: [
        provideRouter([]),
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: convertToParamMap({ id: listing.id }) } },
        },
        {
          provide: ListingsService,
          useValue: { getListingById: () => of(listing) },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('displays a message for the loaded listing', () => {
    const textarea: HTMLTextAreaElement = fixture.nativeElement.querySelector('textarea');

    expect(textarea.value).toBe("Hi, I'm interested in your guitar!");
  });
});
