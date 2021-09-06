import { createApp, defineCustomElement } from 'vue'
import App from './App.vue'
import Surface from './surface/Surface.ce.vue'

createApp(App).mount('#app')

customElements.define('super-surface', defineCustomElement(Surface));