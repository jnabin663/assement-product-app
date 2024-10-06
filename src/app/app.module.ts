import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationComponent } from './components/navigation/navigation.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ProductHeaderComponent } from './components/product-header/product-header.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { CreateComponentDialogueComponent } from './components/product-list/create-component-dialogue/create-component-dialogue.component';
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
 }
@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    ProductHeaderComponent,
    ProductListComponent,
    CreateComponentDialogueComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    HttpClientModule,
    FormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
    }),
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
