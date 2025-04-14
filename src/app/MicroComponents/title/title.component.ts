import { Component, Input } from '@angular/core';
import { NgSwitch, NgSwitchCase } from '@angular/common';

@Component({
  selector: 'app-title',
  imports: [NgSwitch, NgSwitchCase],
  templateUrl: './title.component.html',
  styleUrl: './title.component.css'
})
export class TitleComponent {
  @Input() title:string = '';
  @Input() h:'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' = 'h2';
}
