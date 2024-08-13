import {Component, OnInit} from '@angular/core';
import {ThemeService} from 'app/services/theme/theme.service';

@Component({
  selector: 'app-theme-toggle-button',
  template: `
    <div class="switch-mode-container" title="Switch mode" (click)="toggleMode()">
      <input type="checkbox" class="checkbox" [checked]="darkMode"/>
      <label for="toggle" class="switch"></label>
    </div>
  `,
  styleUrls: ['./theme-toggle-button.component.scss'],
  providers: [ThemeService]
})
export class ThemeToggleButtonComponent implements OnInit {
  public darkMode: boolean;

  constructor(
    private readonly themeService: ThemeService
  ) {
  }

  ngOnInit(): void {    // Set theme
    const storedTheme = localStorage.getItem('DWTheme');
    const theme: 'dark' | 'light' = storedTheme !== 'dark' && storedTheme !== 'light' ? 'light' : storedTheme;
    this.darkMode = theme === 'dark';
    this.setTheme(theme);
  }

  public toggleMode(): void {
    this.darkMode = !this.darkMode;
    const themeAttribute = this.darkMode ? 'dark' : 'light';
    this.setTheme(themeAttribute);
  }

  private setTheme(theme: 'dark' | 'light'): void {
    const documentTheme = document.documentElement.getAttribute('data-dark-mode');
    if (documentTheme !== theme) {
      document.documentElement.setAttribute('data-dark-mode', theme);
      this.themeService.switchTheme(theme);
      localStorage.setItem('DWTheme', theme);
    }
  }
}
