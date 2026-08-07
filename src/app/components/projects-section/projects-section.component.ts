import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { ProjectCardComponent } from '../project-card/project-card.component';
import { Project } from '../../models/project.interface';

@Component({
  selector: 'app-projects-section',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ProjectCardComponent],
  template: `
    <section class="flex flex-col gap-lg" id="projects">
      <div class="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 pb-4 border-b border-outline-variant">
        <div>
          <h2 class="font-headline-lg-mobile md:font-headline-lg md:text-headline-lg font-headline-lg-mobile text-headline-lg-mobile text-on-surface mb-2">
            Proyectos Destacados
          </h2>
          <p class="font-body-md text-body-md text-on-surface-variant">
            Sistemas de alto impacto para clientes empresariales.
          </p>
        </div>
        <a class="text-primary font-label-caps text-label-caps flex items-center hover:underline group" href="https://github.com/aejimenez19" target="_blank">
          Ver repositorio en GitHub
          <span class="material-symbols-outlined ml-1 group-hover:translate-x-1 transition-transform">arrow_outward</span>
        </a>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
        @for (project of projects(); track project.id) {
          <app-project-card [project]="project" />
        }
      </div>
    </section>
  `,
  styles: `
    :host { display: block; }
  `,
})
export class ProjectsSectionComponent {
  projects = input.required<Project[]>();
}