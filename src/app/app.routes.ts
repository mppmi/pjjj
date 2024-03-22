import { Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { AddComponent } from './pages/add/add.component';
import { VoteComponent } from './pages/vote/vote.component';
import { LoginComponent } from './pages/login/login.component';
import { MyrankComponent } from './pages/myrank/myrank.component';
import { OweComponent } from './pages/owe/owe.component';
import { OwerankComponent } from './pages/owerank/owerank.component';
import { ToptenComponent } from './pages/topten/topten.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { GraphComponent } from './pages/graph/graph.component';

export const routes: Routes = [
    {path: 'main', component : MainComponent},
    {path: '', component: VoteComponent},
    {path: 'login', component : LoginComponent},
    {path: 'profile', component : ProfileComponent},
    {path: 'rank', component : MyrankComponent},
    {path: 'topten', component : ToptenComponent},
    {path: 'add', component : AddComponent},  
    {path: 'owe', component : OweComponent},
    {path: 'owerank', component : OwerankComponent},
    {path: 'graph', component : GraphComponent}
    // ng g c pages/graph --skip-tests
]