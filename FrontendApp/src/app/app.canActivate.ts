import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { LocalStorageService } from "../app/services/localStorage/localStorage.service";

@Injectable({
    providedIn: "root",
})
export class AuthGuard implements CanActivate {
    constructor(
        private localStorage: LocalStorageService,
        private router: Router
    ) {}

    canActivate(): boolean {
        if (this.localStorage.getItem("token")) {
            return true;
        } else {
            this.router.navigate(["/login"]);
            return false;
        }
    }
}
