import { Listing } from './types';

export const fakeListings: Listing[] = [{
    id: '123',
    name: 'Old Boat',
    description: 'A very old boat. Bargain price',
    price: "700",
    user_id: "user1",
    views: 0
}, {
    id: '345',
    name: 'Computer',
    description: 'From the 1990s, a classic!',
    price: "50",
    user_id: "user1",
    views: 0
}, {
    id: '456',
    name: 'Basketball Hoop',
    description: 'Good condition, free delivery',
    price: "100",
    user_id: "user1",
    views: 0
}];

export const fakeMyListings: Listing[] = [{
    id: '789',
    name: 'Bicycle',
    description: 'Bright blue, very fast',
    price: "75",
    user_id: "user1",
    views: 0
}, {
    id: '234',
    name: 'Electric Guitar',
    description: 'Needs new strings, but otherwise in very good condition',
    price: "99",
    user_id: "user1",
    views: 0
}, {
    id: '987',
    name: 'Playstation',
    description: 'Old playstation, still works though',
    price: "75",
    user_id: "user1",
    views: 0
}];