import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//Import Router from Angular 
import { RouterModule, Routes } from '@angular/router';

//Import FormsModule
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

//Import HttpClientModule
import { HttpClientModule } from "@angular/common/http";

//Import Apex-Charts Module
import { NgApexchartsModule } from "ng-apexcharts";

//Import Bootstrap
import { NgbPaginationModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

//Import Angular Material
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSliderModule } from '@angular/material/slider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { MatSortModule } from '@angular/material/sort';

import { CookieService } from 'ngx-cookie-service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AktienChartComponent } from './homepage/homepage-header/aktien-chart/aktien-chart.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AktienUndEtfsComponent } from './aktien-und-etfs/aktien-und-etfs.component';
import { HomepageComponent } from './homepage/homepage.component';
import { MultiplayerComponent } from './multiplayer/multiplayer.component';
import { HighscoreListComponent } from './highscore-list/highscore-list.component';
import { MeinAccountComponent } from './mein-account/mein-account.component';
import { RegistrierungComponent } from './registrierung/registrierung.component';
import { MultiplayerStartscreenComponent } from './multiplayer/multiplayer-startscreen/multiplayer-startscreen.component';
import { MultiplayerPlayerListComponent } from './multiplayer/multiplayer-player-list/multiplayer-player-list.component';
import { MultiplayerStartscreenErstellenComponent } from './multiplayer/multiplayer-startscreen/multiplayer-startscreen-erstellen/multiplayer-startscreen-erstellen.component';
import { MultiplayerStartscreenBeitretenComponent } from './multiplayer/multiplayer-startscreen/multiplayer-startscreen-beitreten/multiplayer-startscreen-beitreten.component';
import { AktienPreviewComponent } from './aktien-und-etfs/aktien-preview/aktien-preview.component';
import { DialogComponent } from './mein-account/dialog/dialog.component';
import { SearchBoxComponent } from './aktien-und-etfs/search-box/search-box.component';
import { FooterComponent } from './footer/footer.component';
import { HomepageHeaderComponent } from './homepage/homepage-header/homepage-header.component';
import { HomepageDeineAktienComponent } from './homepage/homepage-deine-aktien/homepage-deine-aktien.component';
import { HomepageWeitereAktienComponent } from './homepage/homepage-weitere-aktien/homepage-weitere-aktien.component';
import { HomepageMultiplayerComponent } from './homepage/homepage-multiplayer/homepage-multiplayer.component';
import { HomepageHighscoreComponent } from './homepage/homepage-highscore/homepage-highscore.component';
import { LoginComponent } from './login/login.component';
import { StockDetailsComponent } from './stock-details/stock-details.component';
import { StockDetailsHeaderComponent } from './stock-details/stock-details-header/stock-details-header.component';
import { StockDetailsMetricsComponent } from './stock-details/stock-details-metrics/stock-details-metrics.component';
import { BuyingDialogComponent } from './stock-details/stock-details-buying/buying-dialog/buying-dialog.component';
import { StockDetailsSellingComponent } from './stock-details/stock-details-selling/stock-details-selling.component';
import { SellingDialogComponent } from './stock-details/stock-details-selling/selling-dialog/selling-dialog.component';
import { StockDetailsBuyingComponent } from './stock-details/stock-details-buying/stock-details-buying.component';
import { OwnTransactionsComponent } from './own-stocks/own-transactions/own-transactions.component';
import { OwnStocksComponent } from './own-stocks/own-stocks.component';
import { OwnTransactionsRawComponent } from './own-stocks/own-transactions-raw/own-transactions-raw.component';
import { AccountdatenAendernComponent } from './accountdaten-aendern/accountdaten-aendern.component';
import { DialogAccountAendernComponent } from './accountdaten-aendern/dialog-account-aendern/dialog-account-aendern.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { MultiplayerWarnComponent } from './multiplayer/multiplayer-warn/multiplayer-warn.component';
import { MultiplayerHomepageComponent } from './multiplayer/multiplayer-homepage/multiplayer-homepage.component';
import { StartpageComponent } from './startpage/startpage.component';
import { StartpageHeaderComponent } from './startpage-header/startpage-header.component';
import { MultiplayerStartscreenFailedComponent } from './multiplayer/multiplayer-startscreen/multiplayer-startscreen-failed/multiplayer-startscreen-failed.component';
import { MultiplayerErstellenDialogComponent } from './multiplayer/multiplayer-startscreen/multiplayer-startscreen-erstellen/multiplayer-erstellen-dialog/multiplayer-erstellen-dialog.component';

//Routedefiniton
const appRoutes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'homepage', component: HomepageComponent },
  { path: 'aktien-und-etfs', component: AktienUndEtfsComponent },
  { path: 'highscore-list', component: HighscoreListComponent },
  { path: 'multiplayer', component: MultiplayerStartscreenComponent },
  { path: 'mein-account', component: MeinAccountComponent },
  { path: 'mein-account', component: RegistrierungComponent },
  { path: 'multiplayer', component: MultiplayerStartscreenComponent },
  { path: 'multiplayer/playerlist', component: MultiplayerPlayerListComponent },
  { path: 'multiplayer/erstellen', component: MultiplayerStartscreenErstellenComponent },
  { path: 'multiplayer/beitreten', component: MultiplayerStartscreenBeitretenComponent },
  { path: 'registrierung', component: RegistrierungComponent },
  { path: 'aktien-und-etfs/aktie-details', component:  StockDetailsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'mein-account/accountdaten-aendern', component: AccountdatenAendernComponent },

]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AktienChartComponent,
    AktienUndEtfsComponent,
    HomepageComponent,
    MultiplayerComponent,
    HighscoreListComponent,
    MeinAccountComponent,
    RegistrierungComponent,
    MultiplayerStartscreenComponent,
    MultiplayerPlayerListComponent,
    MultiplayerStartscreenErstellenComponent,
    MultiplayerStartscreenBeitretenComponent,
    AktienPreviewComponent,
    DialogComponent,
    SearchBoxComponent,
    FooterComponent,
    HomepageHeaderComponent,
    HomepageDeineAktienComponent,
    HomepageWeitereAktienComponent,
    HomepageMultiplayerComponent,
    HomepageHighscoreComponent,
    LoginComponent,
    StockDetailsComponent,
    StockDetailsHeaderComponent,
    StockDetailsMetricsComponent,
    BuyingDialogComponent,
    StockDetailsSellingComponent,
    SellingDialogComponent,
    StockDetailsBuyingComponent,
    OwnStocksComponent,
    OwnTransactionsComponent,
    OwnTransactionsRawComponent,
    AccountdatenAendernComponent,
    DialogAccountAendernComponent,
    NotFoundComponent,
    MultiplayerWarnComponent,
    MultiplayerHomepageComponent,
    StartpageComponent,
    StartpageHeaderComponent,
    MultiplayerStartscreenFailedComponent,
    MultiplayerErstellenDialogComponent,
  ],
  entryComponents: [DialogComponent],
  imports: [
    RouterModule.forRoot(appRoutes, { scrollPositionRestoration: 'enabled'}),
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    NgbModule,
    NgbPaginationModule,
    NgbAlertModule,
    MatInputModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    ReactiveFormsModule,
    MatTableModule,
    MatCardModule,
    MatTabsModule,
    MatPaginatorModule,
    MatDialogModule,
    NgApexchartsModule,
    HttpClientModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSliderModule,
    NgxMaterialTimepickerModule,
    MatProgressBarModule,
    MatSortModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
