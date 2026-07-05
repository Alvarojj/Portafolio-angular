import { Component, ChangeDetectionStrategy } from '@angular/core';
import { HeroSectionComponent } from '../../components/hero-section/hero-section.component';
import { ProjectsSectionComponent } from '../../components/projects-section/projects-section.component';
import { StackSectionComponent } from '../../components/stack-section/stack-section.component';
import { ExperienceSectionComponent } from '../../components/experience-section/experience-section.component';
import { ContactSectionComponent } from '../../components/contact-section/contact-section.component';
import { PROJECTS } from '../../data/projects.data';
import { TECH_STACK } from '../../data/tech-stack.data';
import { EXPERIENCES } from '../../data/experience.data';

@Component({
  selector: 'app-home-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    HeroSectionComponent,
    ProjectsSectionComponent,
    StackSectionComponent,
    ExperienceSectionComponent,
    ContactSectionComponent,
  ],
  template: `
    <app-hero-section />
    <app-stack-section [techStack]="techStack" />
    <app-projects-section [projects]="projects" />
    <app-experience-section [experiences]="experiences" />
    <app-contact-section />
  `,
})
export class HomePageComponent {
  projects = PROJECTS;
  techStack = TECH_STACK;
  experiences = EXPERIENCES;
}
