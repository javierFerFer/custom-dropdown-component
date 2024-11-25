import { NgTemplateOutlet } from '@angular/common';
import { Component, ContentChild, TemplateRef } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { rotate90Degrees, showHideTriggerAnimation } from '../../animations/custom-dropdown.animation';

@Component({
  selector: 'app-custom-dropdown',
  templateUrl: './custom-dropdown.component.html',
  styleUrls: ['./custom-dropdown.component.scss'],
  standalone: true,
  imports: [
    MatIconModule,
    NgTemplateOutlet
  ],
  animations: [
    showHideTriggerAnimation,
    rotate90Degrees
  ]
})
export class CustomDropdownComponent {

  showContent: boolean = false;

  @ContentChild(TemplateRef)
  templateRef!: TemplateRef<any>;

  toggleContent() {
    this.showContent = !this.showContent;
  }
}
