import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TopAppBarComponent } from './components/top-app-bar/top-app-bar.component';
import { HeroSectionComponent } from './components/hero-section/hero-section.component';
import { ProjectsSectionComponent } from './components/projects-section/projects-section.component';
import { StackSectionComponent } from './components/stack-section/stack-section.component';
import { ExperienceSectionComponent } from './components/experience-section/experience-section.component';
import { FooterComponent } from './components/footer/footer.component'
import { PROJECTS } from './data/projects.data';
import { TECH_STACK } from './data/tech-stack.data';
import { EXPERIENCES } from './data/experience.data';

@Component({
  selector: 'app-root',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    TopAppBarComponent,
    HeroSectionComponent,
    ProjectsSectionComponent,
    StackSectionComponent,
    ExperienceSectionComponent,
    FooterComponent,
  ],
  template: `
    <div class="flex flex-col min-h-screen bg-background text-on-background">
      <header>
        <app-top-app-bar />
      </header>
      <main class="flex-grow w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pb-xl flex flex-col gap-xl">
        <app-hero-section />
        <app-stack-section [techStack]="techStack" />
        <app-projects-section [projects]="projects" />
        <app-experience-section [experiences]="experiences" />
      </main>
      <footer>
        <app-footer />
      </footer>
    </div>
  `,
  styles: `
    :host { display: block; }
  `,
})
export class AppComponent {
  projects = PROJECTS;
  techStack = TECH_STACK;
  experiences = EXPERIENCES;
}
