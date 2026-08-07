import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { TechStackItem } from '../../models/tech-stack.interface';

@Component({
  selector: 'app-tech-icon',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'flex flex-col items-center justify-center p-md border border-outline-variant bg-surface-container-low rounded-lg aspect-square cursor-default transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-lg hover:border-primary/60 hover:bg-surface-container-high group',
  },
  template: `
    <span class="material-symbols-outlined text-4xl mb-4 text-on-surface-variant transition-colors duration-300 group-hover:text-primary"
          style="font-variation-settings: 'FILL' 0;">
      {{ item().icon }}
    </span>
    <span class="font-mono-data text-mono-data font-bold text-on-background text-center transition-colors duration-300 group-hover:text-primary">
      {{ item().label }}
    </span>
  `,
})
export class TechIconComponent {
  item = input.required<TechStackItem>();
}
