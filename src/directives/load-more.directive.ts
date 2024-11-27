import { AfterViewInit, Directive, EventEmitter, Output, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appLoadMore]',
  standalone: true,
})
export class LoadMoreDirective implements AfterViewInit {

  @Output()
  appLoadMore = new EventEmitter<void>();

  constructor(private vcRef: ViewContainerRef, private tplRef: TemplateRef<any>) {}

  ngAfterViewInit() {
    const observedElement = this.vcRef.element.nativeElement.parentElement;
    const observer = new IntersectionObserver(([entry]) => {
      this.renderContents(entry.isIntersecting)
    })
    observer.observe(observedElement)
  }

  renderContents(isIntersecting: boolean) {

    this.vcRef.clear();

    if (isIntersecting) {
      this.vcRef.createEmbeddedView(this.tplRef);
      this.appLoadMore.emit();
    }
  }
}