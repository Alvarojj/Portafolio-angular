import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-top-app-bar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="w-full bg-surface-container border-b border-outline-variant sticky top-0 z-50">
      <div class="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop h-20 max-w-container-max mx-auto">
        <div class="flex flex-col">
          <span class="font-headline-lg-mobile text-headline-lg-mobile font-bold tracking-tighter text-on-background">
            ALVARO JIMENEZ JACOME
          </span>
          <span class="font-mono-data text-mono-data text-on-surface-variant text-xs">
            BACKEND DEVELOPER & SYSTEMS ENGINEER
          </span>
        </div>
        <nav class="hidden md:flex items-center gap-md">
          @for (link of navLinks; track link.href) {
            <a [href]="link.href"
               class="font-mono-data text-mono-data text-on-background border-b border-primary pb-1 hover:opacity-70 transition-opacity">
              {{ link.label }}
            </a>
          }
        </nav>
      </div>
    </header>
  `,
  styles: `
    :host { display: block; }
  `,
})
export class TopAppBarComponent {
  navLinks = [
    { href: '#home', label: 'HOME' },
    { href: '#stack', label: 'STACK' },
    { href: '#projects', label: 'PROJECTS' },
    { href: '#experience', label: 'EXPERIENCE' },
  ];
}
