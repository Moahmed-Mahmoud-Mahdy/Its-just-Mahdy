import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsService } from '../../../core/services/projects.service';
import { AuthService } from '../../../core/services/auth.service';
import { Project } from '../../../core/models/portfolio.model';
import { PasswordModalComponent } from '../../admin/password-modal/password-modal.component';
import { ProjectEditorComponent } from '../../admin/project-editor/project-editor.component';
import { ScrollRevealDirective } from '../../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    CommonModule, 
    PasswordModalComponent, 
    ProjectEditorComponent,
    ScrollRevealDirective
  ],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {
  private projectsService = inject(ProjectsService);
  private authService = inject(AuthService);

  categories = ['All', 'Web Apps', 'Mobile Apps', 'Mini Apps'];
  activeCategory = signal<string>('All');
  showPasswordModal = signal<boolean>(false);
  showAdminPanel = signal<boolean>(false);

  get filteredProjects(): Project[] {
    return this.projectsService.getProjectsByCategory(this.activeCategory());
  }

  get isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  selectCategory(category: string): void {
    this.activeCategory.set(category);
  }

  openEditProjects(): void {
    if (this.authService.isAuthenticated()) {
      this.showAdminPanel.set(true);
    } else {
      this.showPasswordModal.set(true);
    }
  }

  onPasswordSuccess(): void {
    this.showPasswordModal.set(false);
    this.showAdminPanel.set(true);
  }

  onPasswordCancel(): void {
    this.showPasswordModal.set(false);
  }

  closeAdminPanel(): void {
    this.showAdminPanel.set(false);
  }

  openProject(project: Project): void {
    if (project.liveUrl) {
      window.open(project.liveUrl, '_blank', 'noopener,noreferrer');
    } else if (project.githubUrl) {
      window.open(project.githubUrl, '_blank', 'noopener,noreferrer');
    }
  }

  openGithub(project: Project): void {
    if (project.githubUrl) {
      window.open(project.githubUrl, '_blank', 'noopener,noreferrer');
    }
  }
}
