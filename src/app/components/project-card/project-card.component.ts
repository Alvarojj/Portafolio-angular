import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Project } from '../../models/project.interface';

@Component({
  selector: 'app-project-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  template: `
    <article class="border border-gray-200 dark:border-gray-700 p-margin-md flex flex-col h-full bg-white dark:bg-surface-container transition-colors duration-300 hover:border-black dark:hover:border-white">
      <h3 class="font-label-mono text-label-mono font-bold text-black dark:text-white mb-4">
        {{ project().title }}
      </h3>
      <p class="font-body-md text-body-md text-gray-500 dark:text-gray-400 flex-grow mb-6">
        {{ project().description }}
      </p>
      <div class="flex flex-wrap gap-2 mb-8">
        @for (tech of project().techs; track tech) {
          <span class="font-label-mono text-[10px] uppercase border border-gray-200 dark:border-gray-600 px-2 py-1 rounded text-gray-600 dark:text-gray-300">
            {{ tech }}
          </span>
        }
      </div>
      <div class="flex gap-4 mt-auto">
        <a [routerLink]="['/projects', project().id]" class="font-label-mono text-label-mono text-black dark:text-white border-b border-black dark:border-white pb-1 hover:opacity-70 transition-opacity cursor-pointer">
          VIEW PROJECT
        </a>
        <a class="font-label-mono text-label-mono text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors" href="{{project().codeUrl}}" target="_Blank">
          CODE
        </a>
      </div>
    </article>
  `,
  styles: `
    :host { display: block; }
  `,
})
export class ProjectCardComponent {
  project = input.required<Project>();
}
