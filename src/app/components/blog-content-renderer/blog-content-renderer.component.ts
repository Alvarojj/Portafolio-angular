import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { BlogContentBlock } from '../../types/blog-content.type';
import { BlogCodeBlockComponent } from '../blog-code-block/blog-code-block.component';

@Component({
  selector: 'app-blog-content-renderer',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BlogCodeBlockComponent],
  template: `
    <div class="font-body-lg text-body-lg text-gray-500 dark:text-gray-400 space-y-element-gap leading-relaxed max-w-[680px]">
      @for (block of blocks(); track $index) {
        @switch (block.type) {
          @case ('paragraph') {
            <p>{{ block.content }}</p>
          }
          @case ('heading') {
            @if (block.level === 2) {
              <h2 class="font-headline-md text-headline-md text-black dark:text-white mt-margin-lg mb-margin-sm">
                {{ block.content }}
              </h2>
            }
            @if (block.level === 3) {
              <h3 class="font-headline-lg-mobile text-headline-lg-mobile text-black dark:text-white mt-margin-md mb-margin-sm">
                {{ block.content }}
              </h3>
            }
          }
          @case ('list') {
            <ul class="list-none space-y-3 pl-4 border-l border-gray-200 dark:border-gray-700 my-margin-md">
              @for (item of block.items; track $index) {
                <li class="relative before:content-['-'] before:absolute before:-left-4 before:text-gray-400 dark:before:text-gray-600">
                  - {{ item }}
                </li>
              }
            </ul>
          }
          @case ('code') {
            <app-blog-code-block
              [filename]="block.filename"
              [code]="block.code"
              [language]="block.language"
            />
          }
          @case ('blockquote') {
            <blockquote class="my-margin-md p-6 bg-gray-100 dark:bg-gray-900 border-l-2 border-gray-300 dark:border-gray-600 text-black dark:text-white">
              <p class="font-body-md text-body-md italic m-0">{{ block.content }}</p>
            </blockquote>
          }
        }
      }
    </div>
  `,
})
export class BlogContentRendererComponent {
  blocks = input.required<BlogContentBlock[]>();
}
