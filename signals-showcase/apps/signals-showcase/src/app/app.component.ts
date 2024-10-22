import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
import { LogRootComponent } from '@showcase/log-events';
import { ProductListRootComponent } from '@showcase/product-list';
import { CartRootComponent } from '@showcase/cart';
import { ProductDetailsRootComponent } from '@showcase/product-details';

@Component({
  standalone: true,
  imports: [
    NxWelcomeComponent,
    RouterModule,
    LogRootComponent,
    ProductListRootComponent,
    CartRootComponent,
    ProductDetailsRootComponent,
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'signals-showcase';
}
