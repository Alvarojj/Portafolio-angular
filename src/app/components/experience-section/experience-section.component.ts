import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { SectionTitleComponent } from '../section-title/section-title.component';
import { ExperienceItemComponent } from '../experience-item/experience-item.component';
import { Experience } from '../../models/experience.interface';

@Component({
  selector: 'app-experience-section',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SectionTitleComponent, ExperienceItemComponent],
  template: `
    <section class="pb-section-gap flex flex-col gap-margin-md" id="experience">
      <app-section-title title="Experiencia Profesional" />
      <div class="flex flex-col gap-12">
        @for (exp of experiences(); track exp.id) {
          <app-experience-item [experience]="exp" />
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
