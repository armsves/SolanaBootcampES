import { Component } from '@angular/core';

@Component({
    selector: 'solanabootcamp-hero-section',
    template: `
    <section class="width[500px] px-16 py-24 bg-white bg-opacity-5 align-center">
    <h2 class="text-center text-3xl">Welcome User</h2>
    </section>
  `,
    standalone: true,
})
export class HeroSectionComponent { }