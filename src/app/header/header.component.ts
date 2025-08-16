import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  menuIsOpen = signal(false);

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

  private clearTheme(classList: DOMTokenList) {
    classList.remove('dark-theme', 'light-theme', 'monochrome');
  }
}
