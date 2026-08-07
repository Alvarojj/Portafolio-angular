import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { Experience } from '../../models/experience.interface';

@Component({
  selector: 'app-experience-item',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex gap-8">
      <div class="flex flex-col items-center">
        <div class="w-4 h-4 rounded-full border-2 border-primary bg-surface flex-shrink-0"></div>
        <div class="w-0.5 h-full bg-outline-variant mt-2" [class.bg-transparent]="isLast()"></div>
      </div>
      <div class="pb-8">
        <span class="text-primary font-label-caps text-label-caps uppercase tracking-widest mb-2 block">
          {{ experience().period }}
        </span>
        <h4 class="font-headline-lg-mobile md:font-headline-lg md:text-headline-lg text-headline-lg-mobile text-on-surface mb-1">
          {{ experience().role }}
        </h4>
        <p class="font-body-md text-body-md text-on-surface-variant mb-4">
          {{ experience().company }}
        </p>
        <ul class="list-none space-y-3">
          @for (ach of experience().achievements; track ach) {
            <li class="font-body-md text-body-md text-on-background flex items-start">
              <span class="mr-3 mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary"></span>
              <span>{{ ach }}</span>
            </li>
          }
        </ul>
      </div>
    </div>
  `,
  styles: `
    :host { display: block; }
  `,
})
export class ExperienceItemComponent {
  experience = input.required<Experience>();
  isLast = input(false);
}