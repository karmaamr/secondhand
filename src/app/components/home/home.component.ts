import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { FormControl } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { combineLatest, map, startWith } from 'rxjs';
import { user } from '@angular/fire/auth';
import { ProfileUser } from '../../models/user-profile';
import { ChatsService } from '../../services/chats.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  user$ = this.authService.currentUser$;

  // users$ =this.usersService.allUsers$;

  searchControl = new FormControl('');

  users$ = combineLatest([this.usersService.allUsers$ ,
     this.user$,
      this.searchControl.valueChanges.pipe(startWith(''))
    ]).pipe(
      map(([users, user, searchString]) => users.filter(u => u.displayName && u.displayName.toLowerCase().includes(searchString!.toLowerCase()) && u.uid !== user?.uid))
  );

  myChats$ = this.chatsService.myChats$;


  constructor(private authService : AuthenticationService , private usersService: UsersService, private chatsService: ChatsService){ }
   
   ngOnInit(): void {
    this.usersService.allUsers$.subscribe(
      (
        auser 
      ) => {console.log(auser)}
    );
   }

   createChat(otherUser: ProfileUser){
     this.chatsService.createChat(otherUser).subscribe();
   }
}
