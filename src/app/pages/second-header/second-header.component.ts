import { Component, ElementRef, HostListener } from '@angular/core';  
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Router, RouterModule } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { HeaderComponent } from '../header/header.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-second-header',
  standalone: true,
  imports: [RouterModule, HeaderComponent, CommonModule],
  templateUrl: './second-header.component.html',
  styleUrls: ['./second-header.component.scss']
})
export class SecondHeaderComponent {
  dropdownOpen: boolean = false;
  user?: User;
  constructor(private elementRef: ElementRef, private router: Router, userService: UserService) {
    userService.getCurrentUser().subscribe({next: user => this.user = user });
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: Event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.closeDropdown();
    }
  }

  closeDropdown() {
    this.dropdownOpen = false;
  }

}
