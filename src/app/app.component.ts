import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HdWalletMultiButtonComponent } from '@heavy-duty/wallet-adapter-material';
import { MatAnchor } from '@angular/material/button';

@Component({
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    MatAnchor,
    HdWalletMultiButtonComponent,
  ],
  selector: 'solanabootcamp-root',
  template: `
    <header class="px-16 pt-20 pb-8 relative">
      <h1 class="text-center text-5xl mb-4">My Bank</h1>

      <div class="flex justify-center mb-4">
        <hd-wallet-multi-button></hd-wallet-multi-button>
      </div>

      <nav>
        <ul class="flex justify-center items-center gap-4">
          <li>
            <a [routerLink]="['balance']" mat-raised-button>Balance</a>
          </li>
          <li>
            <a [routerLink]="['history']" mat-raised-button>History</a>
          </li>
        </ul>
      </nav>
    </header>

    <main>
      <router-outlet></router-outlet>
    </main>
  `,
})
export class AppComponent { }