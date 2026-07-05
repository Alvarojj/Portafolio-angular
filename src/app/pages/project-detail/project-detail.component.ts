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
        <div>
          <h1 class="font-headline-xl text-headline-xl-mobile md:text-headline-xl text-black dark:text-white mb-6">
            {{ project.title }}
          </h1>
          <div class="h-px w-full bg-gray-200 dark:bg-gray-700 mb-6"></div>
          <div class="flex gap-4 flex-wrap">
            @for (tech of project.techs; track tech) {
              <span class="font-label-mono text-label-mono border border-gray-200 dark:border-gray-700 px-3 py-1 rounded text-gray-600 dark:text-gray-300">
                {{ tech }}
              </span>
            }
          </div>
          <div class="flex gap-4 mt-6">
            <a
              [href]="project.codeUrl"
              target="_blank"
              class="button-primary font-label-mono text-label-mono uppercase"
            >
              VER CÓDIGO
            </a>
            @if (project.videoUrl && project.videoUrl !== '#') {
              <a
                [href]="project.videoUrl"
                target="_blank"
                class="button-secondary font-label-mono text-label-mono uppercase"
              >
                VER VIDEO
              </a>
            }
          </div>
        </div>

        <section class="grid grid-cols-1 md:grid-cols-12 gap-gutter">
          <div class="md:col-span-4 flex flex-col justify-start">
            <h2 class="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-black dark:text-white mb-4">
              01. El Reto
            </h2>
            <p class="font-label-mono text-label-mono text-gray-500 dark:text-gray-400 uppercase tracking-widest">
              El Reto
            </p>
          </div>
          <div class="md:col-span-8">
            <p class="font-body-lg text-body-lg text-gray-500 dark:text-gray-400 border-l border-gray-200 dark:border-gray-700 pl-6 py-2">
              {{ project.challenge }}
            </p>
          </div>
        </section>

        <section>
          <div class="grid grid-cols-1 md:grid-cols-12 gap-gutter mb-8">
            <div class="md:col-span-4 flex flex-col justify-start">
              <h2 class="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-black dark:text-white mb-4">
                02. La Arquitectura
              </h2>
              <p class="font-label-mono text-label-mono text-gray-500 dark:text-gray-400 uppercase tracking-widest">
                La Arquitectura
              </p>
            </div>
          </div>
          @if (project.architectureImage) {
            <div class="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-4 md:p-8">
              <img
                [src]="project.architectureImage"
                alt="Diagrama de Arquitectura"
                class="w-full h-auto object-contain border border-gray-200/30 dark:border-gray-700/30"
              />
              @if (project.architectureCaption) {
                <p class="font-label-mono text-label-mono text-gray-500 dark:text-gray-400 mt-6 text-center">
                  {{ project.architectureCaption }}
                </p>
              }
            </div>
          }
        </section>

        <section class="grid grid-cols-1 md:grid-cols-12 gap-gutter">
          <div class="md:col-span-4 flex flex-col justify-start">
            <h2 class="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-black dark:text-white mb-4">
              03. Buenas Prácticas Aplicadas
            </h2>
            <p class="font-label-mono text-label-mono text-gray-500 dark:text-gray-400 uppercase tracking-widest">
              Buenas Prácticas Aplicadas
            </p>
          </div>
          <div class="md:col-span-8">
            <ul class="space-y-4 font-body-lg text-body-lg text-gray-500 dark:text-gray-400">
              @for (practice of project.bestPractices; track practice.title) {
                <li class="flex items-start">
                  <span class="mr-3 font-label-mono text-black dark:text-white">-</span>
                  <div>
                    <strong class="text-black dark:text-white font-semibold">{{ practice.title }}:</strong>
                    {{ practice.description }}
                  </div>
                </li>
              }
            </ul>
          </div>
        </section>
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
