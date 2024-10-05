// app-routing.module.ts
import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./app.canActivate";
import { RedirectGuard } from "./app.redirectGard";
import { EmptyComponent } from "./empty.component"; // Un composant temporaire

const routes: Routes = [
    {
        path: "",
        //redirectTo: "dashboard",
        component: EmptyComponent,
        pathMatch: "full",
        canActivate: [RedirectGuard],
    },
    {
        path: "login",
        loadChildren: () =>
            import("./login/login.module").then((m) => m.LoginPageModule),
    },
    {
        path: "register",
        loadChildren: () =>
            import("./register/register.module").then(
                (m) => m.RegisterPageModule
            ),
    },
    {
        path: "dashboard",
        loadChildren: () =>
            import("./dashboard/dashboard.module").then(
                (m) => m.DashboardPageModule
            ),
        canActivate: [AuthGuard],
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
