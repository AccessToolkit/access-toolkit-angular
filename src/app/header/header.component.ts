import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnDestroy, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { HeaderToolbarComponent } from '../header-toolbar/header-toolbar.component';

@Component({
  selector: 'app-header',
  imports: [RouterLink, HeaderToolbarComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnDestroy {
  destroyed = new Subject<void>();
  menuIsOpen = signal(false);
  menuButtonAriaExpanded = signal('false');

  protected isMobile = false;

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit() {
    this.breakpointObserver
      .observe(`(max-width: 680px)`)
      .pipe(takeUntil(this.destroyed))
      .subscribe((result) => {
        if (!result.matches) {
          this.isMobile = false;
        } else {
          this.isMobile = true;
        }
      });
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

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }
}
