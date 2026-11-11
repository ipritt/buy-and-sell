import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBar } from './nav-bar/nav-bar';
import { AsyncPipe } from '@angular/common';
import { Auth, GoogleAuthProvider, signInWithPopup, signOut, user } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavBar, AsyncPipe],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('buy-and-sell');
  readonly user$;

  constructor(public auth: Auth) {
    this.user$ = user(auth);
  }

  signInClicked() {
    return signInWithPopup(this.auth, new GoogleAuthProvider());
  }

  signOutClicked() {
    return signOut(this.auth);
  }
}
