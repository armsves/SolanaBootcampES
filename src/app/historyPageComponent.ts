import { Component, inject } from '@angular/core';
import { ShyftApiService } from './shyft-api.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { computedAsync } from 'ngxtension/computed-async';
import { WalletStore } from '@heavy-duty/wallet-adapter';

@Component({
  selector: 'solanabootcamp-settings-page',
  template: `
    <section class="px-16 py-8 bg-white bg-opacity-5">
    <h2 class="text-center text-3xl">Wallet History</h2>

    @if (history()) {
        <div class="relative top-4 left-4 flex flex-col ">
    @for (item of history(); track item) {
        <div class="flex flex-row  text-xl font-bold no-wrap">
            <div class="pr-4">{{ item.timestamp }}</div>
            <div class="pr-4">{{ item.type }}</div>
        </div>
      }
    </div>

} @else { 
    <div class="flex-row text-2xl font-bold">
      Please connect your wallet
    </div>
  }

    </section>
    
    `,
  standalone: true,
})

export class HistoryPageComponent {
  private readonly _shiftApiService2 = inject(ShyftApiService);
  private readonly _walletStore2 = inject(WalletStore);
  private readonly _publicKey2 = toSignal(this._walletStore2.publicKey$);
  readonly history = computedAsync(() => this._shiftApiService2.getTransactionHistory({ 
    publicKey: this._publicKey2()?.toBase58() }), { requireSync: false });
}