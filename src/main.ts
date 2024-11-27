import { provideHttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { CustomDropdownComponent } from './components/custom-dropdown/custom-dropdown.component';
import { ListOfOptionsTwoComponent } from './components/list-of-options-two/list-of-options-two.component';
import { ListOfOptionsComponent } from './components/list-of-options/list-of-options.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';


@Component({
  selector: 'app-root',
  template: `
    <app-custom-dropdown>
      <ng-template>
        <app-list-of-options [collection]="collection" [id]="'id'" [key]="'name'"></app-list-of-options>
      </ng-template>
    </app-custom-dropdown>

    <app-custom-dropdown>
      <ng-template>
        <app-search-bar [innitState]="searchProperty" (changeEventEmitter)="searchChange($event)"></app-search-bar>
        <app-list-of-options-two
        style="
          max-height: 250px;
          overflow-y: scroll;
          overflow: auto;
        "
        [searchProperty]="searchProperty">
      </app-list-of-options-two>
      </ng-template>
    </app-custom-dropdown>

  `,
  standalone: true,
  imports: [
    CustomDropdownComponent,
    ListOfOptionsComponent,
    ListOfOptionsTwoComponent,
    SearchBarComponent
  ]
})
export class App {
  name = 'Angular';

  searchProperty = {
    search: ''
  };

  public collection = [
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
  ];

  searchChange(value: string) {
    this.searchProperty = {
      search: value
    }
  }

}

bootstrapApplication(App, {
    providers: [
      provideAnimationsAsync(),
      provideHttpClient()
    ]
  });
