import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController } from 'ionic-angular';
import { NgForm, NgModel } from '@angular/forms';
import { RowOneInterface, RowTwoInterface, RowThreeInterface, BlockSumInterface } from '../../interfaces/level-one-interface';
import { GameMenuPage } from '../game-menu/game-menu';
import { LevelTwoPage } from '../level-two/level-two';

@Component({
  selector: 'level-one-page',
  templateUrl: 'level-one.html'
})
export class LevelOnePage{
  rowOneValues : RowOneInterface = { row1NumberOne: null, row1NumberTwo: null, row1NumberThree: null };
  rowTwoValues : RowTwoInterface = { row2NumberOne: null, row2NumberTwo: null, row2NumberThree: null };
  rowThrValues : RowThreeInterface = { row3NumberOne: null, row3NumberTwo: null, row3NumberThree: null };
  blockSum : BlockSumInterface = { rowOneSum: 0, rowTwoSum: 0, rowThrSum: 0, colOneSum: 0, colTwoSum: 0, colThrSum: 0, diaOneSum: 0, diaTwoSum: 0 };
  valuesArray: number[];
  isLevelCompleted : boolean = false;
  spiderImage: string = 'assets/images/spider.png';

  constructor(private navCtrl: NavController, private storage: Storage){

  }
  onValueChange(event, form: NgForm, model: NgModel){
    /* Rows */
    this.calculateRowOneSum();
    this.calculateRowTwoSum();
    this.calculateRowThrSum();

    /* Columns */
    this.calculateColOneSum();
    this.calculateColTwoSum();
    this.calculateColThrSum();

    /* Limit range */
    this.isValueWithinRange(parseInt(event), model);

    /* Handle duplicates */
    this.isValueDuplicate(parseInt(event), model);
    this.isLevelCompleted = this.isLevelCleared();
    if(this.isLevelCompleted){
      this.setLevelCompleted();
    }
  }

/* Rows */
  calculateRowOneSum() : number{
    this.blockSum.rowOneSum = 0;
    if(this.isRowOneValid()){
      this.blockSum.rowOneSum = parseInt(this.rowOneValues.row1NumberOne.toString())
      + parseInt(this.rowOneValues.row1NumberTwo.toString())
      + parseInt(this.rowOneValues.row1NumberThree.toString());
    }
    return this.blockSum.rowOneSum;
  }

  calculateRowTwoSum() : number{
    this.blockSum.rowTwoSum = 0;
    if(this.isRowTwoValid()){
      this.blockSum.rowTwoSum = parseInt(this.rowTwoValues.row2NumberOne.toString())
      + parseInt(this.rowTwoValues.row2NumberTwo.toString())
      + parseInt(this.rowTwoValues.row2NumberThree.toString());
    }
    return this.blockSum.rowTwoSum;
  }

  calculateRowThrSum() : number{
    this.blockSum.rowThrSum = 0;
    if(this.isRowThreeValid()){
      this.blockSum.rowThrSum = parseInt(this.rowThrValues.row3NumberOne.toString())
      + parseInt(this.rowThrValues.row3NumberTwo.toString())
      + parseInt(this.rowThrValues.row3NumberThree.toString());
    }
    return this.blockSum.rowThrSum;
  }


  isRowOneValid() : boolean{
    return (this.rowOneValues.row1NumberOne !== null && this.rowOneValues.row1NumberOne.toString() !== ""
            && this.rowOneValues.row1NumberTwo !== null && this.rowOneValues.row1NumberTwo.toString() !== ""
            && this.rowOneValues.row1NumberThree !== null && this.rowOneValues.row1NumberThree.toString() !== "");
  }

  isRowTwoValid() : boolean{
    return (this.rowTwoValues.row2NumberOne !== null && this.rowTwoValues.row2NumberOne.toString() !== ""
            && this.rowTwoValues.row2NumberTwo !== null && this.rowTwoValues.row2NumberTwo.toString() !== ""
            && this.rowTwoValues.row2NumberThree !== null && this.rowTwoValues.row2NumberThree.toString() !== "");
  }

  isRowThreeValid() : boolean{
      return (this.rowThrValues.row3NumberOne !== null && this.rowThrValues.row3NumberOne.toString() !== ""
              && this.rowThrValues.row3NumberTwo !== null && this.rowThrValues.row3NumberTwo.toString() !== ""
              && this.rowThrValues.row3NumberThree !== null && this.rowThrValues.row3NumberThree.toString() !== "");
  }


  /* Columns */
  calculateColOneSum() : number{
    this.blockSum.colOneSum = 0;
    if(this.isColumnOneValid()){
        this.blockSum.colOneSum = parseInt(this.rowOneValues.row1NumberOne.toString())
        + parseInt(this.rowTwoValues.row2NumberOne.toString())
        + parseInt(this.rowThrValues.row3NumberOne.toString());
      }
      return this.blockSum.colOneSum;
  }

  calculateColTwoSum() : number{
    this.blockSum.colTwoSum = 0;
    if(this.isColumnTwoValid()){
      this.blockSum.colTwoSum = parseInt(this.rowOneValues.row1NumberTwo.toString())
      + parseInt(this.rowTwoValues.row2NumberTwo.toString())
      + parseInt(this.rowThrValues.row3NumberTwo.toString());
    }
    return this.blockSum.colTwoSum;
  }

