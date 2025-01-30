import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Barbearia O Búlgaro';
  private overlay: HTMLElement | null = null;

  ngOnInit() {
    this.setupMobileMenu();
  }

  ngOnDestroy() {
    this.cleanupMobileMenu();
  }

  private setupMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    const body = document.body;

    // Criar overlay
    this.overlay = document.createElement('div');
    this.overlay.className = 'mobile-nav-overlay';
    body.appendChild(this.overlay);

    // Toggle menu
    menuToggle?.addEventListener('click', () => {
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', (!isExpanded).toString());
      mobileNav?.classList.toggle('active');
      this.overlay?.classList.toggle('active');
      body.style.overflow = isExpanded ? '' : 'hidden';
    });

    // Fechar menu ao clicar no overlay
    this.overlay?.addEventListener('click', () => this.closeMenu(menuToggle, mobileNav, body));

    // Fechar menu ao clicar nos links
    const mobileLinks = document.querySelectorAll('.mobile-nav-list a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => this.closeMenu(menuToggle, mobileNav, body));
    });

    // Fechar menu ao redimensionar para desktop
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768 && mobileNav?.classList.contains('active')) {
        this.closeMenu(menuToggle, mobileNav, body);
      }
    });
  }

  private closeMenu(
    menuToggle: Element | null, 
    mobileNav: Element | null, 
    body: HTMLElement
  ) {
    menuToggle?.setAttribute('aria-expanded', 'false');
    mobileNav?.classList.remove('active');
    this.overlay?.classList.remove('active');
    body.style.overflow = '';
  }

  private cleanupMobileMenu() {
    this.overlay?.remove();
  }
} 