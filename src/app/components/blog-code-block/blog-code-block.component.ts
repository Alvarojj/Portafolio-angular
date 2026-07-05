import { Component, input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-blog-code-block',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="my-margin-md bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
      @if (filename()) {
        <div class="flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 font-label-mono text-label-mono text-gray-500 dark:text-gray-400">
          <span>{{ filename() }}</span>
        </div>
      }
      <pre class="p-4 overflow-x-auto"><code class="font-label-mono text-label-mono text-gray-600 dark:text-gray-300">{{ code() }}</code></pre>
    </div>
  `,
})
export class BlogCodeBlockComponent {
  filename = input<string>('');
  code = input.required<string>();
  language = input<string>('');
}
