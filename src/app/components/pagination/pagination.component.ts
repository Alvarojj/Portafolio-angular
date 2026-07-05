import { Component, input, output, computed, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nav class="flex items-center gap-2">
      <button
        class="w-10 h-10 border border-gray-200 dark:border-gray-700 flex items-center justify-center rounded text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-black dark:hover:text-white disabled:opacity-50 disabled:pointer-events-none transition-colors"
        [disabled]="currentPage() === 1"
        (click)="pageChange.emit(currentPage() - 1)"
      >
        <span class="material-symbols-outlined text-sm">chevron_left</span>
      </button>

      @for (page of visiblePages(); track page) {
        @if (page === '...') {
          <span class="text-gray-500 dark:text-gray-400 mx-2">...</span>
        } @else {
          <button
            class="w-10 h-10 flex items-center justify-center rounded font-label-mono text-label-mono transition-colors"
            [class.bg-gray-100]="currentPage() === page"
            [class.dark:bg-gray-800]="currentPage() === page"
            [class.text-black]="currentPage() === page"
            [class.dark:text-white]="currentPage() === page"
            [class.border]="currentPage() === page"
            [class.border-black]="currentPage() === page"
            [class.dark:border-white]="currentPage() === page"
            [class.border-gray-200]="currentPage() !== page"
            [class.dark:border-gray-700]="currentPage() !== page"
            [class.text-gray-500]="currentPage() !== page"
            [class.dark:text-gray-400]="currentPage() !== page"
            [class.hover:bg-gray-100]="currentPage() !== page"
            [class.dark:hover:bg-gray-800]="currentPage() !== page"
            [class.hover:text-black]="currentPage() !== page"
            [class.dark:hover:text-white]="currentPage() !== page"
            (click)="pageChange.emit(page)"
          >
            {{ page }}
          </button>
        }
      }

      <button
        class="w-10 h-10 border border-gray-200 dark:border-gray-700 flex items-center justify-center rounded text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-black dark:hover:text-white disabled:opacity-50 disabled:pointer-events-none transition-colors"
        [disabled]="currentPage() === totalPages()"
        (click)="pageChange.emit(currentPage() + 1)"
      >
        <span class="material-symbols-outlined text-sm">chevron_right</span>
      </button>
    </nav>
  `,
})
export class PaginationComponent {
  currentPage = input.required<number>();
  totalPages = input.required<number>();
  pageChange = output<number>();

  visiblePages = computed<(number | '...')[]>(() => {
    const current = this.currentPage();
    const total = this.totalPages();
    const pages: (number | '...')[] = [];

    if (total <= 5) {
      for (let i = 1; i <= total; i++) pages.push(i);
      return pages;
    }

    pages.push(1);

    if (current > 3) pages.push('...');

    const start = Math.max(2, current - 1);
    const end = Math.min(total - 1, current + 1);

    for (let i = start; i <= end; i++) pages.push(i);

    if (current < total - 2) pages.push('...');

    pages.push(total);

    return pages;
  });
}
