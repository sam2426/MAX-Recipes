import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../services/shopping-list.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromShoppingList from './store/shopping-list.reducer';
import * as ShoppingListActions from './store/shopping-list.actions';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Observable<{ ingredients: Ingredient[] }>;
  // private ingChangeSubscption: Subscription;

  constructor(
    private shopService: ShoppingListService,
    private store: Store<fromShoppingList.AppState>
  ) { }

  ngOnInit() {
    this.ingredients = this.store.select('shoppingList');
    /**
     * the ingredients being an Observable is used in template by using async pipe.
     * however to use that somewhere else we can always subscribe to it and get the ingredients[].
     * ngRx will supposedly take care of clearing the subscription after we leave the page,
     * but still we should explicitly store the subscription in an variable and unsubscribe it in ngOnDestroy() manually.
     **/
    // this.ingredients = this.shopService.getIngedients();

    // this.ingChangeSubscption = this.shopService.ingredientListUpdated.subscribe((ingUpdatedList: Ingredient[]) => {
    //   this.ingredients = ingUpdatedList;
    // })
  }

  onEditItem(index: number) {
    // this.shopService.startedEditing.next(index);
    this.store.dispatch(new ShoppingListActions.StartEdit(index));
  }

  ngOnDestroy() {
    // this.ingChangeSubscption.unsubscribe();
  }

}
