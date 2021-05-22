import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html'
})
export class ProjectComponent  implements OnInit, OnDestroy {

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
    this.renderer.addClass(document.body, 'background');
    this.renderer.addClass(document.body, 'no-footer');
  }

  ngOnDestroy(): void {
    this.renderer.removeClass(document.body, 'background');
    this.renderer.removeClass(document.body, 'no-footer');
  }
}