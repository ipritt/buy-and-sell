import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListingsPage } from './listings-page';
import { ListingsService } from '../listings';
import { Listing } from '../types';
import { of } from 'rxjs';
import { provideRouter } from '@angular/router';

describe('ListingsPage', () => {
  let component: ListingsPage;
  let fixture: ComponentFixture<ListingsPage>;
  const listings: Listing[] = [{
    id: '123',
    name: 'Guitar',
    description: 'My old guitar',
    price: '200.00',
    user_id: '12345',
    views: 3,
  }];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListingsPage],
      providers: [{
        provide: ListingsService,
        useValue: { getListings: () => of(listings) },
      }, provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(ListingsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('displays listings returned by the service', () => {
    expect(fixture.nativeElement.textContent).toContain('Guitar - $200.00');
    expect(fixture.nativeElement.querySelector('a').getAttribute('href')).toBe('/listings/123');
  });
});
