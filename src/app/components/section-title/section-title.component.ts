import { Component, input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-section-title',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="border-b border-outline-variant pb-4 mb-4">
      <h2 class="font-label-caps text-label-caps text-on-background uppercase">
        {{ title() }}
      </h2>
    </div>
  `,
  styles: `
    :host { display: block; }
  `,
})
export class SectionTitleComponent {
  title = input.required<string>();
}
