import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';
import { Project } from '../../models/project.interface';

@Component({
  selector: 'app-project-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="relative overflow-hidden rounded-lg monolith-border bg-surface-container-low flex flex-col h-full p-md transition-all duration-300 ease-out group hover:-translate-y-2 hover:border-primary hover:bg-surface-container-high hover:shadow-2xl">
      <div class="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-b from-primary/10 to-transparent"></div>
      <div class="flex-grow relative">
        @if (project().category) {
          <div class="bg-primary/10 text-primary border border-primary/20 px-2 py-0.5 inline-block text-[10px] font-label-caps text-label-caps uppercase tracking-widest mb-6">
            {{ project().category }}
          </div>
        }
        <h3 class="font-headline-md-mobile text-headline-md-mobile md:font-headline-lg md:text-headline-lg text-on-surface mb-4 group-hover:text-primary transition-colors duration-300">
          {{ project().title }}
        </h3>
        <p class="font-body-md text-body-md text-on-surface-variant flex-grow mb-6 leading-relaxed">
          {{ project().description }}
        </p>
        <div class="flex flex-wrap gap-2 mb-4">
          @for (tech of project().techs; track tech) {
            <span class="font-mono-data text-mono-data text-[10px] uppercase px-2 py-1 rounded bg-surface-container-highest text-on-surface-variant">
              {{ tech }}
            </span>
          }
        </div>
      </div>
      <div class="border-t border-outline-variant mt-auto flex justify-between items-center pt-4">
        <a class="font-label-caps text-label-caps text-on-surface group-hover:text-primary transition-colors duration-300" href="{{project().codeUrl}}" target="_Blank">
          VER CÓDIGO
        </a>
        <span class="material-symbols-outlined text-primary group-hover:translate-x-1 transition-transform">arrow_outward</span>
      </div>
    </article>
  `,
  styles: `
    :host { display: block; }
  `,
})
export class ProjectCardComponent {
  project = input.required<Project>();
  viewProject = output<string>();
  viewCode = output<string>();



}
