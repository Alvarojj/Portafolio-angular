import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { SectionTitleComponent } from '../section-title/section-title.component';
import { ProjectCardComponent } from '../project-card/project-card.component';
import { Project } from '../../models/project.interface';

@Component({
  selector: 'app-projects-section',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SectionTitleComponent, ProjectCardComponent],
  template: `
    <section class="pb-section-gap flex flex-col gap-margin-md" id="projects">
      <app-section-title title="Proyectos Destacados" />
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-element-gap">
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
