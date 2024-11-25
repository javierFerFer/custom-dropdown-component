import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { delay, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private http = inject(HttpClient);
  private url = 'https://pokeapi.co/api/v2/pokemon?limit=3&offset=0';

  getPokemons(): Observable<{name: string}> {
    return this.http.get(this.url)
    .pipe(
      delay(2000),
      map(({results}: any, index) => {
        return results.map(({name}: any) => ({name, id: index}));
      })
    );
  }
}