  calculateColThrSum() : number{
    this.blockSum.colThrSum = 0;
    if(this.isColumnThreeValid()){
      this.blockSum.colThrSum = parseInt(this.rowOneValues.row1NumberThree.toString())
      + parseInt(this.rowTwoValues.row2NumberThree.toString())
      + parseInt(this.rowThrValues.row3NumberThree.toString());
    }
    return this.blockSum.colThrSum;
  }


  isColumnOneValid() : boolean{
    return (this.rowOneValues.row1NumberOne !== null && this.rowOneValues.row1NumberOne.toString() !== ""
            && this.rowTwoValues.row2NumberOne !== null && this.rowTwoValues.row2NumberOne.toString() !== ""
            && this.rowThrValues.row3NumberOne !== null && this.rowThrValues.row3NumberOne.toString() !== "");
  }

  isColumnTwoValid() : boolean{
    return (this.rowOneValues.row1NumberTwo !== null && this.rowOneValues.row1NumberTwo.toString() !== ""
            && this.rowTwoValues.row2NumberTwo !== null && this.rowTwoValues.row2NumberTwo.toString() !== ""
            && this.rowThrValues.row3NumberTwo !== null && this.rowThrValues.row3NumberTwo.toString() !== "");
  }

  isColumnThreeValid() : boolean{
    return (this.rowOneValues.row1NumberThree !== null && this.rowOneValues.row1NumberThree.toString() !== ""
            && this.rowTwoValues.row2NumberThree !== null && this.rowTwoValues.row2NumberThree.toString() !== ""
            && this.rowThrValues.row3NumberThree !== null && this.rowThrValues.row3NumberThree.toString() !== "");
  }



  isLevelCleared() : boolean{
    let elements = document.querySelectorAll('.card');
    let successColor = 'success';
    if (this.calculateRowOneSum() == 15 && this.calculateRowTwoSum() == 15 && this.calculateRowThrSum() == 15
          && this.calculateColOneSum() == 15 && this.calculateColTwoSum() == 15 && this.calculateColThrSum() == 15){
      for(let i = 0; i < elements.length; i++){
        elements.item(i).classList.add(successColor);
      }
      return true;
    } else {
      for(let i = 0; i < elements.length; i++){
        if(elements.item(i).classList.contains(successColor)){
          elements.item(i).classList.remove(successColor);
        }
      }
    }
  }

  isValueDuplicate(value: number, model: NgModel) : boolean {
    this.valuesArray = [
      this.rowOneValues.row1NumberOne,
      this.rowOneValues.row1NumberTwo,
      this.rowOneValues.row1NumberThree,

      this.rowTwoValues.row2NumberOne,
      this.rowTwoValues.row2NumberTwo,
      this.rowTwoValues.row2NumberThree,

      this.rowThrValues.row3NumberOne,
      this.rowThrValues.row3NumberTwo,
      this.rowThrValues.row3NumberThree
    ];
    let namesArray = [
      'row1NumberOne', 'row1NumberTwo', 'row1NumberThree',
      'row2NumberOne', 'row2NumberTwo', 'row2NumberThree',
      'row3NumberOne', 'row3NumberTwo', 'row3NumberThree'
    ];
    let isDuplicate = false;
    for(let i = 0; i < this.valuesArray.length - 1; i++){
      if(namesArray[i] === model.name){
        continue;
      } else {
        if(this.valuesArray[i] == value){
          /* MAGIC */
          //this.setWarningColor(namesArray[i]);
          model.reset();
          isDuplicate = true;
        } else {
          /* MAGIC */
          //this.removeWarningColor(name);
        }
      }
    }
    return isDuplicate;
  }

  isValueWithinRange(value: number, input: NgModel) : boolean{
    if(value < 1 || value > 9){
      input.reset();
    }
    return true;
  }

  setWarningColor(inputname: string) : void{
    let element = document.querySelector('input[name=' + inputname + ']')
    .closest('.card');
    if(element.classList.contains('success')){
      element.classList.remove('success');
    }
    element.classList.add('duplicate');
  }

  removeWarningColor(inputname: string) : void {
    let element = document.querySelector('input[name=' + inputname + ']')
    .closest('.card');
    if(element.classList.contains('duplicate')){
      element.classList.remove('duplicate');
    }
  }

  restartLevel(form: NgForm){
    form.form.reset();
    this.isLevelCompleted = this.isLevelCleared();
    this.blockSum.rowOneSum = 0; this.blockSum.rowTwoSum = 0; this.blockSum.rowThrSum = 0;
    this.blockSum.colOneSum = 0; this.blockSum.colTwoSum = 0; this.blockSum.colThrSum = 0;
  }

  quitGame(){
    this.navCtrl.push(GameMenuPage);
    this.navCtrl.setRoot(GameMenuPage);
  }

  moveToNextLevel(){
    this.navCtrl.push(LevelTwoPage);
    this.navCtrl.setRoot(LevelTwoPage);
  }

  setLevelCompleted(){
    this.storage.set('LevelOneComplete', true);
  }
}
