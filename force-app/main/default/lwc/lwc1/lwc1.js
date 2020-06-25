import { LightningElement } from 'lwc';
export default class HelloWorld extends LightningElement {
  //test1
  greeting = 'World';
  changeHandler(event) {
    this.greeting = event.target.value;
  }
}