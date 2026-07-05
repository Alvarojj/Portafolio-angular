import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-blog-filter',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex flex-col gap-element-gap">
      <div class="relative w-full">
        <span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">search</span>
        <input
          type="text"
          placeholder="Buscar por palabra clave o concepto..."
          class="w-full bg-white dark:bg-black border border-gray-200 dark:border-gray-700 rounded py-3 pl-12 pr-4 font-label-mono text-label-mono text-black dark:text-white focus:outline-none focus:border-black dark:focus:border-white placeholder-gray-400 dark:placeholder-gray-500 transition-colors"
          [value]="searchQuery()"
          (input)="searchChange.emit($any($event.target).value)"
        />
      </div>
      <div class="flex flex-wrap gap-margin-sm justify-center">
        @for (tag of tags(); track tag) {
          <button
            class="font-label-mono text-label-mono px-3 py-1 rounded transition-colors"
            [class.bg-gray-100]="activeTag() === tag"
            [class.dark:bg-gray-800]="activeTag() === tag"
            [class.text-black]="activeTag() === tag"
            [class.dark:text-white]="activeTag() === tag"
            [class.border]="activeTag() === tag"
            [class.border-black]="activeTag() === tag"
            [class.dark:border-white]="activeTag() === tag"
            [class.border-gray-200]="activeTag() !== tag"
            [class.dark:border-gray-700]="activeTag() !== tag"
            [class.text-gray-500]="activeTag() !== tag"
            [class.dark:text-gray-400]="activeTag() !== tag"
            [class.hover:bg-gray-100]="activeTag() !== tag"
            [class.dark:hover:bg-gray-800]="activeTag() !== tag"
            [class.hover:text-black]="activeTag() !== tag"
            [class.dark:hover:text-white]="activeTag() !== tag"
            (click)="tagChange.emit(tag)"
          >
            {{ tag }}
          </button>
        }
      </div>
    </div>
  `,
})
export class BlogFilterComponent {
  searchQuery = input('');
  activeTag = input('#All');
  tags = input<string[]>([]);
  searchChange = output<string>();
  tagChange = output<string>();
}
