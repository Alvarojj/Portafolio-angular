import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopAppBarComponent } from './components/top-app-bar/top-app-bar.component';
import { FooterComponent } from './components/footer/footer.component'

@Component({
  selector: 'app-root',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterOutlet,
    TopAppBarComponent,
    FooterComponent,
  ],
  template: `
    <div class="flex flex-col min-h-screen bg-white dark:bg-black text-black dark:text-white">
      <header>
        <app-top-app-bar />
      </header>
      <main class="flex-grow w-full max-w-container-max mx-auto px-margin-md md:px-margin-lg pt-margin-lg pb-section-gap flex flex-col gap-section-gap">
        <router-outlet />
      </main>
      <footer>
        <app-footer />
      </footer>
    </div>
  `,
  styles: `
    :host { display: block; }
  `,
})
export class AppComponent {}
