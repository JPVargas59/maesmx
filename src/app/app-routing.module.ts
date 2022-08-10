import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LandingComponent} from "./landing/landing.component";
import {canActivate, redirectLoggedInTo, redirectUnauthorizedTo} from "@angular/fire/compat/auth-guard";

// const adminOnly = () => hasCustomClaim('admin');
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['auth/sign-in']);
const redirectAuthorizedToHome = () => redirectLoggedInTo(['/student']);

const routes: Routes = [
  // lazy loading routes
  // auth
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule), ...canActivate(redirectAuthorizedToHome)
  },
  // peer
  {
    path: 'maes',
    loadChildren: () => import('./peer/peer.module').then(m => m.PeerModule), ...canActivate(redirectUnauthorizedToLogin)
  },
  // student
  {
    path: 'student',
    loadChildren: () => import('./student/student.module').then(m => m.StudentModule), ...canActivate(redirectUnauthorizedToLogin)
  },
  // admin
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule), ...canActivate(redirectUnauthorizedToLogin)
  },
  // student
  {
    path: 'student',
    loadChildren: () => import('./student/student.module').then(m => m.StudentModule),
    ...canActivate(redirectUnauthorizedToLogin)
  },
  // Coordi
  {
    path: 'coordi',
    loadChildren: () => import('./coordi/coordi.module').then(m => m.CoordiModule),
    ...canActivate(redirectUnauthorizedToLogin)
  },
  // Home
  {path: '', component: LandingComponent},
  // 404
  { path: '**', redirectTo: '' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
