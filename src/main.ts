import { createApp } from 'vue'
import './styles/style.scss'
import App from './App.vue'
import {keycloakService} from './auth/keycloak.ts'
import {createPinia} from "pinia";
import {useAuthStore} from "./store/authStore.ts";

const pinia = createPinia();
const app = createApp(App);
// app.use(router).use(i18n);
app.use(pinia);

const authStore = useAuthStore();

await keycloakService.callInit(() =>{keycloakService.callInitStore(authStore)});

app.mount('#app');
