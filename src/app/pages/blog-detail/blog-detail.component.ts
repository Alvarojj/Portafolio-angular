import { Component, signal, ChangeDetectionStrategy, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BLOG_POSTS } from '../../data/blog-posts.data';
import { BlogContentRendererComponent } from '../../components/blog-content-renderer/blog-content-renderer.component';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, BlogContentRendererComponent],
  template: `
    <div class="flex flex-col items-center w-full">
      <article class="max-w-3xl w-full">
        <a routerLink="/blog" class="inline-flex items-center gap-2 font-label-mono text-label-mono text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors mb-margin-md">
          <span class="material-symbols-outlined text-[16px]">arrow_back</span>
          Back to Blog
        </a>

        @if (post(); as post) {
          <header class="mb-section-gap">
            <div class="flex items-center gap-4 mb-margin-sm font-label-mono text-label-mono text-gray-500 dark:text-gray-400">
              <time>{{ post.date }}</time>
              <div class="w-1 h-1 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
              <div class="flex gap-2">
                @for (tag of post.tags; track tag) {
                  <span class="px-2 py-0.5 border border-gray-200 dark:border-gray-700 rounded text-black dark:text-white bg-white dark:bg-gray-900">
                    {{ tag }}
                  </span>
                }
              </div>
            </div>
            <h1 class="font-headline-xl-mobile md:font-headline-xl text-headline-xl-mobile md:text-headline-xl text-black dark:text-white mb-margin-md max-w-2xl">
              {{ post.title }}
            </h1>
          </header>

          @if (post.content) {
            <app-blog-content-renderer [blocks]="post.content" />
          } @else {
            <p class="font-body-lg text-body-lg text-gray-500 dark:text-gray-400">
              Contenido en preparación...
            </p>
          }

          <div class="mt-section-gap pt-margin-lg border-t border-gray-200 dark:border-gray-700 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <span class="font-label-mono text-label-mono text-gray-500 dark:text-gray-400">
              Etiquetas: {{ post.tags.join(', ') }}
            </span>
            <button class="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded font-label-mono text-label-mono hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              Compartir Artículo
            </button>
          </div>
        } @else {
          <p class="font-body-lg text-body-lg text-gray-500 dark:text-gray-400">
            Artículo no encontrado.
          </p>
        }
      </article>
    </div>
  `,
})
export class BlogDetailComponent {
  private route = inject(ActivatedRoute);
  post = signal(
    BLOG_POSTS.find((p) => p.slug === this.route.snapshot.paramMap.get('slug')),
  );
}
