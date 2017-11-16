import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import {GameMenuPage} from "../game-menu/game-menu";

@Component({
  selector: 'story-two-page',
  templateUrl: 'story-two.html'
})

export class StoryTwoPage{
  beeImage: string = 'assets/images/bee.png';
  constructor(public navCtrl: NavController){

  }
  returnToHome(){
    this.navCtrl.push(GameMenuPage);
    this.navCtrl.setRoot(GameMenuPage);
  }
}
