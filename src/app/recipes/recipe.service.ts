import { Recipe } from './recipe.model';
import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/Ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [

    new Recipe('BigMac Menu', 'Menu from McDonalds',
      'https://fm.cnbc.com/applications/cnbc.com/resources/img/editorial/2018/03/06/105047065-GettyImages-921740554.1910x1000.jpg',
      [
        new Ingredient('Meat', 2),
        new Ingredient('Fries', 25)
      ]),
    new Recipe('Spaghetti Bolognese', 'Itlian Spaghetti Bolognese',
      'https://food-images.files.bbci.co.uk/food/recipes/easy_spaghetti_bolognese_93639_16x9.jpg',
      [
        new Ingredient('Pasta', 25),
        new Ingredient('Sauce', 1)
      ])
  ];

  constructor(private slService: ShoppingListService) { }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
