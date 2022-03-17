import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import { CDGInterceptor } from './Interceptor/CDGInterceptor';
import { CommandsComponent } from './commands/commands.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { MyreviewsComponent } from './myreviews/myreviews.component';
import { MycommandsComponent } from './mycommands/mycommands.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { UsersComponent } from './users/users.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {DialogUsersComponent } from './dialog-users/dialog-users.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { DialogReviewComponent } from './dialog-review/dialog-review.component';
import { DialogAppointmentComponent } from './dialog-appointment/dialog-appointment.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { DialogPictureComponent } from './dialog-picture/dialog-picture.component';
import { PictureComponent } from './picture/picture.component';
import { DialogSlidePictureComponent } from './dialog-slide-picture/dialog-slide-picture.component';
import { NgImageSliderModule } from 'ng-image-slider';
import { DialogAddReviewComponent } from './dialog-add-review/dialog-add-review.component';
import { NgxMaterialRatingModule } from "ngx-material-rating";
import {MatCardModule} from '@angular/material/card';
import { DialogMakeAppointmentComponent } from './dialog-make-appointment/dialog-make-appointment.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatDividerModule } from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    HomeComponent,
    ForgotpasswordComponent,
    CommandsComponent,
    ReviewsComponent,
    MyreviewsComponent,
    MycommandsComponent,
    UsersComponent,
    DialogUsersComponent,
    DialogReviewComponent,
    DialogAppointmentComponent,
    DialogPictureComponent,
    PictureComponent,
    DialogSlidePictureComponent,
    DialogAddReviewComponent,
    DialogMakeAppointmentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatSortModule,
    MatMenuModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgImageSliderModule,
    NgxMaterialRatingModule,
    MatDividerModule,
    NgbModule,
    MatListModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CDGInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
