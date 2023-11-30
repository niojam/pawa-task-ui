import { defineStore } from 'pinia';

import { AuthState } from './types.ts';
import { keycloakService } from '../auth/keycloak.ts';

export const useAuthStore = defineStore({
  id: 'auth-store',
  state: (): AuthState => ({
    userInfo: {},
    authenticated: false,
  }),
  actions: {
    async initAuth(keycloak, clearData = true) {
      if (clearData) {
        await this.clearUserData();
      }
      this.authenticated = keycloak.authenticated;
      this.userInfo.username = keycloak.idTokenParsed.preferred_username;
      this.userInfo.firstName = keycloak.idTokenParsed.given_name;
      this.userInfo.lastName = keycloak.idTokenParsed.family_name;
      this.userInfo.id = keycloak.idTokenParsed.sub;
      this.userInfo.email = keycloak.idTokenParsed.email;
    },
    async logout() {
      try {
        await keycloakService.callLogout();
        await this.clearUserData();
      } catch (error) {
        console.error(error);
      }
    },
    async refreshUserToken() {
      try {
        const keycloak = await keycloakService.callTokenRefreshIfNeeded();
        await this.initOauth(keycloak, false);
      } catch (error) {
        console.error(error);
      }
    },
    clearUserData() {
      this.authenticated = false;
      this.userInfo = {};
    },
  },
});
