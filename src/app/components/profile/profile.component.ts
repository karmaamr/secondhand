import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { User } from '@angular/fire/auth';
import { ImageUploadService } from '../../services/image-upload.service';
import { HotToastService } from '@ngneat/hot-toast';
import { concatMap } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{

  user$ =this.authService.currentUser$

  profileForm = new FormGroup({
    uid: new FormControl(''),
    displayName: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    phone: new FormControl(''),
    address: new FormControl('')
  });
   
  constructor(private authService : AuthenticationService ,private toast: HotToastService, private imageUploadService : ImageUploadService, private usersServices: UsersService){}

   ngOnInit(): void {
    // this.usersServices.currentUserProfile$.subscribe((user) => {
    //   this.profileForm.patchValue({ ...user });
    // })
   }

   uploadImage(event: any , user: User){
    this.imageUploadService.uploadImage(event.target.files[0], `images/profile/${user.uid}`).pipe(
      this.toast.observe(
        {
          loading: 'Image is being uploaded ...',
          success: 'Image uploaded!',
          error: 'There was an error in uploading'
        }
      ),
      concatMap((photoURL) => this.authService.updateProfileData({ photoURL }))
    ).subscribe();
   }
   saveProfile(){}
}
