import { BreakpointObserver } from '@angular/cdk/layout';
import { NgClass } from '@angular/common';
import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { HeaderToolbarComponent } from '../header-toolbar/header-toolbar.component';

@Component({
  selector: 'app-header',
  imports: [RouterLink, HeaderToolbarComponent, NgClass],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit, OnDestroy {
  breakpointObserver = inject(BreakpointObserver);
  destroyed = new Subject<void>();
  menuIsOpen = signal(false);
  menuButtonAriaExpanded = signal('false');

  protected isMobile = false;

  ngOnInit(): void {
    this.breakpointObserver
      .observe(`(max-width: 45.5rem)`)
      .pipe(takeUntil(this.destroyed))
      .subscribe((result) => {
        if (!result.matches) {
          this.isMobile = false;
        } else {
          this.isMobile = true;
        }
      });
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }

  toggleMenu = () => {
    let expanded: string;
    if (this.menuIsOpen()) {
      this.menuIsOpen.set(false);
      expanded = 'false';
    } else {
      this.menuIsOpen.set(true);
      expanded = 'true';
    }
    this.menuButtonAriaExpanded.set(expanded);
  };
}
