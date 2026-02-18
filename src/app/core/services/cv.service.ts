import { Injectable, inject } from '@angular/core';
import { ProjectsService } from './projects.service';
import { Skill, PersonalInfo } from '../models/portfolio.model';

@Injectable({
  providedIn: 'root'
})
export class CvService {
  private projectsService = inject(ProjectsService);

  private personalInfo: PersonalInfo = {
    name: 'Mohamed Mahmoud Mahdy',
    title: 'Full-Stack Developer',
    email: 'multra2006@gmail.com',
    phone: '+20 110 189 1846',
    linkedIn: 'https://www.linkedin.com/in/mohamed-mahdy-898217305/',
    github: 'https://github.com/Moahmed-Mahmoud-Mahdy',
    aboutMe: 'A passionate Full-Stack Developer with expertise in building robust web applications using modern technologies. Focused on creating seamless user experiences and scalable backend architectures. I specialize in Angular, TypeScript, and full-stack development.',
    yearsExp: 1,
    projectsCount: 25,
    clients: 4
  };

  private skills: Skill[] = [
    {
      name: 'Angular',
      percentage: 90,
      icon: 'fa-brands fa-angular',
      iconType: 'fontawesome',
      description: 'Expertise in SPA architecture, RxJS state management, and NGRX.',
      color: '#dd0031',
      category: 'Frontend'
    },
    {
      name: 'JavaScript / TypeScript',
      percentage: 95,
      icon: 'fa-brands fa-square-js',
      iconType: 'fontawesome',
      description: 'Core logic and Type-safe development with ES6+ and asynchronous patterns.',
      color: '#f7df1e',
      category: 'Frontend'
    },
    {
      name: 'HTML / CSS / Bootstrap',
      percentage: 95,
      icon: 'fa-brands fa-html5',
      iconType: 'fontawesome',
      description: 'Pixel-perfect responsive design using modern CSS Grid and Flexbox.',
      color: '#e34f26',
      category: 'Frontend'
    },
    {
      name: 'Node.js / Express',
      percentage: 80,
      icon: 'fa-brands fa-node-js',
      iconType: 'fontawesome',
      description: 'Building scalable server-side applications and RESTful APIs.',
      color: '#339933',
      category: 'Backend'
    },
    {
      name: 'MongoDB / SQL',
      percentage: 75,
      icon: 'fa-solid fa-database',
      iconType: 'fontawesome',
      description: 'Managing and optimizing database schemas and complex queries.',
      color: '#47a248',
      category: 'Backend'
    },
    {
      name: 'Git / GitHub',
      percentage: 85,
      icon: 'fa-brands fa-git-alt',
      iconType: 'fontawesome',
      description: 'Version Control and Collaborative Workflow with GitFlow and CI/CD.',
      color: '#f05032',
      category: 'Tools'
    },
    {
      name: 'Anti Gravity',
      percentage: 100,
      icon: 'fa-brands fa-github-alt',
      iconType: 'fontawesome',
      description: 'Advanced agentic AI coding assistant for rapid and efficient development.',
      color: '#9c27b0',
      category: 'Tools'
    },
    {
      name: 'Problem Solving',
      percentage: 90,
      icon: 'psychology',
      iconType: 'material',
      description: 'Analytical thinking and creative approach to complex technical challenges.',
      color: '#673ab7',
      category: 'Soft Skills'
    },
    {
      name: 'Communication',
      percentage: 85,
      icon: 'chat',
      iconType: 'material',
      description: 'Effective collaboration and clear communication in team environments.',
      color: '#00bcd4',
      category: 'Soft Skills'
    }
  ];

  getPersonalInfo(): PersonalInfo {
    return this.personalInfo;
  }

  getSkills(): Skill[] {
    return this.skills;
  }

  generatePDF(): void {
    const link = document.createElement('a');
    link.href = 'assets/cv.pdf';
    link.download = 'Mohmed-Mahmoud-Mahdy-Resume.pdf';
    link.click();
  }
}
