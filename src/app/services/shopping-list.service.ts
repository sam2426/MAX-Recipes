import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

export class ShoppingListService{
    
    ingredientListUpdated=new Subject<Ingredient[]>();
    startedEditing=new Subject<number>();

    private ingredients:Ingredient[]=[
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes',10)
    ];

    getIngedients(){
        return this.ingredients.slice();
    }

    getIngredient(index:number){
        return this.ingredients[index];
    }

    addIngredients(ingData:Ingredient){
        this.ingredients.push(ingData);
        this.ingredientListUpdated.next(this.ingredients.slice());
    }

    /*  by providing slice() in the ingredients for outputting the values.
        we are actually providing only the copied methods. and not the original array. 
        so as to negate the chances of accidentally updating the array from the outside methods.
    */
    addIngredientsFromRecipe(ingData:Ingredient[]){
        this.ingredients.push(...ingData);
        /**
         * here we are using spread operator.
         * as if we write this.ingredients.push(ingData); ingData which is actually an array will be inserted into the
         * ingredients as a whole. so the spread operator helps spreading the values of the array and then insert it individually as list of single ingredients.
         */
        this.ingredientListUpdated.next(this.ingredients.slice());
    }

    updateIngredient(index:number, newIngredient:Ingredient){
        this.ingredients[index]=newIngredient;
        this.ingredientListUpdated.next(this.ingredients.slice());
    }

    deleteIngredient(index:number){
        this.ingredients.splice(index,1);
        this.ingredientListUpdated.next(this.ingredients.slice());
    }
}