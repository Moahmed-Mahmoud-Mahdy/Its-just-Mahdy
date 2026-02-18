import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CvService } from '../../../core/services/cv.service';
import { Skill } from '../../../core/models/portfolio.model';
import { ScrollRevealDirective } from '../../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss'
})
export class SkillsComponent {
  private cvService = inject(CvService);

  skills: Skill[] = this.cvService.getSkills();
  categories: string[] = ['All', 'Frontend', 'Backend', 'Tools', 'Soft Skills'];
  selectedCategory: string = 'All';

  get filteredSkills(): Skill[] {
    if (this.selectedCategory === 'All') {
      return this.skills;
    }
    return this.skills.filter(skill => skill.category === this.selectedCategory);
  }

  setCategory(category: string): void {
    this.selectedCategory = category;
  }

  getSkillBgColor(color: string): string {
    // Generate a transparent version of the skill color for the icon background
    return `${color}15`; // adding 15 for ~8% opacity or use rgba
  }
}
