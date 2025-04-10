import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Component, inject } from '@angular/core';
import { ButtonComponent } from '../../../../../../components/button/button.component';

@Component({
  selector: 'organization-setup-step-three',
  imports: [ButtonComponent, CommonModule],
  templateUrl: './step-three.component.html',
  styleUrl: './step-three.component.scss'
})
export class StepThreeComponent {

  private _router =inject(Router);

  isUploading =false;

  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;

  cancelUpload(){
    this.isUploading =false
  }


  uploadLogo(){
    if(this.selectedFile){
      this.isUploading =true;
      this._router.navigateByUrl('/onboarding/business/organization-setup/success')
    }
  }

  back(){
    this._router.navigateByUrl('/onboarding/business/organization-setup/step-two');
  }


  handleFileInput(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }
  removeImage(){
    this.cancelUpload();
    this.imagePreview =null;
    this.selectedFile =null;
  }
}
