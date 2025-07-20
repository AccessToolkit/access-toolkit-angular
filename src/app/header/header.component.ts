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

  toggleDarkMode() {
    const body: HTMLBodyElement | null = document.querySelector('body');
    const classList = (body as HTMLElement).classList;

    if (classList.contains('dark-theme')) {
      classList.remove('dark-theme');
    } else {
      classList.add('dark-theme');
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
