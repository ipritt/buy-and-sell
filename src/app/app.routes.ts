import { Routes } from '@angular/router';
import { ListingsPage } from './listings-page/listings-page';
import { ListingDetailPage } from './listing-detail-page/listing-detail-page';
import { ContactPage } from './contact-page/contact-page';
import { EditListingPage } from './edit-listing-page/edit-listing-page';
import { MyListingsPage } from './my-listings-page/my-listings-page';
import { NewListingPage } from './new-listing-page/new-listing-page';

export const routes: Routes = [
    { path: '', redirectTo: 'listings', pathMatch: 'full' },
    { path: 'listings', component: ListingsPage, pathMatch: 'full' },
    { path: 'listings/:id', component: ListingDetailPage },
    { path: 'contact/:id', component: ContactPage },
    { path: 'edit-listing/:id', component: EditListingPage },
    { path: 'my-listings', component: MyListingsPage },
    { path: 'new-listing', component: NewListingPage }
];
