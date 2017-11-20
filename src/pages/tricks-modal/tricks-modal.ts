import { Component } from "@angular/core";
import { ViewController } from 'ionic-angular';

@Component({
  selector: 'page-tricks-modal',
  templateUrl: 'tricks-modal.html'
})

export class TricksModalPage{
  constructor(public viewCtrl: ViewController)
  {}

  onDismiss(){
    this.viewCtrl.dismiss();
  }
}
