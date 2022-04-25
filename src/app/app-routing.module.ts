import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { UsersComponent } from './components/users/users.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CommandsComponent } from './components/commands/commands.component';
import { MycommandsComponent } from './components/mycommands/mycommands.component';
import { MyreviewsComponent } from './components/myreviews/myreviews.component';
import { PictureComponent } from './components/picture/picture.component';

const routes: Routes = 
[
  {path: "", component: HomeComponent},
  {path: "profile", component: ProfileComponent},
  {path: "commands", component: CommandsComponent},
  {path: "reviews", component: ReviewsComponent},
  {path: "mycommands", component: MycommandsComponent},
  {path: "myreviews", component: MyreviewsComponent},
  {path: "users", component: UsersComponent},
  {path: "pictures", component: PictureComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
