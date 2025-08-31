import { NgClass } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink, NgClass],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  colourModeClass = signal('reset');
  colourModeMenuIsOpen = signal(false);
  menuIsOpen = signal(false);
  themeName = signal('system setting');

  colourModeMenuAriaExpanded = signal('false');
  menuButtonAriaExpanded = signal('false');

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
    const fontSize = window.localStorage.getItem('font-size');
    const theme = window.localStorage.getItem('theme');

    if (fontSize) {
      this.changeTextSize(fontSize);
    }

    if (theme) {
      this.changeTheme(theme);
    }
  }

  toggleColourModeMenu = () => {
    let expanded: string;
    if (this.colourModeMenuIsOpen()) {
      this.colourModeMenuIsOpen.set(false);
      expanded = 'false';
    } else {
      this.colourModeMenuIsOpen.set(true);
      expanded = 'true';
    }
    this.colourModeMenuAriaExpanded.set(expanded);
  };

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
    this.themeName.set(themeName);
    this.colourModeClass.set(buttonClass);
  }
}
