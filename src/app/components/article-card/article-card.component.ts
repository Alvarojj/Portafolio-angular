import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BlogPost } from '../../models/blog-post.interface';

@Component({
  selector: 'app-article-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  template: `
    <article class="group border border-gray-200 dark:border-gray-700 p-margin-md hover:border-gray-300 dark:hover:border-gray-600 transition-colors bg-white dark:bg-gray-900">
      <div class="flex flex-col md:flex-row gap-gutter items-start">
        <div class="w-full md:w-3/4 flex flex-col gap-margin-sm">
          <time class="font-label-mono text-label-mono text-gray-500 dark:text-gray-400">{{ post().date }}</time>
          <h2 class="font-headline-md text-headline-md text-black dark:text-white group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">
            {{ post().title }}
          </h2>
          <p class="font-body-md text-body-md text-gray-500 dark:text-gray-400">
            {{ post().description }}
          </p>
          <div class="flex flex-wrap gap-2 mt-2">
            @for (tag of post().tags; track tag) {
              <span class="font-label-mono text-label-mono text-xs border border-gray-200 dark:border-gray-700 px-2 py-0.5 rounded text-gray-500 dark:text-gray-400">
                {{ tag }}
              </span>
            }
          </div>
        </div>
        <div class="w-full md:w-1/4 flex justify-end mt-4 md:mt-0">
          <a
            [routerLink]="['/blog', post().slug]"
            class="flex items-center gap-2 font-label-mono text-label-mono text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            Leer Artículo
            <span class="material-symbols-outlined text-sm">arrow_forward</span>
          </a>
        </div>
      </div>
    </article>
  `,
})
export class ArticleCardComponent {
  post = input.required<BlogPost>();
}
