import { Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AudiencesComponent } from './audiences/audiences.component';
import { HomeComponent } from './home/home.component';
import { PlanningComponent } from './planning/planning.component';
import { ProductionComponent } from './production/production.component';
import { WorkplaceComponent } from './workplace/workplace.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home Page',
  },
  {
    path: 'about',
    component: AboutComponent,
    title: 'About',
  },
  {
    path: 'planning',
    component: PlanningComponent,
    title: 'Planning',
  },
  {
    path: 'production',
    component: ProductionComponent,
    title: 'Production',
  },
  {
    path: 'workplace',
    component: WorkplaceComponent,
    title: 'Workplace',
  },
  {
    path: 'audiences',
    component: AudiencesComponent,
    title: 'Audiences',
  },
];
