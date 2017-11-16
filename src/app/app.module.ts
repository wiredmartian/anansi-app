import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';

import { AnansiApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LevelOnePage } from '../pages/level-one/level-one';
import { LevelTwoPage } from '../pages/level-two/level-two';
import { GameMenuPage } from '../pages/game-menu/game-menu';
import { AboutPage } from '../pages/about/about';
import { InstructionsPage } from '../pages/instructions/instructions';
import {StoryOnePage} from "../pages/story-one/story-one";
import {StoryTwoPage} from "../pages/story-two/story-two";

@NgModule({
  declarations: [
    AnansiApp,
    HomePage,
    LevelOnePage,
    LevelTwoPage,
    GameMenuPage,
    AboutPage,
    InstructionsPage,
    StoryOnePage,
    StoryTwoPage
  ],
  imports: [
    BrowserModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(AnansiApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    AnansiApp,
    HomePage,
    LevelOnePage,
    LevelTwoPage,
    GameMenuPage,
    AboutPage,
    InstructionsPage,
    StoryOnePage,
    StoryTwoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule {}
