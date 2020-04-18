export class Ingredient{
    constructor(public name:string, public amount:number) {}
}

//the above class definition can also be written as below:
/***
 * by writing access specifier with the variables in the constructor 
 * angular automatically eclares the variable like done below
 */

// export class Ingredient{
//     public name:string;
//     public amount:number;

//     constructor(name:string, amount:number) {
//         this.name=name;
//         this.amount=amount;
//     }
// }