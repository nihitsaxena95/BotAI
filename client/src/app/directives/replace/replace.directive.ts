import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  // tslint:disable-next-line:max-line-length
  selector: '[appHostReplace], app-aside, app-breadcrumbs, app-footer, app-header, app-sidebar, app-sidebar-nav'
})
export class ReplaceDirective implements OnInit {

  constructor(private el: ElementRef) { }

  // wait for the component to render completely
  ngOnInit() {
    const nativeElement: HTMLElement = this.el.nativeElement;
    const parentElement: HTMLElement = nativeElement.parentElement;
    // move all children out of the element
    while (nativeElement.firstChild) {
      parentElement.insertBefore(nativeElement.firstChild, nativeElement);
    }
    // remove the empty element(the host)
    parentElement.removeChild(nativeElement);
  }
}
