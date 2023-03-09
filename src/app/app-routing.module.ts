import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LandingComponent} from "./landing/landing.component";
import {canActivate, redirectLoggedInTo, redirectUnauthorizedTo} from "@angular/fire/compat/auth-guard";
import {RoleGuard} from "./guards/role.guard";
import {Role} from "./models/UserInfo";

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
    loadChildren: () => import('./peer/peer.module').then(m => m.PeerModule), ...canActivate(redirectUnauthorizedToLogin),
    canLoad: [RoleGuard],
    data: {roles: [Role.Peer, Role.Coordi, Role.Admin, Role.SubjectCoordi]}
  },
  // student
  {
    path: 'student',
    loadChildren: () => import('./student/student.module').then(m => m.StudentModule), ...canActivate(redirectUnauthorizedToLogin),
  },
  // admin
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule), ...canActivate(redirectUnauthorizedToLogin),
    canLoad: [RoleGuard],
    data: {roles: [Role.Admin]}
  },
  // Coordi
  {
    path: 'coordi',
    loadChildren: () => import('./coordi/coordi.module').then(m => m.CoordiModule),
    ...canActivate(redirectUnauthorizedToLogin),
    canLoad: [RoleGuard],
    data: {roles: [Role.Coordi, Role.Admin]}
  },
  // Coordi de materia
  {
    path: 'subjectCoordi',
    loadChildren: () => import('./subject-coordi/subject-coordi.module').then(m => m.SubjectCoordiModule),
    ...canActivate(redirectUnauthorizedToLogin),
    canLoad: [RoleGuard],
    data: {roles: [Role.Coordi, Role.SubjectCoordi]}
  },
  // Home
  {path: '', component: LandingComponent},
  // 404
  {path: '**', redirectTo: ''}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
