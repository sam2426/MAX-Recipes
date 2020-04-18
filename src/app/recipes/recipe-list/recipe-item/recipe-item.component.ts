import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

  @Input() public recipeItem:Recipe;
  @Input() public index:number;

  constructor(private recipeService:RecipeService) { }

  ngOnInit() {
  }

  // public onSelected(){
  //   this.recipeSelected.emit();
  //   //note here the way, the emitted value is void of any data (void eventEmitter), and used to just notify the parent component 
  //   //that this particular item was selected.
  //   // however i had applied another technique, i just added an event listener to the parent component, and from there
  //   //the value was fetched and used. this technique showed a new way so wrote it..  
  // }

}
