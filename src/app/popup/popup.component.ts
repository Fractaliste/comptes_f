import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'c-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.sass']
})
export class PopupComponent implements OnInit {

  @Input() popupId!: string
  @Input() popupTitle!: string

  constructor() { }

  ngOnInit(): void {
  }

}
