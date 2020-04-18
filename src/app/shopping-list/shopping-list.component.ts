import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../services/shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients:Ingredient[];
  private ingChangeSubscption:Subscription;

  constructor(private shopService:ShoppingListService) { }

  ngOnInit() {
    this.ingredients=this.shopService.getIngedients();

    this.ingChangeSubscption = this.shopService.ingredientListUpdated.subscribe((ingUpdatedList:Ingredient[])=>{
      this.ingredients=ingUpdatedList;
    })
  }

  onEditItem(index:number){
    this.shopService.startedEditing.next(index);
  }

  ngOnDestroy() {
    this.ingChangeSubscption.unsubscribe();
  }

}
