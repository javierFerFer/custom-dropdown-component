import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { BehaviorSubject, finalize, Observable, take } from 'rxjs';
import { fadeInFadeOut } from '../../animations/custom-dropdown.animation';
import { PokemonService } from '../../services/pokemon.service';
import { PokeImageComponent } from '../poke-image/poke-image.component';
import { SpinnerComponent } from '../spinner/spinner.component';

@Component({
  selector: 'app-list-of-options-two',
  templateUrl: './list-of-options-two.component.html',
  styleUrls: ['./list-of-options-two.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    SpinnerComponent,
    PokeImageComponent
  ],
  animations: [
    fadeInFadeOut,
  ]
})
export class ListOfOptionsTwoComponent implements OnInit{
  
  
  collection$!: Observable<any>;
  isSearching: BehaviorSubject<boolean> = new BehaviorSubject(false);
  isSearching$: Observable<boolean> = this.isSearching.asObservable();

  id: string | number = 'id';

  key: string | number = 'name';

  private _searchProperty: any = {};
  @Input()
  set searchProperty(value: any) {
    this._searchProperty = value;
    if (value.search) {
      this.findPokemon(value.search);
    } else {
      this.getPokemons();
    }
  }
  private pkService = inject(PokemonService);

  ngOnInit(): void {
    this.collection$ = this.pkService.listOfOfPokemons$;
  }

  private getPokemons() {
    this.isSearching.next(true);
    this.pkService.getPokemons()
    .pipe(
      take(1),
    )
    .subscribe(() => {
      this.isSearching.next(false)
    })
  }

  private findPokemon(value: string) {
    this.isSearching.next(true);
    this.pkService.findPokemon(value)
    .pipe(
      finalize(() => {
        take(1),
        this.isSearching.next(false);
      })
    )
    .subscribe(() => {
      this.isSearching.next(false)
    })
  }
}
