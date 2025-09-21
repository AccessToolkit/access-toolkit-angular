import { Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AccessibilityComponent } from './accessibility/accessibility.component';
import { AudiencesComponent } from './audiences/audiences.component';
import { HomeComponent } from './home/home.component';
import { OtherResourcesComponent } from './other-resources/other-resources.component';
import { PlanningComponent } from './planning/planning.component';
import { ProductionComponent } from './production/production.component';
import { WorkplaceComponent } from './workplace/workplace.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home – Access Toolkit for Art Workers',
  },
  {
    path: 'about',
    component: AboutComponent,
    title: 'About – Access Toolkit for Art Workers',
  },
  {
    path: 'accessibility',
    component: AccessibilityComponent,
    title: 'Site Accessibility Statement – Access Toolkit for Art Workers',
  },
  {
    path: 'planning',
    component: PlanningComponent,
    title: 'Planning – Access Toolkit for Art Workers',
  },
  {
    path: 'production',
    component: ProductionComponent,
    title: 'Production – Access Toolkit for Art Workers',
  },
  {
    path: 'workplace',
    component: WorkplaceComponent,
    title: 'Workplace – Access Toolkit for Art Workers',
  },
  {
    path: 'audiences',
    component: AudiencesComponent,
    title: 'Audiences – Access Toolkit for Art Workers',
  },
  {
    path: 'other-resources',
    component: OtherResourcesComponent,
    title: 'Other Resources – Access Toolkit for Art Workers',
  },
];
