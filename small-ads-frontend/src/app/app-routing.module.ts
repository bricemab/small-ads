import {Injectable, NgModule} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Resolve, Router,
  RouterModule,
  RouterStateSnapshot,
  Routes,
  UrlTree
} from '@angular/router';
import { HomeComponent } from './modules/layouts/home/home.component';
import { PageNotFoundComponent } from './modules/layouts/page-not-found/page-not-found.component';
import { TaskDetailComponent } from './modules/components/task-detail/task-detail.component';
import {Observable} from "rxjs";
import {Permissions} from "./permissions";
import {LocalStorageService} from "./services/LocalStorage/local-storage.service";
import AclManager from "./AclManager";

@Injectable()
class IsAccessGuard implements CanActivate {
  constructor(private localStore: LocalStorageService, private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // console.log(route);
    // console.log(state);
    // console.log('master class ', this.localStore.getData('id'));
    const data = AclManager.hasUserAccessToPermission(route.data["permissions"], this.localStore);
    if (!data.isAllowed) {
      this.router.navigateByUrl(data.redirectionRoute!);
      return false;
    }
    return true;
  }
}


const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [IsAccessGuard], data: {"permissions":Permissions.specialState.userLoggedIn} },
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
  { path: 'detail/:id', component: TaskDetailComponent, canActivate: [IsAccessGuard], data: {"permissions":Permissions.tasksManager.viewList}},
  { path: '**', component: PageNotFoundComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [IsAccessGuard],
  exports: [RouterModule]
})
export class AppRoutingModule { }
