import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer class="w-full bg-surface-container border-t border-outline-variant mt-auto">
      <div class="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-md flex flex-col md:flex-row justify-between items-center gap-md">
        <span class="font-mono-data text-mono-data font-bold text-on-background">
          © 2026 ALVARO JIMENEZ | BACKEND DEVELOPER & SYSTEMS ENGINEER
        </span>
        <div class="flex gap-md">
          <a class="font-mono-data text-mono-data text-on-surface-variant font-bold hover:text-primary transition-opacity" href="https://github.com/aejimenez19" target="_blank">
            GITHUB
          </a>
          <a class="font-mono-data text-mono-data text-on-surface-variant hover:text-primary transition-colors" href="https://www.linkedin.com/in/alvaro-jimenez-dev/" target="_blank">
            LINKEDIN
          </a>
          <a class="font-mono-data text-mono-data text-on-surface-variant hover:text-primary transition-colors" href="#">
            DOCS
          </a>
        </div>
      </div>
    </footer>
  `,
  styles: `
    :host { display: block; }
  `,
})
export class FooterComponent { }
