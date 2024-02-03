import { Routes } from '@angular/router';
import { AuthGuard } from './shared/guards/auth.guard';
import { LoginComponent } from './components/pages/account/login/login.component';
import { SignupComponent } from './components/pages/account/signup/signup.component';
import { AccountComponent } from './components/pages/account/account.component';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { NewTeamComponent } from './components/pages/team/new-team.component';
import { EditTeamComponent } from './components/pages/team/edit-team.component';
import { TeamComponent } from './components/pages/team/team.component';
import { ShareTeamComponent } from './components/pages/team/share-team.component';
import { AdminLoginComponent } from './components/pages/admin/admin-login/admin-login.component';
import { AdminGuard } from './shared/guards/admin.guard';
import { AdminDashboardComponent } from './components/pages/admin/admin-dashboard/admin-dashboard.component';

export const routes: Routes = [
    {
        path:"",
        component: DashboardComponent,
        canActivate: [AuthGuard]
    },
    {
        path:"dashboard",
        component: DashboardComponent,
        canActivate: [AuthGuard]
    },
    {
        path:"login",
        component: LoginComponent
    },
    {
        path:"signup",
        component: SignupComponent
    },
    {
        path:"account",
        component: AccountComponent,
        canActivate: [AuthGuard]
    },
    {
        path:"new-team/:id",
        component: NewTeamComponent,
        canActivate: [AuthGuard]
    }, 
    {
        path:"team/:id",
        component: TeamComponent,
        canActivate: [AuthGuard]
    },
    {
        path:"edit-team/:id",
        component: EditTeamComponent,
    },
    {
        path:"share-team/:id",
        component: ShareTeamComponent,
    },
    {
        path:"admin",
        component: AdminLoginComponent
    },
    {
        path:"admin-dashboard",
        component: AdminDashboardComponent,
        canActivate: [AdminGuard]
    }
    
];
