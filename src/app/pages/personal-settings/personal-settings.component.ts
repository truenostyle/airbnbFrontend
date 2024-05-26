import { formatDate } from '@angular/common';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { filter, take } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-personal-settings',
  templateUrl: './personal-settings.component.html',
  styleUrls: ['./personal-settings.component.scss'],
})
export class PersonalSettingsComponent {
  @ViewChild('fileInput') fileInput!: ElementRef;
  selectedImageUrl: string | ArrayBuffer | null = null;
  userForm?: FormGroup;

  constructor(userService: UserService, formBuilder: FormBuilder) {
    userService.currentUser$
      .pipe(
        filter((user) => !!user),
        take(1)
      )
      .subscribe({
        next: (user) => {
          console.log(user);
          this.userForm = formBuilder.group({
            userName: [user?.userName, Validators.required],
            email: [user?.email, Validators.required],
            gender: [user?.gender, Validators.required],
            dateOfBirth: [formatDate(user?.dateOfBirth!, "yyyy-MM-dd", 'en-US'), Validators.required],
            password: [''],
            imageUrl: [user?.imageUrl],
          });
        },
      });
  }

  onChoosePhoto() {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImageUrl = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  saveInfo() {
    console.log(this.userForm);
  }
}
