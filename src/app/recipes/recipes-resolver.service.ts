import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'

import { DataStorageService } from '../services/data-storage.service';
import { RecipeService } from '../services/recipe.service';
import { Recipe } from './recipe.model';

@Injectable({providedIn:'root'})

export class RecipesResolverService implements Resolve<Recipe[]>{

    constructor(private dataStorage:DataStorageService, private recipeService:RecipeService){}

    resolve(route:ActivatedRouteSnapshot, state:RouterStateSnapshot){
        const recipes:Recipe[]=this.recipeService.getRecipes();
        if(recipes.length===0){
            return this.dataStorage.fetchRecipes();
        }else{
            return recipes;
        }
    }


}