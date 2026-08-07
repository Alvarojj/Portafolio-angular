import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { ExperienceItemComponent } from '../experience-item/experience-item.component';
import { Experience } from '../../models/experience.interface';

@Component({
  selector: 'app-experience-section',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExperienceItemComponent],
  template: `
    <section class="flex flex-col gap-lg" id="experience">
      <div class="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 pb-4 border-b border-outline-variant">
        <h2 class="font-headline-lg-mobile md:font-headline-lg md:text-headline-lg font-headline-lg-mobile text-headline-lg-mobile text-on-surface mb-2">
          Evolución Profesional
        </h2>
      </div>
      <div class="flex flex-col">
        @for (exp of experiences(); track exp.id; let isLast = $last) {
          <app-experience-item [experience]="exp" [isLast]="isLast" />
        }
      </div>
    </section>
  `,
  styles: `
    :host { display: block; }
  `,
})
export class ExperienceSectionComponent {
  experiences = input.required<Experience[]>();
}