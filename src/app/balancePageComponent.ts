import { Component, inject } from '@angular/core';
import { ShyftApiService } from './shyft-api.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { computedAsync } from 'ngxtension/computed-async';
import { WalletStore } from '@heavy-duty/wallet-adapter';
import { DecimalPipe } from '@angular/common';

@Component({
  imports: [
    DecimalPipe
  ],
  selector: 'solanabootcamp-balance-page',
  template: `
    <div class="flex justify-center">
    <section class="max-w-xl px-16 py-8 bold bg-white bg-opacity-5 align-center">
    <h2 class="text-center text-3xl">Wallet Balance</h2>
    @if (account()) {
      <div class="p4 relative top-4 left-4 flex-col items-center">
      @if (account()?.sol_balance) {
        <div class="flex flex-row text-2xl font-bold p-4">
          <img src="https://assets.coingecko.com/coins/images/4128/standard/solana.png?1696504756" class="w-10 h-10" alt="Coin" />
          <p class="pr-4">Solana SOL {{account()?.sol_balance}}</p>
        </div>
      }
    
    @for (item of account()?.addresses; track item) {
      <div class="flex flex-row text-2xl font-bold p-4">
      <img [src]="item?.info?.image" class="w-10 h-10" alt="Coin" />
      <p class="pr-4">{{ item?.info?.name }} 
      {{ item?.info?.symbol }}
      {{ item?.balance | number }}</p>
      </div>
    } 
  </div>
  } @else { 
    <div class="flex-row text-2xl font-bold">
      Please connect your wallet
    </div>
  }
    </section>
</div>
  `,
  standalone: true,
})
export class BalancePageComponent {
  private readonly _shiftApiService = inject(ShyftApiService);
  private readonly _walletStore = inject(WalletStore);
  private readonly _publicKey = toSignal(this._walletStore.publicKey$);
  readonly account = computedAsync(() => this._shiftApiService.getPortfolio({
    publicKey: this._publicKey()?.toBase58()
  }), { requireSync: false });
  //readonly history = computedAsync(() => this._shiftApiService.getTransactionHistory({ publicKey: this._publicKey()?.toBase58() }), { requireSync: true });
}