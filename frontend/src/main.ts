import { createApp } from 'vue'
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import mask from './directives/mask/index.ts';
import App from './App.vue';

import router from './routes';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import * as solidIcons from '@fortawesome/free-solid-svg-icons'
import './style.css'

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate)

const app = createApp(App);

const iconList = Object.keys(solidIcons)
  .filter((key) => key !== 'fas' && key !== 'prefix')
  .map((key) => solidIcons[key]);

library.add(...iconList);

app.component('font-awesome-icon', FontAwesomeIcon);
app.directive('mask', mask);
app.use(pinia);
app.use(router);
app.mount('#app');
