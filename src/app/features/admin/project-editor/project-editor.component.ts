import { Component, EventEmitter, Output, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProjectsService } from '../../../core/services/projects.service';
import { AuthService } from '../../../core/services/auth.service';
import { Project } from '../../../core/models/portfolio.model';

@Component({
  selector: 'app-project-editor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './project-editor.component.html',
  styleUrl: './project-editor.component.scss'
})
export class ProjectEditorComponent {
  @Output() onClose = new EventEmitter<void>();

  private projectsService = inject(ProjectsService);
  private authService = inject(AuthService);

  showForm = signal<boolean>(false);
  editingProject = signal<Project | null>(null);
  deleteConfirmId = signal<string | null>(null);

  categories: Array<'Web Apps' | 'Mobile Apps' | 'Mini Apps'> = ['Web Apps', 'Mobile Apps', 'Mini Apps'];

  formData = this.getEmptyForm();

  get projects(): Project[] {
    return this.projectsService.projects();
  }

  private getEmptyForm() {
    return {
      title: '',
      description: '',
      techStack: '',
      category: 'Web Apps' as 'Web Apps' | 'Mobile Apps' | 'Mini Apps',
      imageUrl: '',
      githubUrl: '',
      liveUrl: '',
      isPublic: true
    };
  }

  openAddForm(): void {
    this.editingProject.set(null);
    this.formData = this.getEmptyForm();
    this.showForm.set(true);
  }

  openEditForm(project: Project): void {
    this.editingProject.set(project);
    this.formData = {
      title: project.title,
      description: project.description,
      techStack: project.techStack.join(', '),
      category: project.category,
      imageUrl: project.imageUrl,
      githubUrl: project.githubUrl,
      liveUrl: project.liveUrl,
      isPublic: project.isPublic
    };
    this.showForm.set(true);
  }

  closeForm(): void {
    this.showForm.set(false);
    this.editingProject.set(null);
  }

  saveProject(): void {
    if (!this.formData.title.trim() || !this.formData.description.trim()) {
      return;
    }

    const techStack = this.formData.techStack
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0);

    const editing = this.editingProject();

    if (editing) {
      this.projectsService.updateProject(editing.id, {
        title: this.formData.title.trim(),
        description: this.formData.description.trim(),
        techStack,
        category: this.formData.category,
        imageUrl: this.formData.imageUrl.trim(),
        githubUrl: this.formData.githubUrl.trim(),
        liveUrl: this.formData.liveUrl.trim(),
        isPublic: this.formData.isPublic
      });
    } else {
      this.projectsService.addProject({
        title: this.formData.title.trim(),
        description: this.formData.description.trim(),
        techStack,
        category: this.formData.category,
        imageUrl: this.formData.imageUrl.trim() || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800',
        githubUrl: this.formData.githubUrl.trim(),
        liveUrl: this.formData.liveUrl.trim(),
        isPublic: this.formData.isPublic
      });
    }

    this.closeForm();
  }

  confirmDelete(id: string): void {
    this.deleteConfirmId.set(id);
  }

  cancelDelete(): void {
    this.deleteConfirmId.set(null);
  }

  deleteProject(id: string): void {
    this.projectsService.deleteProject(id);
    this.deleteConfirmId.set(null);
  }

  toggleVisibility(id: string): void {
    this.projectsService.toggleProjectVisibility(id);
  }

  logout(): void {
    this.authService.logout();
    this.onClose.emit();
  }

  closePanel(): void {
    this.onClose.emit();
  }
}
