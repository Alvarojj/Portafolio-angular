import { Component, ChangeDetectionStrategy } from '@angular/core';
import { SectionTitleComponent } from '../section-title/section-title.component';

@Component({
  selector: 'app-contact-section',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SectionTitleComponent],
  template: `
    <section class="flex flex-col gap-lg max-w-2xl" id="contact">
      <app-section-title title="Initialize Connection" />
      <form class="flex flex-col gap-6" (ngSubmit)="onSubmit()">
        <div class="flex flex-col gap-2">
          <label class="font-mono-data text-mono-data text-on-background" for="name">Name</label>
          <input
            class="w-full bg-transparent border border-outline-variant p-3 font-body-md text-on-background placeholder:text-on-surface-variant/60 focus:outline-none transition-colors"
            id="name"
            type="text"
            placeholder="Your full name" />
        </div>
        <div class="flex flex-col gap-2">
          <label class="font-mono-data text-mono-data text-on-background" for="email">Email</label>
          <input
            class="w-full bg-transparent border border-outline-variant p-3 font-body-md text-on-background placeholder:text-on-surface-variant/60 focus:outline-none transition-colors"
            id="email"
            type="email"
            placeholder="system.admin@domain.com" />
        </div>
        <div class="flex flex-col gap-2">
          <label class="font-mono-data text-mono-data text-on-background" for="comment">Comment</label>
          <textarea
            class="w-full bg-transparent border border-outline-variant p-3 font-body-md text-on-background placeholder:text-on-surface-variant/60 focus:outline-none resize-none transition-colors"
            id="comment"
            placeholder="// Input message payload here..."
            rows="5"></textarea>
        </div>
        <button class="button-primary font-mono-data text-mono-data px-8 py-4 self-start mt-4 border border-transparent" type="submit">
          TRANSMIT
        </button>
      </form>
    </section>
  `,
  styles: `
    :host { display: block; }
  `,
})
export class ContactSectionComponent {
  onSubmit(): void {
    // TODO: Implement form submission
    console.log('Form submitted');
  }
}
