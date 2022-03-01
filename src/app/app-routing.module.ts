import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommandsComponent } from './commands/commands.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { HomeComponent } from './home/home.component';
import { MycommandsComponent } from './mycommands/mycommands.component';
import { MyreviewsComponent } from './myreviews/myreviews.component';
import { PictureComponent } from './picture/picture.component';
import { ProfileComponent } from './profile/profile.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = 
[
  {path: "", component: HomeComponent},
  {path: "profile", component: ProfileComponent},
  {path: "commands", component: CommandsComponent},
  {path: "reviews", component: ReviewsComponent},
  {path: "mycommands", component: MycommandsComponent},
  {path: "myreviews", component: MyreviewsComponent},
  {path: "users", component: UsersComponent},
  {path: "forgotpassword", component: ForgotpasswordComponent},
  {path: "pictures", component: PictureComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
