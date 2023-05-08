import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-homepage-weitere-aktien',
  templateUrl: './homepage-weitere-aktien.component.html',
  styleUrls: ['./homepage-weitere-aktien.component.scss']
})
export class HomepageWeitereAktienComponent {
  @Input() multiplayerMode: boolean = false;
}
