import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../../shared/data-storage.service';
import { RecipeService } from '../../recipes/recipe.service';
import { Response } from '@angular/http';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private dsService: DataStorageService, private recipeService: RecipeService, private authService: AuthService) { }

  ngOnInit() {
  }

  onSaveRecipes() {
    this.dsService.storeRecipes().subscribe(
      (response: Response) => {
        console.log(response);
      }
    );
  }

  getRecipes() {
    this.dsService.getRecipes();
  }

  onLogout() {
    this.authService.logout();
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }
}
