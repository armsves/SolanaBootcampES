import { Component } from '@angular/core';

@Component({
  selector: 'solanabootcamp-features-section',
  template: `
    <section class="px-16 py-24">
        <ul class="flex justify-center items-center gap-4">
          <li class="text-xl font-bold">Rapido</li>
          <li class="text-xl font-bold">Seguro</li>
          <li class="text-xl font-bold">Eficiente</li>
        </ul>
    </section>
  `,
  standalone: true,
})
export class FeaturesSectionComponent {}