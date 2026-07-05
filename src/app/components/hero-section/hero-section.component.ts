import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="pb-section-gap flex flex-col gap-element-gap items-start max-w-3xl" id="about">
      <h1 class="font-headline-xl-mobile md:font-headline-xl text-headline-xl-mobile md:text-headline-xl text-black dark:text-white">
        Desarrollador Backend
      </h1>
      <p class="font-body-lg text-body-lg text-black dark:text-white max-w-2xl">
        Desarrollador Backend especializado en construir sistemas robustos y escalables que soportan altos volúmenes de datos, utilizando <span class="text-black dark:text-white font-bold"> Java, Spring Boot </span> y principios de arquitectura limpia.</p>
      <div class="flex gap-4 mt-8">
        <a class="button-primary font-label-mono text-label-mono" href="#projects">
          VER TRABAJO
        </a>
        <a class="button-secondary font-label-mono text-label-mono" href="#contact">
          PONERSE EN CONTACTO
        </a>
      </div>
    </section>
  `,
  styles: `
    :host { display: block; }
  `,
})
export class HeroSectionComponent { }
