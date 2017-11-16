import { Component } from "@angular/core";
import { NavController} from "ionic-angular";
import {LevelTwoPage} from "../level-two/level-two";

@Component({
  selector: 'story-one-page',
  templateUrl: 'story-one.html'
})

export class StoryOnePage{
  constructor(public navCtrl: NavController){

  }
  skip(){
    this.navCtrl.push(LevelTwoPage);
    this.navCtrl.setRoot(LevelTwoPage);
  }
}
