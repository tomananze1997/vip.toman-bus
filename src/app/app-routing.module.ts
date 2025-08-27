import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutUsComponent, ContactUsComponent, HomepageComponent, PrivacyPolicyComponent } from '@pages';

import { languageResolver } from './resolvers';

const routes: Routes = [
  {
    path: ':lang',
    resolve: { lang: languageResolver },
    children: [
      {
        path: '',
        component: HomepageComponent
      },
      {
        path: 'contact-us',
        component: ContactUsComponent
      },
      {
        path: 'about-us',
        component: AboutUsComponent
      },
      {
        path: 'privacy-policy',
        component: PrivacyPolicyComponent
      }
    ]
  },
  {
    path: '',
    redirectTo: 'en',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'en',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
      onSameUrlNavigation: 'reload',
      scrollOffset: [0, 50]
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
