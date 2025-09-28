import { isPlatformBrowser } from '@angular/common';
import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'access-toolkit';

  platformId = inject(PLATFORM_ID);

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const fontSize = window.localStorage.getItem('font-size');
      const theme = window.localStorage.getItem('theme');

      if (fontSize) {
        const html: HTMLHtmlElement | null = document.querySelector('html');

        if (html) {
          html.style.fontSize = `${fontSize}rem`;
        }
      }

      if (theme) {
        const body: HTMLBodyElement | null = document.querySelector('body');
        const classList = (body as HTMLElement).classList;

        classList.remove('dark-theme', 'light-theme', 'monochrome');
        classList.add(theme);
      }
    }
  }
}
