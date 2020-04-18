import { Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from 'src/app/services/shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f',{static:false}) slForm:NgForm;
  subscription:Subscription;
  editMode:boolean=false;
  editedItemIndex:number;
  editedItem:Ingredient;

  constructor(private shopList:ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.shopList.startedEditing.subscribe((index)=>{
      this.editedItemIndex=index;
      this.editMode=true;
      this.editedItem=this.shopList.getIngredient(index);
      this.slForm.setValue({
        name:this.editedItem.name,
        amount:this.editedItem.amount
      })
    })
  }

  public onSubmitIngredient(formdata:NgForm){
    const val = formdata.value;
    const newIngredient=new Ingredient(val.name,val.amount);
    if(this.editMode){
      this.shopList.updateIngredient(this.editedItemIndex,newIngredient);
    }else{
      this.shopList.addIngredients(newIngredient);
    }
    this.editMode=false;
    formdata.reset();
  }

  resetForm(){
    this.editMode=false;
    this.slForm.reset();
  }

  deleteIng(){
    this.editMode=false;
    this.slForm.reset();
    this.shopList.deleteIngredient(this.editedItemIndex);
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
