import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { map, tap, take, exhaustMap } from 'rxjs/operators';

import { RecipeService } from './recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from '../auth/auth.service';

@Injectable({providedIn:'root'})

export class DataStorageService{
    
    constructor(private http:HttpClient, private recipeService:RecipeService, private authService:AuthService){}

    storeRecipes(){
        const recipes:Recipe[]=this.recipeService.getRecipes();
        this.http.put("https://ng-recipe-book-672cb.firebaseio.com/recipe.json",recipes)
        .subscribe(response=>{
            console.log(response);
        })
    }

    fetchRecipes(){
        return this.http.get<Recipe[]>("https://ng-recipe-book-672cb.firebaseio.com/recipe.json").pipe(
            map(recipes=>{
                return recipes.map(recipe=>{
                    return {...recipe, ingredients:recipe.ingredients?recipe.ingredients:[]}
                })
            }),
            tap(fetchedData=>{
                this.recipeService.addRecipeFromStore(fetchedData);
            })
        );   
    }
}