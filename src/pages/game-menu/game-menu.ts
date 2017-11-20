import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController } from 'ionic-angular';
import { LevelOnePage } from '../level-one/level-one';
import { LevelTwoPage } from '../level-two/level-two';
import { AboutPage } from '../about/about';
import { InstructionsPage } from '../instructions/instructions';
import { Platform} from "ionic-angular";

@Component({
  selector: 'game-menu',
  templateUrl: 'game-menu.html'
})

export class GameMenuPage{
  showContinue: boolean;
  constructor(private navCtrl: NavController, private storage: Storage, private platform: Platform){
    this.isLevelOneComplete();
  }
  /*ngOnInit(){
    this.showContinue = this.isLevelOneComplete();
  }*/
  continueGame(){
    if(this.showContinue){
      this.navCtrl.push(LevelTwoPage);
      //this.navCtrl.setRoot(LevelTwoPage);
    }
  }
  launchGame(){
    this.removeLevelOneCompletion();
    this.navCtrl.push(LevelOnePage);
    //this.navCtrl.setRoot(LevelOnePage);
  }
  viewAbout(){
    this.navCtrl.push(AboutPage);
  }
  viewInstructions(){
    this.navCtrl.push(InstructionsPage);
  }
  isLevelOneComplete() : void{
    this.storage.get('LevelOneComplete').then(value =>{
      if(value !== null){
        this.showContinue = true;
      }
    });
  }
  removeLevelOneCompletion(){
    this.storage.remove('LevelOneComplete');
  }

  exitGame(){
    this.platform.exitApp();
  }
}
