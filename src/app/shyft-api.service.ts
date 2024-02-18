import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map, of, forkJoin, concatMap } from 'rxjs';

interface Token {
    address: string,
    balance: number,
    info: {
        name: string,
        symbol: string,
        image: string
    },
}

@Injectable({ providedIn: 'root' })
export class ShyftApiService {
    private readonly _httpClient = inject(HttpClient);
    private readonly _header = { 'x-api-key': 'oWXHY0S4UD9AXDt-' };
    private readonly urlAddress = new URL(`https://api.shyft.to/sol/v1/wallet`);

    getAccount({ publicKey }: { publicKey: string | null | undefined; }, _mint: string) {
        if (!publicKey) { return of(null); }

        const url = new URL(this.urlAddress + `/token_balance`);
        url.searchParams.set('network', 'mainnet-beta');
        url.searchParams.set('wallet', publicKey);
        url.searchParams.set('token', _mint);

        return this._httpClient.get<{
            result: Token;
        }>(url.toString(), { headers: this._header })
            .pipe(map((response) => response.result));
    }

    getTransactionHistory({ publicKey }: { publicKey: string | null | undefined; }) {
        if (!publicKey) { return of(null); }

        const url = new URL(this.urlAddress + `/transaction_history`);
        url.searchParams.set('network', 'mainnet-beta');
        url.searchParams.set('wallet', publicKey);

        return this._httpClient.get<{
            result: { timestamp: string, type: string }[];
        }>(url.toString(), { headers: this._header })
            .pipe(map((response) => response.result));
    }

    getPortfolio({ publicKey }: { publicKey: string | null | undefined; }) {
        if (!publicKey) { return of(null); }

        const url = new URL(this.urlAddress + `/get_portfolio`);
        url.searchParams.set('network', 'mainnet-beta');
        url.searchParams.set('wallet', publicKey);

        const result = this._httpClient.get<{
            result: { sol_balance: number; tokens: Token[]; };
        }>(url.toString(), { headers: this._header })
            .pipe(
                concatMap(response => {
                    const result = response.result;
                    const getAddressObservables = result.tokens.map(token =>
                        this.getAccount({ publicKey: publicKey }, token.address)
                    );

                    return forkJoin(getAddressObservables).pipe(
                        map(addresses => ({ sol_balance: result.sol_balance, addresses: addresses }))
                    );
                })
            );

        return result;
    }
}