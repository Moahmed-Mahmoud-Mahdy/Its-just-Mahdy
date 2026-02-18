import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CvService } from '../../../core/services/cv.service';
import { ScrollRevealDirective } from '../../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent {
  private cvService = inject(CvService);

  personalInfo = this.cvService.getPersonalInfo();

  highlights = [
    { icon: 'code', title: 'Clean Code' },
    { icon: 'speed', title: 'Performance' },
    { icon: 'devices', title: 'Responsive' },
    { icon: 'sync', title: 'Agile' }
  ];

  stats = [
    { value: `${this.personalInfo.projectsCount}+`, label: 'Projects' },
    { value: `${this.personalInfo.yearsExp}+`, label: 'Years Exp' },
    { value: `${this.personalInfo.clients}+`, label: 'Clients' }
  ];

  scrollToProjects(): void {
    const element = document.querySelector('#projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  scrollToContact(): void {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  downloadCv(): void {
    this.cvService.generatePDF();
  }
}
