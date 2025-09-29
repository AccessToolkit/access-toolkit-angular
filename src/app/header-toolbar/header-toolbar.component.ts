import { isPlatformBrowser, NgClass } from '@angular/common';
import {
  Component,
  ElementRef,
  inject,
  Input,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header-toolbar',
  imports: [NgClass, RouterLink],
  templateUrl: './header-toolbar.component.html',
  styleUrl: './header-toolbar.component.scss',
})
export class HeaderToolbarComponent {
  colourMenu: Element | null;
  colourModeButtons: Element[] = [];
  colourModeClass = signal('reset');
  colourModeMenuAriaExpanded = signal('false');
  colourModeMenuIsOpen = signal(false);
  elementRef = inject(ElementRef);
  platformId = inject(PLATFORM_ID);
  themeName = signal('system setting');
  navTooBig = false;
  navThreshold: number | undefined;

  @Input() isMobile = false;

  constructor() {
    this.colourMenu = (this.elementRef.nativeElement as Element).querySelector(
      '#colour-menu-popover'
    );
    if (this.colourMenu) {
      this.colourModeButtons = Array.from(
        this.colourMenu.querySelectorAll('button')
      );
    }
  }

  changeTextSize(direction: string): void {
    const html: HTMLHtmlElement | null = document.querySelector('html');
    const header: HTMLElement | null = document.querySelector('header');
    const mainNav: HTMLElement | null = document.getElementById('main-nav');

    if (html) {
      let fontSizeFloat = parseFloat(
        html.style.fontSize.slice(0, -3) as string
      );

      if (!Number.isNaN(fontSizeFloat)) {
        if (fontSizeFloat >= 1.5) {
          header?.classList.add('move-site-a11y');
        } else if (header?.classList.contains('move-site-a11y')) {
          header.classList.remove('move-site-a11y');
        }
        if (direction === 'up' && fontSizeFloat >= 2) {
          fontSizeFloat = 2;
        } else if (direction === 'up') {
          fontSizeFloat = fontSizeFloat + 0.125;
        } else if (direction === 'down' && fontSizeFloat <= 0.5) {
          fontSizeFloat = 0.5;
        } else if (direction === 'down') {
          fontSizeFloat = fontSizeFloat - 0.125;
        } else if (direction === 'reset') {
          fontSizeFloat = 1;
        }

        html.style.fontSize = `${fontSizeFloat}rem`;
        window.localStorage.setItem('font-size', fontSizeFloat.toString());

        if (header && mainNav) {
          if (mainNav.offsetWidth > header.offsetWidth) {
            mainNav?.classList.add('prevent-overflow');
            this.navThreshold = mainNav.offsetWidth;
            this.navTooBig = true;
          } else if (
            this.navThreshold &&
            mainNav.offsetWidth >= this.navThreshold
          ) {
            return;
          } else if (
            this.navThreshold &&
            mainNav.offsetWidth > header.offsetWidth &&
            mainNav.offsetWidth > this.navThreshold
          ) {
            this.navThreshold = undefined;
          } else if (direction === 'down' || direction === 'reset') {
            mainNav?.classList.remove('prevent-overflow');
          }
        }
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
  }

  private clearTheme(classList: DOMTokenList) {
    classList.remove('dark-theme', 'light-theme', 'monochrome');
  }

  private setButtonTheme(theme: string) {
    let themeName = 'system setting';
    let buttonClass = 'reset';
    let element = this.colourMenu?.querySelector('#reset-button');
    this.colourModeButtons.forEach((button) => {
      button.ariaPressed = 'false';
    });

    switch (theme) {
      case 'dark-theme':
        themeName = 'dark mode';
        buttonClass = 'dark';
        element = this.colourMenu?.querySelector('#dark-button');
        break;
      case 'light-theme':
        themeName = 'light mode';
        buttonClass = 'light';
        element = this.colourMenu?.querySelector('#light-button');
        break;
      case 'monochrome':
        themeName = 'black and white mode';
        buttonClass = 'monochrome';
        element = this.colourMenu?.querySelector('#monochrome-button');
        break;
      default:
        themeName = 'system setting';
        buttonClass = 'reset';
        element = this.colourMenu?.querySelector('#reset-button');
        break;
    }

    this.colourModeClass.set(buttonClass);
    this.themeName.set(themeName);
    if (element) {
      element.ariaPressed = 'true';
    }
  }
}
