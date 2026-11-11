import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListingDataForm } from './listing-data-form';

describe('ListingDataForm', () => {
  let component: ListingDataForm;
  let fixture: ComponentFixture<ListingDataForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListingDataForm],
    }).compileComponents();

    fixture = TestBed.createComponent(ListingDataForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
