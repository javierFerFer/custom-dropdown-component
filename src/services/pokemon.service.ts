import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, delay, forkJoin, map, Observable, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private http = inject(HttpClient);

  private listOfOfPokemons = new BehaviorSubject<any>([]);
  public listOfOfPokemons$ = this.listOfOfPokemons.asObservable();

  getPokemons() {
    const url = 'https://pokeapi.co/api/v2/pokemon?limit=300&offset=0';
    return this.http.get(url)
    .pipe(
      delay(2000),
      map(({results}: any, index) => {
        return results.map(({name, url}: any) => ({name, url, id: index}));
      }),
      this.pkProcess()
    );
  }

  findPokemon(name: string): Observable<any[]> {
    const urlBase = `https://pokeapi.co/api/v2/pokemon/`;

    const url = `${urlBase}${name}`;
    return this.http.get(url)
    .pipe(
      delay(2000),
      map(({name, id}: any) => {
        return [{name, url: urlBase + id}];
      }),
      this.pkProcess(),
      tap((pokemons) => this.listOfOfPokemons.next(pokemons))
    );
  }


  private pkProcess() {
    return (source: Observable<any>) => source
    .pipe(
      switchMap((listOfPokemons: any[]) => {
        const allRequest = listOfPokemons
        .map(({name, url}: any) => this.http.get(url)
        .pipe(
          map(({sprites}: any) => ({name, url: sprites.front_default}))
        )
      )
        return forkJoin(allRequest);
      }),
      tap((pokemons) => {
        this.listOfOfPokemons.next(pokemons)
      })
    )
  } 
}
