import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { fadeInFadeOut } from '../../animations/custom-dropdown.animation';
import { SpinnerComponent } from '../spinner/spinner.component';

@Component({
  selector: 'app-list-of-options-two',
  templateUrl: './list-of-options-two.component.html',
  styleUrls: ['./list-of-options-two.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    SpinnerComponent
  ],
  animations: [
    fadeInFadeOut,
    
  ]
})
export class ListOfOptionsTwoComponent implements OnInit {
  
  collection$!: Observable<any>;

  id: string | number = 'id';

  key: string | number = 'name';


  ngOnInit(): void {
    console.log('test me');
    
    this.collection$ = of(
      [
        {
          id: 1,
          name: 'Option 1'
        },
        {
          id: 2,
          name: 'Option 2'
        },
        {
          id: 3,
          name: 'Option 3'
        }
      ]
    ).pipe(
      delay(3000),
    );
  }
}
