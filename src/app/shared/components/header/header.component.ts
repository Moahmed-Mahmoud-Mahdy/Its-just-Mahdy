import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  themeService = inject(ThemeService);
  
  isMenuOpen = false;
  isClosing = false;

  navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Contact', href: '#contact' }
  ];

  toggleMenu(): void {
    if (this.isMenuOpen) {
      this.closeMenu();
    } else {
      this.isMenuOpen = true;
    }
  }

  closeMenu(): void {
    if (!this.isMenuOpen || this.isClosing) return;
    
    this.isClosing = true;
    setTimeout(() => {
      this.isMenuOpen = false;
      this.isClosing = false;
    }, 400); // Match SCSS animation duration
  }

  scrollTo(event: Event, href: string): void {
    event.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    this.closeMenu();
  }
}
