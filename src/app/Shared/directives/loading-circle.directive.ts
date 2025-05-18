import {
  Directive,
  ElementRef,
  Input,
  Renderer2,
  OnChanges,
  SimpleChanges,
  OnDestroy
} from '@angular/core';

@Directive({
  selector: '[appLoadingCircle]',
  standalone: false
})
export class LoadingCircleDirective implements OnChanges, OnDestroy {
    @Input('appLoadingCircle') appLoadingCircle: boolean | null = false;

    private overlayElement: HTMLElement | null = null;
    private spinnerElement: HTMLElement | null = null;

    constructor(private el: ElementRef, private renderer: Renderer2) {}

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['appLoadingCircle']) {
            if (this.appLoadingCircle) {
                this.showOverlay();
            } 
            else {
                this.removeOverlay();
            }
        }
    }

    ngOnDestroy(): void {
        this.removeOverlay();
    }

    private showOverlay(): void {
        //Create overlay
        this.overlayElement = this.renderer.createElement('div');
        this.spinnerElement = this.renderer.createElement('div');

        this.renderer.addClass(this.overlayElement, 'overlay');
        this.renderer.addClass(this.spinnerElement, 'spinner');

        this.renderer.appendChild(this.overlayElement, this.spinnerElement);
        this.renderer.appendChild(this.el.nativeElement, this.overlayElement);
    }

    private removeOverlay(): void {
        if (this.overlayElement) {
            this.renderer.removeChild(this.el.nativeElement, this.overlayElement);
            this.overlayElement = null;
            this.spinnerElement = null;
        }
    }
}