import { createApp } from 'vue';
import './style.css';
import pinia from './store';
import router from './router';
import App from './App.vue';

const app = createApp(App);

app.use(router);
app.use(pinia);
app.mount('#app');
