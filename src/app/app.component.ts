import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
// You don't need to import firebase/app either since it's being imported above
import 'firebase/auth';
import 'firebase/database';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ngOnInit() {
    firebase.initializeApp({
      apiKey: 'AIzaSyB09SauSgLmi8_XcPmIFTuI2YF4zFFSwRE',
      authDomain: 'danny-recipe-book.firebaseapp.com',
    });
  }
}
