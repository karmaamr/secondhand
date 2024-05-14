import { Component } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { ImageUploadService } from '../../services/image-upload.service';
import { ListingService } from '../../services/listing.service';

@Component({
  selector: 'app-listing-creation',
  templateUrl: './listing-creation.component.html',
  styleUrl: './listing-creation.component.css'
})
export class ListingCreationComponent {
  title: string = '';
  description: string = '';
  price: number = 0;
  sellerContact: string = '';
  image!: File;
  imageUrl: string = '';

  constructor(
    private authService: AuthenticationService,
    private imageUploadService: ImageUploadService,
    private listingService: ListingService
  ) {}

  createListing() {
    const currentUser = this.authService.currentUser$;
    if (currentUser) {
      currentUser.subscribe(user => {
        if (user) {
          const listingData = {
            title: this.title,
            description: this.description,
            price: this.price,
            sellerContact: this.sellerContact,
            imageUrl: this.imageUrl,
            userId: user.uid // Assuming you have a userId field in your listing data
          };

          this.listingService.createListing(listingData).subscribe(() => {
            console.log('Listing created successfully!');
            // Reset form fields
            this.title = '';
            this.description = '';
            this.price = 0;
            this.sellerContact = '';
            this.imageUrl = '';
          }, error => {
            console.error('Error creating listing: ', error);
          });
        }
      });
    }
  }

  onImageSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      this.imageUploadService.uploadImage(file, 'listings').subscribe(url => {
        this.imageUrl = url;
      }, error => {
        console.error('Error uploading image: ', error);
      });
    }
  }
}
