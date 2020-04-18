// import { Directive, ElementRef, HostListener, Renderer2, HostBinding } from '@angular/core';
import { Directive, HostListener, HostBinding, ElementRef } from '@angular/core';

@Directive({
    selector:'[appDropDown]'
})
export class DropDownDirective{
    //******************* Method 2 ******************/

   @HostBinding('class.open') private isOpen:boolean=false;

   @HostListener('document:click',['$event']) toggleOpen(event:Event){
       this.isOpen= this.elRef.nativeElement.contains(event.target) ? !this.isOpen : false;
   }

   constructor(private elRef:ElementRef){}
}
    /*
    *****************-----------Method 1--------------************************
    private buttonStyleAdded:boolean = false;
    
    constructor(private elref:ElementRef, private renderer:Renderer2){}

    @HostListener('click') onMouseClick(){
        this.buttonStyleAdded = !this.buttonStyleAdded;
        this.toggleClass(this.buttonStyleAdded);
    }

    private toggleClass(toggleCheck:boolean){
        if(toggleCheck){
            this.renderer.addClass(this.elref.nativeElement,'open');
        }else{
            this.renderer.removeClass(this.elref.nativeElement,'open');
        }
    }
    */
   
// }