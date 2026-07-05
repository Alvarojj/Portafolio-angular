import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { SectionTitleComponent } from '../section-title/section-title.component';
import { TechIconComponent } from '../tech-icon/tech-icon.component';
import { TechStackItem } from '../../models/tech-stack.interface';

@Component({
  selector: 'app-stack-section',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SectionTitleComponent, TechIconComponent],
  template: `
    <section class="pb-section-gap flex flex-col gap-margin-md" id="stack">
      <app-section-title title="Tecnologías principales" />
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-element-gap">
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
