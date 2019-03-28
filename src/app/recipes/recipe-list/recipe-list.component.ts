import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataStorageService } from 'src/app/shared/data-storage.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  recipes: Recipe[];

  // tslint:disable-next-line:max-line-length
  constructor(private recipeService: RecipeService, private route: ActivatedRoute, private router: Router, private dataStorageService: DataStorageService) { }

  ngOnInit() {
    this.recipes = this.recipeService.getRecipes();

    // load at start marche pas à cause de du token
    // this.recipes = this.dataStorageService.getRecipes();
    this.subscription = this.recipeService.recipesChanged.subscribe(
      (recipe: Recipe[]) => {
        this.recipes = recipe;
      }
    );
  }

  onNew() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
