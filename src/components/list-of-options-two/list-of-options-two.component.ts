import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, finalize, Observable, skip, take } from 'rxjs';
import { fadeInFadeOut } from '../../animations/custom-dropdown.animation';
import { LoadMoreDirective } from '../../directives/load-more.directive';
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
    PokeImageComponent,
    LoadMoreDirective
  ],
  animations: [
    fadeInFadeOut,
  ]
})
export class ListOfOptionsTwoComponent implements OnInit, OnDestroy{
  
  
  collection$!: Observable<any>;

  isSearching: BehaviorSubject<boolean> = new BehaviorSubject(false);
  isSearching$: Observable<boolean> = this.isSearching.asObservable();

  loadMore: BehaviorSubject<void> = new BehaviorSubject<void>(undefined);
  loadMore$: Observable<void> = this.loadMore.asObservable();

  partialLoading: BehaviorSubject<boolean> = new BehaviorSubject(false);
  partialLoading$: Observable<boolean> = this.partialLoading.asObservable();

  id: string | number = 'id';

  key: string | number = 'name';

  numberOfPokemons: number = 10;
  offset: number = 0;

  private subscriptions: any[] = [];

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

    this.subscriptions.push(
      this.loadMore$
      .pipe(
        skip(1), //prevent default emission
      )
      .subscribe(() => {
        this.offset += this.numberOfPokemons;
        this.getPartialPokemons();
      })
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  loadMoreElements(event: any) {
    this.loadMore.next();
  }

  private getPokemons() {
    this.isSearching.next(true);
    this.subscriptions.push(
      this.pkService.getPokemons(this.numberOfPokemons)
    .pipe(
      take(1),
    )
    .subscribe(() => {
      this.isSearching.next(false)
    })
    )
  }

  private getPartialPokemons() {
    this.partialLoading.next(true);
    this.subscriptions.push(
      this.pkService.getPokemons(this.numberOfPokemons, this.offset)
    .pipe(
      take(1),
    )
    .subscribe(() => {
      this.partialLoading.next(false);
    })
    )
  }

  private findPokemon(value: string) {
    this.isSearching.next(true);
    this.subscriptions.push(
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
    )
  }
}
