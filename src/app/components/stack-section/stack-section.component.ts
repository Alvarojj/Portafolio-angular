import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { TechIconComponent } from '../tech-icon/tech-icon.component';
import { TechStackItem } from '../../models/tech-stack.interface';

@Component({
  selector: 'app-stack-section',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TechIconComponent],
  template: `
    <section class="flex flex-col gap-lg pt-lg" id="stack">
      <div class="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 pb-4 border-b border-outline-variant">
        <h2 class="font-headline-lg-mobile md:font-headline-lg md:text-headline-lg font-headline-lg-mobile text-headline-lg-mobile text-on-surface mb-2">
          Stack Principal
        </h2>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-md">
        @for (tech of techStack(); track tech.name) {
          <app-tech-icon [item]="tech" />
        }
      </div>
    </section>
  `,
  styles: `
    :host { display: block; }
  `,
})
export class StackSectionComponent {
  techStack = input.required<TechStackItem[]>();
}
