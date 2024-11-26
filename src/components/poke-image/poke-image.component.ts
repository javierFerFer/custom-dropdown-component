import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-poke-image',
  templateUrl: './poke-image.component.html',
  styleUrls: ['./poke-image.component.scss'],
  standalone: true
})
export class PokeImageComponent {
  @Input({required: true}) url: string = '';
}
