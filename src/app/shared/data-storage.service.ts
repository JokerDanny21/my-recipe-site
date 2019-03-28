import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class DataStorageService {

  constructor(private httpClient: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService
  ) { }

  storeRecipes() {
    const token = this.authService.getToken();

    return this.httpClient.put('https://danny-recipe-book.firebaseio.com//recipes.json?auth=' + token,
      this.recipeService.getRecipes());
  }

  getRecipes(): any {
    const token = this.authService.getToken();

    this.httpClient.get<Recipe[]>('https://danny-recipe-book.firebaseio.com//recipes.json?auth=' + token)
      .pipe(
        map(
          (recipes) => {
            for (const recipe of recipes) {
              if (!recipe['ingredients']) {
                recipe['ingredients'] = [];
              }
            }
            return recipes;
          }
        )
      ).subscribe(
        (recipes: Recipe[]) => {
          this.recipeService.setRecipes(recipes);
        }
      );
  }


}
