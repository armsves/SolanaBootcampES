import { Component } from '@angular/core';
import { HeroSectionComponent } from './hero-section-component';
import { FeaturesSectionComponent } from './features-section-component';

@Component({
    selector: 'solanabootcamp-home-page',
    template: `
        <section >
            <solanabootcamp-hero-section></solanabootcamp-hero-section>
            <solanabootcamp-features-section></solanabootcamp-features-section>
        <section>
    `,
    standalone: true,

    imports: [HeroSectionComponent, FeaturesSectionComponent]
})

export class HomePageComponent {}