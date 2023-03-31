import { Component } from '@angular/core';

@Component({
  selector: 'app-handle',
  templateUrl: './handle.component.html',
  styleUrls: ['./handle.component.scss']
})
export class HandleComponent {
  numberOfShares: number = 0;
  pricePerShare: number = 100;
}
