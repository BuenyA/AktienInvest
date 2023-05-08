import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { AktienUndEtfsComponent } from './aktien-und-etfs/aktien-und-etfs.component';
import { RegistrierungComponent } from './registrierung/registrierung.component';
import { HighscoreListComponent } from './highscore-list/highscore-list.component';
import { MeinAccountComponent } from './mein-account/mein-account.component';
import { MultiplayerComponent } from './multiplayer/multiplayer.component';
import { StockDetailsComponent } from './stock-details/stock-details.component';
import { MultiplayerStartscreenErstellenComponent } from './multiplayer/multiplayer-startscreen/multiplayer-startscreen-erstellen/multiplayer-startscreen-erstellen.component';
import { MultiplayerStartscreenComponent } from './multiplayer/multiplayer-startscreen/multiplayer-startscreen.component';
import { OwnStocksComponent } from './own-stocks/own-stocks.component';
import { AccountdatenAendernComponent } from './accountdaten-aendern/accountdaten-aendern.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { MultiplayerStartscreenBeitretenComponent } from './multiplayer/multiplayer-startscreen/multiplayer-startscreen-beitreten/multiplayer-startscreen-beitreten.component';
import { MultiplayerHomepageComponent } from './multiplayer/multiplayer-homepage/multiplayer-homepage.component';
import { StartpageComponent } from './startpage/startpage.component';
import { MultiplayerStartscreenFailedComponent } from './multiplayer/multiplayer-startscreen/multiplayer-startscreen-failed/multiplayer-startscreen-failed.component';

// with canActivate only logged in useres can access this path, otherwise they will be redirected to the login page (see auth.guard.ts)
const routes: Routes = [
  { path: '', component: HomepageComponent, canActivate: [AuthGuard] },
  { path: 'homepage', component: HomepageComponent, canActivate: [AuthGuard] },
  { path: 'aktien-und-etfs', component: AktienUndEtfsComponent, canActivate: [AuthGuard] },
  { path: 'aktien-und-etfs/aktie-details', component: StockDetailsComponent, canActivate: [AuthGuard] },
  { path: 'highscore-list', component: HighscoreListComponent, canActivate: [AuthGuard] },
  { path: 'mein-account', component: MeinAccountComponent, canActivate: [AuthGuard] },
  { path: 'multiplayer', component: MultiplayerHomepageComponent, canActivate: [AuthGuard] },
  { path: 'multiplayer/startscreen', component: MultiplayerStartscreenComponent, canActivate: [AuthGuard] },
  { path: 'multiplayer/erstellen', component: MultiplayerStartscreenErstellenComponent, canActivate: [AuthGuard] },
  { path: 'multiplayer/beitreten', component: MultiplayerStartscreenBeitretenComponent, canActivate: [AuthGuard] },
  { path: 'multiplayer/failed', component: MultiplayerStartscreenFailedComponent, canActivate: [AuthGuard] },
  { path: 'multiplayer/homepage', component: MultiplayerHomepageComponent, canActivate: [AuthGuard] },
  { path: 'own-stocks', component: OwnStocksComponent, canActivate: [AuthGuard] },
  { path: 'mein-account/accountdaten-aendern', component: AccountdatenAendernComponent, canActivate: [AuthGuard] }, 
  // these components can be accessed by not logged in users
  { path: 'startpage', component: StartpageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registrierung', component: RegistrierungComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
