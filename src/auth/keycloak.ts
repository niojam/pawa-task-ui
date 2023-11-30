import Keycloak, { KeycloakConfig, KeycloakInitOptions } from 'keycloak-js';

const initOptions: KeycloakInitOptions = {
  onLoad: 'login-required',
  redirectUri: 'http://localhost:5173/',
  enableLogging: true,
};

const keycloakConfig: KeycloakConfig = {
  url: ' http://localhost:8081',
  realm: 'pawa-desk',
  clientId: 'pawa-task',
};

const keycloak: Keycloak = new Keycloak(keycloakConfig);
let authenticated: boolean;
let store = null;

async function init(onInitCallback: () => void) {
  try {
    authenticated = await keycloak.init(initOptions);
    keycloak.onTokenExpired = () => {
      keycloak.updateToken();
    };
    onInitCallback(keycloak);
  } catch (error) {
    console.error('Keycloak init failed');
    console.error(error);
  }
}

async function initStore(storeInstance) {
  try {
    store = storeInstance;
    await store.initAuth(keycloak);

    if (!authenticated) {
      alert('not authenticated');
    }
  } catch (error) {
    console.error('Keycloak init failed');
    console.error(error);
  }
}

function logout() {
  keycloak.logout();
}
async function refreshToken() {
  try {
    if (keycloak.isTokenExpired()) {
      await keycloak.updateToken();
    }
  } catch (error) {
    console.error('Failed to refresh token');
    console.error(error);
  }
}

function getAccessToken(): string {
  return keycloak.token ?? '';
}

export const keycloakService = {
  callInit: init,
  callInitStore: initStore,
  callLogout: logout,
  callTokenRefreshIfNeeded: refreshToken,
  getAccessToken,
};
