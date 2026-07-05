import { Component, signal, computed, ChangeDetectionStrategy, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BlogFilterComponent } from '../../components/blog-filter/blog-filter.component';
import { ArticleCardComponent } from '../../components/article-card/article-card.component';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { BLOG_POSTS, BLOG_TAGS } from '../../data/blog-posts.data';

const ITEMS_PER_PAGE = 5;

@Component({
  selector: 'app-blog-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    BlogFilterComponent,
    ArticleCardComponent,
    PaginationComponent,
  ],
  template: `
    <div class="flex flex-col items-center w-full">
      <header class="w-full max-w-3xl text-center mb-margin-lg">
        <h1 class="font-headline-xl text-headline-xl mb-element-gap hidden md:block">
          Archivo de Artículos
        </h1>
        <h1 class="font-headline-xl-mobile text-headline-xl-mobile mb-element-gap md:hidden">
          Archivo de Artículos
        </h1>
        <p class="font-body-lg text-body-lg text-gray-500 dark:text-gray-400">
          Exploraciones técnicas, arquitecturas de backend, patrones de diseño y análisis de seguridad. Un registro detallado del código en producción y las decisiones de ingeniería detrás del monolito.
        </p>
      </header>

      <div class="w-full max-w-3xl mb-margin-lg">
        <app-blog-filter
          [searchQuery]="searchQuery()"
          [activeTag]="activeTag()"
          [tags]="filterTags()"
          (searchChange)="onSearchChange($event)"
          (tagChange)="onTagChange($event)"
        />
      </div>

      <div class="w-full max-w-4xl flex flex-col gap-margin-lg">
        @for (post of paginatedPosts(); track post.id) {
          <app-article-card [post]="post" />
        } @empty {
          <p class="text-center font-body-md text-body-md text-gray-500 dark:text-gray-400 py-margin-md">
            No se encontraron artículos con los filtros seleccionados.
          </p>
        }

        @if (totalPages() > 1) {
          <div class="flex justify-center mt-margin-md">
            <app-pagination
              [currentPage]="currentPage()"
              [totalPages]="totalPages()"
              (pageChange)="currentPage.set($event)"
            />
          </div>
        }
      </div>
    </div>
  `,
})
export class BlogPageComponent {
  private router = inject(Router);

  searchQuery = signal('');
  activeTag = signal('#All');
  currentPage = signal(1);
  filterTags = signal([...BLOG_TAGS]);

  private posts = BLOG_POSTS;

  private filteredPosts = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    const tag = this.activeTag();

    return this.posts.filter((post) => {
      const matchesTag = tag === '#All' || post.tags.includes(tag);
      const matchesSearch =
        !query ||
        post.title.toLowerCase().includes(query) ||
        post.description.toLowerCase().includes(query) ||
        post.tags.some((t) => t.toLowerCase().includes(query));
      return matchesTag && matchesSearch;
    });
  });

  totalPages = computed(() =>
    Math.max(1, Math.ceil(this.filteredPosts().length / ITEMS_PER_PAGE)),
  );

  paginatedPosts = computed(() => {
    const page = this.currentPage();
    const start = (page - 1) * ITEMS_PER_PAGE;
    return this.filteredPosts().slice(start, start + ITEMS_PER_PAGE);
  });

  onSearchChange(query: string) {
    this.searchQuery.set(query);
    this.currentPage.set(1);
  }

  onTagChange(tag: string) {
    this.activeTag.set(tag);
    this.currentPage.set(1);
  }
}
