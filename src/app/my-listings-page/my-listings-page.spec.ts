import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { ListingsService } from '../listings';
import { Listing } from '../types';
import { MyListingsPage } from './my-listings-page';

describe('MyListingsPage', () => {
  let component: MyListingsPage;
  let fixture: ComponentFixture<MyListingsPage>;
  const listings: Listing[] = [
    {
      id: '123',
      name: 'Guitar',
      description: 'My old guitar',
      price: '200.00',
      user_id: '12345',
      views: 3,
    },
    {
      id: '124',
      name: 'Boat',
      description: 'An old boat',
      price: '700.00',
      user_id: '12345',
      views: 0,
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyListingsPage],
      providers: [
        provideRouter([]),
        {
          provide: ListingsService,
          useValue: {
            getListingsForUser: () => of(listings),
            deleteListing: () => of(void 0),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MyListingsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('displays listings returned by the service', () => {
    expect(fixture.nativeElement.textContent).toContain('Guitar');
    expect(fixture.nativeElement.textContent).toContain('My old guitar');
    expect(fixture.nativeElement.textContent).toContain('Boat');
  });

  it('removes a listing after deletion', () => {
    component.onDeleteClicked('123');
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).not.toContain('Guitar');
    expect(fixture.nativeElement.textContent).toContain('Boat');
  });
});
