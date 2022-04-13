import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './dialogs/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import { CDGInterceptor } from './Interceptor/CDGInterceptor';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { UsersComponent } from './components/users/users.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {DialogUsersComponent } from './dialogs/dialog-users/dialog-users.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { NgImageSliderModule } from 'ng-image-slider';
import { NgxMaterialRatingModule } from "ngx-material-rating";
import {MatCardModule} from '@angular/material/card';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatDividerModule } from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { DialogAddReviewComponent } from './dialogs/dialog-add-review/dialog-add-review.component';
import { DialogAppointmentComponent } from './dialogs/dialog-appointment/dialog-appointment.component';
import { DialogMakeAppointmentComponent } from './dialogs/dialog-make-appointment/dialog-make-appointment.component';
import { DialogPictureComponent } from './dialogs/dialog-picture/dialog-picture.component';
import { DialogReviewComponent } from './dialogs/dialog-review/dialog-review.component';
import { DialogSlidePictureComponent } from './dialogs/dialog-slide-picture/dialog-slide-picture.component';
import { CommandsComponent } from './components/commands/commands.component';
import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';
import { MycommandsComponent } from './components/mycommands/mycommands.component';
import { MyreviewsComponent } from './components/myreviews/myreviews.component';
import { PictureComponent } from './components/picture/picture.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './dialogs/register/register.component';
import { NgChartsModule } from 'ng2-charts';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { DialogForgotPasswordComponent } from './dialogs/dialog-forgot-password/dialog-forgot-password.component';

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
    DialogMakeAppointmentComponent,
    DialogForgotPasswordComponent
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
    MatListModule,
    MatCheckboxModule,
    NgChartsModule,
    MatSlideToggleModule
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
