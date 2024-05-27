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

  constructor(private userService: UserService, formBuilder: FormBuilder) {
    userService.currentUser$
      .pipe(
        filter((user) => !!user),
        take(1)
      )
      .subscribe({
        next: (user) => {
          this.selectedImageUrl = user?.imageUrl!;
          this.userForm = formBuilder.group({
            userName: [user?.userName, Validators.required],
            email: [user?.email, Validators.required],
            gender: [user?.gender, Validators.required],
            dateOfBirth: [
              formatDate(user?.dateOfBirth!, 'yyyy-MM-dd', 'en-US'),
              Validators.required,
            ],
            currentPassword: [undefined],
            newPassword: [undefined],
            imageBase64: [undefined],
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
        const dataBase64: string = reader.result as string;
        this.selectedImageUrl = reader.result;
        this.userForm
          ?.get('imageBase64')
          ?.setValue(dataBase64.substr(dataBase64.indexOf(',') + 1));
      };
      reader.readAsDataURL(file);
    }
  }

  saveInfo() {
    this.userService
      .updateDataInfo(this.userForm?.value)
      .subscribe({ next: () => window.location.reload() });
  }
}
