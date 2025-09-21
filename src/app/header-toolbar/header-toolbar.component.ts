import { BreakpointObserver } from '@angular/cdk/layout';
import { isPlatformBrowser, NgClass } from '@angular/common';
import {
  Component,
  inject,
  OnDestroy,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-header-toolbar',
  imports: [NgClass, RouterLink],
  templateUrl: './header-toolbar.component.html',
  styleUrl: './header-toolbar.component.scss',
})
export class HeaderToolbarComponent implements OnDestroy {
  colourModeClass = signal('reset');
  colourModeMenuAriaExpanded = signal('false');
  colourModeMenuIsOpen = signal(false);
  destroyed = new Subject<void>();
  platformId = inject(PLATFORM_ID);
  themeName = signal('system setting');

  protected isMobile = false;

  constructor(private breakpointObserver: BreakpointObserver) {}

  changeTextSize(direction: string): void {
    const html: HTMLHtmlElement | null = document.querySelector('html');

    if (html) {
      let fontSizeFloat = parseFloat(
        html.style.fontSize.slice(0, -3) as string
      );

      if (!Number.isNaN(fontSizeFloat)) {
        if (direction === 'up') {
          fontSizeFloat = fontSizeFloat + 0.125;
        } else if (direction === 'down') {
          fontSizeFloat = fontSizeFloat - 0.125;
        } else if (direction === 'reset') {
          fontSizeFloat = 1;
        }

        html.style.fontSize = `${fontSizeFloat}rem`;
        window.localStorage.setItem('font-size', fontSizeFloat.toString());
      }
    } else {
      return;
    }
  }

  changeTheme(theme: string) {
    const body: HTMLBodyElement | null = document.querySelector('body');
    const classList = (body as HTMLElement).classList;

    window.localStorage.setItem('theme', theme);

    if (classList.contains(theme) || theme === 'reset') {
      this.clearTheme(classList);
    } else {
      this.clearTheme(classList);
      classList.add(theme);
    }

    this.setButtonTheme(theme);
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const theme = window.localStorage.getItem('theme');

      if (theme) {
        this.setButtonTheme(theme);
      }
    }

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

  private clearTheme(classList: DOMTokenList) {
    classList.remove('dark-theme', 'light-theme', 'monochrome');
  }

  private setButtonTheme(theme: string) {
    let themeName = 'system setting';
    let buttonClass = 'reset';

    switch (theme) {
      case 'dark-theme':
        themeName = 'dark mode';
        buttonClass = 'dark';
        break;
      case 'light-theme':
        themeName = 'light mode';
        buttonClass = 'light';
        break;
      case 'monochrome':
        themeName = 'black and white mode';
        buttonClass = 'monochrome';
        break;
      default:
        themeName = 'system setting';
        buttonClass = 'reset';
        break;
    }

    this.colourModeClass.set(buttonClass);
    this.themeName.set(themeName);
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }
}
