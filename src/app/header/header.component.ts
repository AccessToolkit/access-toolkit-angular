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

  changeTextSize(direction: string) {
    const html: HTMLHtmlElement | null = document.querySelector('html');
    let fontSize = html?.style.fontSize;

    if (direction === 'up') {
      fontSize = fontSize;
    }
  }

  changeTheme(theme: string) {
    const body: HTMLBodyElement | null = document.querySelector('body');
    const classList = (body as HTMLElement).classList;

    if (classList.contains(theme)) {
      classList.remove('dark-theme', 'light-theme', 'monochrome');
    } else {
      classList.remove('dark-theme', 'light-theme', 'monochrome');
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
}
