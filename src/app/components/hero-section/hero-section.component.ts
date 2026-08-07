import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="relative min-h-[70vh] lg:min-h-[85vh] flex items-start pt-lg lg:pt-0 lg:items-center overflow-hidden" id="home">
      <div class="absolute inset-0 z-0">
        <img
          alt="Retrato de Alvaro Jimenez"
          class="w-full h-full object-cover grayscale opacity-30 brightness-75"
          src="assets/perfil.webp" />
        <div class="absolute inset-0 hero-gradient"></div>
      </div>
      <div class="relative z-10 max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop w-full grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
        <div class="max-w-2xl">
          <div class="inline-flex items-center space-x-2 bg-surface-container-low monolith-border px-3 py-1 mb-8">
            <span class="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span class="font-label-caps text-label-caps uppercase tracking-widest text-on-surface-variant">Disponible para Infraestructura Crítica</span>
          </div>
          <h1 class="font-headline-lg-mobile text-headline-lg-mobile md:font-display-lg md:text-display-lg text-on-surface mb-6 leading-[1.1]">
            Desarrollador <span class="text-primary">backend.</span>
          </h1>
          <p class="font-body-md text-body-md text-on-surface-variant mb-10 max-w-xl leading-relaxed">
            Ingeniero apasionado especializado en arquitecturas backend robustas y sistemas escalables construidos con <span class="text-on-surface font-bold"> Java y Spring Boot. </span>Dedicado a escribir código limpio y mantenible y a resolver desafíos técnicos complejos con soluciones elegantes.
          </p>
          <div class="flex flex-col sm:flex-row gap-4">
            <a class="button-primary font-mono-data text-mono-data px-8 py-4 inline-flex items-center justify-center group" href="#projects">
              VER TRABAJOS
              <span class="material-symbols-outlined ml-2 group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </a>
          </div>
        </div>
        <div class="hidden lg:block relative">
          <div class="monolith-border p-2 bg-surface-container-low shadow-2xl overflow-hidden aspect-[4/5]">
            <img
              alt="Alvaro Jimenez"
              class="w-full h-full object-cover"
              src="assets/perfil.webp" />
          </div>
          <div class="absolute -bottom-10 -right-10 w-40 h-40 border border-primary/20 -z-10"></div>
          <div class="absolute -top-10 -left-10 w-40 h-40 border border-primary/20 -z-10"></div>
        </div>
      </div>
    </section>
  `,
  styles: `
    :host { display: block; }
  `,
})
export class HeroSectionComponent { }
