import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-top-app-bar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="w-full bg-white dark:bg-surface-container border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div class="flex justify-between items-center w-full px-margin-md h-20 max-w-container-max mx-auto">
        <div class="flex flex-col">
          <span class="font-headline-md text-headline-md font-bold tracking-tighter text-black dark:text-white">
            ALVARO JIMENEZ JACOME
          </span>
          <span class="font-label-mono text-label-mono text-gray-500 dark:text-gray-400 text-xs">
            BACKEND DEVELOPER & SYSTEMS ENGINEER
          </span>
        </div>
        <nav class="hidden md:flex items-center gap-element-gap">
          @for (link of navLinks; track link.href) {
            <a [href]="link.href"
               class="font-label-mono text-label-mono text-black dark:text-white border-b border-black dark:border-white pb-1 hover:opacity-70 transition-opacity">
              {{ link.label }}
            </a>
          }
        </nav>
        <button
          (click)="themeService.toggle()"
          class="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          [attr.aria-label]="themeService.isDark() ? 'Switch to light mode' : 'Switch to dark mode'">
          @if (themeService.isDark()) {
            <span class="material-symbols-outlined text-2xl text-white">light_mode</span>
          } @else {
            <span class="material-symbols-outlined text-2xl text-black">dark_mode</span>
          }
        </button>
      </div>
    </header>
  `,
  styles: `
    :host { display: block; }
  `,
})
export class TopAppBarComponent {
  themeService = inject(ThemeService);

  navLinks = [
    { href: '#home', label: 'INICIO' },
    { href: '#about', label: 'SOBRE MÍ' },
    { href: '#stack', label: 'TECNOLOGÍAS' },
    { href: '#projects', label: 'PROYECTOS' },
    { href: '#experience', label: 'EXPERIENCIA' },
    { href: '#contact', label: 'CONTACTO' },
  ];
}
