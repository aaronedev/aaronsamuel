import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser, faCode, faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faUser, faCode, faLock);

createApp(App)
  .component('font-awesome-icon', FontAwesomeIcon)
  .mount('#app');
