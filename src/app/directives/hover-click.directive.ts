import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';


@Directive({
  selector: '[appHoverClick]'
})
export class HoverClickDirective {
  private timer: any;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.timer = setTimeout(() => {
      console.log('am i coming here?')
      this.el.nativeElement.click();
    }, 3000); // 2 seconds
  }

  @HostListener('mouseleave') onMouseLeave() {
    clearTimeout(this.timer); // Cancel the click if the user leaves early
  }
}
