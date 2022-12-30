import { Component, Input, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-top-header',
  templateUrl: './top-header.component.html',
  styleUrls: ['./top-header.component.scss'],
})
export class TopHeaderComponent implements OnInit {
  @Input() type: string;
  @Input() title: string;
  @Input() withBackButton: boolean = false;

  constructor(public navCtrl: NavController) {}

  ngOnInit() {}
}
