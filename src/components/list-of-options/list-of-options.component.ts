import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-list-of-options',
  templateUrl: './list-of-options.component.html',
  styleUrls: ['./list-of-options.component.scss'],
  standalone: true
})
export class ListOfOptionsComponent {
  @Input({ required: true })
  collection: any[] = [];

  @Input({ required: true })
  id: string | number = '';

  @Input({ required: true })
  key: string | number = '';
}
