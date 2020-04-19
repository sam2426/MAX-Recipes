import { Injectable } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../shopping-list/store/shopping-list.actions';
import * as fromShoppingList from '../shopping-list/store/shopping-list.reducer';

@Injectable()
export class RecipeService {

  constructor(
    private slService: ShoppingListService,
    private store: Store<fromShoppingList.AppState>
  ) { }

  recipesChanged = new Subject<Recipe[]>();

  // private recipes : Recipe[]=[
  //     new Recipe(
  //         'Veg Burger',
  //         "we got u covered, Vegans",
  //         "https://assets3.thrillist.com/v1/image/2852466/size/tmg-article_main_wide_2x.jpg",
  //         [
  //             new Ingredient('Buns',2),
  //             new Ingredient('Cabbage',3),
  //             new Ingredient('Potato',2)
  //         ]
  //     ),
  //     new Recipe(
  //         'Chicken Burger',
  //         'The all you can eat meal',
  //         "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AABHnbv.img?h=416&w=799&m=6&q=60&u=t&o=f&l=f&x=1163&y=707",
  //         [
  //             new Ingredient('Buns',2),
  //             new Ingredient('Meat', 2),
  //             new Ingredient('Onion',1)
  //         ]
  //     )
  // ];

  private recipes: Recipe[] = [];

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes.slice()[index];
  }

  addIngredientToShoppingList(recipeData: Recipe) {
    // this.slService.addIngredientsFromRecipe(recipeData.ingredients);
    this.store.dispatch(new ShoppingListActions.AddIngredients(recipeData.ingredients));
  }

  addRecipe(newRecipeData: Recipe) {
    this.recipes.push(newRecipeData);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, updatedRecipeData: Recipe) {
    this.recipes[index] = updatedRecipeData;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(id: number) {
    this.recipes.splice(id, 1);
    this.recipesChanged.next(this.recipes.slice());
  }

  addRecipeFromStore(data: Recipe[]) {
    this.recipes = data;
    this.recipesChanged.next(this.recipes.slice());
  }
}
