import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { fadeInFadeOut } from '../../animations/custom-dropdown.animation';
import { PokemonService } from '../../services/pokemon.service';
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

  private pkService = inject(PokemonService);

  ngOnInit(): void {
    this.collection$ = this.pkService.getPokemons();
  }
}
