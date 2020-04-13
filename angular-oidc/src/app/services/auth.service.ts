import { Injectable } from "@angular/core";
import {
  UserManager,
  UserManagerSettings,
  User,
  WebStorageStateStore,
} from "oidc-client";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private manager = new UserManager(this.getClientSettings());
  private user: User = null;

  constructor() {
    this.manager.getUser().then((user) => {
      this.user = user;
    });
  }

  isLoggedIn(): boolean {
    return this.user != null && !this.user.expired;
  }

  getClaims(): any {
    return this.user.profile;
  }

  getAuthorizationHeaderValue(): string {
    return `${this.user.token_type} ${this.user.access_token}`;
  }

  startAuthentication(): Promise<void> {
    return this.manager.signinRedirect();
  }

  completeAuthentication(): Promise<void> {
    return this.manager.signinRedirectCallback().then((user) => {
      this.user = user;
    });
  }

  getClientSettings(): UserManagerSettings {
    return {
      authority: "http://localhost:5000/",
      client_id: "spa",
      redirect_uri: "http://localhost:4200/auth-callback",
      post_logout_redirect_uri: "http://localhost:4200/",
      response_type: "code",
      scope: "openid profile api1",
      filterProtocolClaims: true,
      loadUserInfo: true,
      userStore: new WebStorageStateStore({ store: window.localStorage }),
      automaticSilentRenew: true,
      silent_redirect_uri: "http://localhost:4200/silent-refresh.html",
    };
  }
}
