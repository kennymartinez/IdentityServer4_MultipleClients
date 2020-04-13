import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ProtectedComponent } from "./protected/protected.component";
import { AuthGuard } from "./services/auth.guard";
import { AuthCallbackComponent } from "./auth-callback/auth-callback.component";
import { CallApiComponent } from "./call-api/call-api.component";

const routes: Routes = [
  {
    path: "",
    children: [],
  },
  {
    path: "protected",
    component: ProtectedComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "auth-callback",
    component: AuthCallbackComponent,
  },
  {
    path: "call-api",
    component: CallApiComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
