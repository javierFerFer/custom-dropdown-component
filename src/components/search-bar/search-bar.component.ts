import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule
  ],
})
export class SearchBarComponent implements OnInit {
  
  @Input()
  innitState!: any;

  @Output()
  changeEventEmitter = new EventEmitter<string>();

  private readonly fb: FormBuilder = inject(FormBuilder);
  
  internalForm = this.fb.group({
    search: ['']
  }) 

  ngOnInit(): void {
    if (this.innitState?.search) {
      this.internalForm.controls.search.patchValue(this.innitState.search, { emitEvent: false });
    }

    this.internalForm.valueChanges
    .pipe(
      debounceTime(400)
    )
    .subscribe(({search}) => {
      this.changeEventEmitter.emit(search || '');
    })
  }
}
