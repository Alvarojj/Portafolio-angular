import { Component, signal, ChangeDetectionStrategy, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PROJECTS } from '../../data/projects.data';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  template: `
    <section class="flex flex-col gap-section-gap">
      <a routerLink="/" class="font-label-mono text-label-mono text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">
        &larr; Back to Projects
      </a>

      @if (project(); as project) {
        @if (project.image) {
          <img
            [src]="project.image"
            [alt]="project.title"
            class="w-full rounded"
          />
        }

        <div class="flex flex-col gap-margin-md">
          <h1 class="font-heading-h1 text-heading-h1 font-bold">{{ project.title }}</h1>
          <div class="flex flex-wrap gap-2">
            @for (tech of project.techs; track tech) {
              <span class="font-label-mono text-[10px] uppercase border border-gray-200 dark:border-gray-600 px-2 py-1 rounded text-gray-600 dark:text-gray-300">
                {{ tech }}
              </span>
            }
          </div>
        </div>

        <div class="border-t border-gray-200 dark:border-gray-700"></div>

        <section class="flex flex-col gap-margin-md">
          <h2 class="font-heading-h2 text-heading-h2 font-bold">About the Project</h2>
          <p class="font-body-md text-body-md text-gray-500 dark:text-gray-400 leading-relaxed">
            {{ project.detail }}
          </p>
        </section>

        <section class="flex flex-col gap-margin-md">
          <h2 class="font-heading-h2 text-heading-h2 font-bold">The Challenge</h2>
          <p class="font-body-md text-body-md text-gray-500 dark:text-gray-400 leading-relaxed">
            {{ project.challenge }}
          </p>
        </section>

        <section class="flex flex-col gap-margin-md">
          <h2 class="font-heading-h2 text-heading-h2 font-bold">Best Practices</h2>
          <ul class="list-disc list-inside font-body-md text-body-md text-gray-500 dark:text-gray-400 flex flex-col gap-2">
            @for (practice of project.bestPractices; track practice) {
              <li>{{ practice }}</li>
            }
          </ul>
        </section>

        <div class="flex gap-4 mt-4">
          @if (project.viewUrl && project.viewUrl !== '#') {
            <a [href]="project.viewUrl" class="button-primary font-label-mono text-label-mono" target="_blank">
              VIEW PROJECT
            </a>
          }
          <a [href]="project.codeUrl" class="button-secondary font-label-mono text-label-mono" target="_blank">
            CODE
          </a>
        </div>
      } @else {
        <p class="font-body-md text-body-md text-gray-500 dark:text-gray-400">
          Project not found.
        </p>
      }
    </section>
  `,
})
export class ProjectDetailComponent {
  private route = inject(ActivatedRoute);
  project = signal(PROJECTS.find(p => p.id === this.route.snapshot.paramMap.get('id')));
}
