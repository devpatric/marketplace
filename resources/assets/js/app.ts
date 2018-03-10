///<reference path="./lib/types/index.d.ts" />

import './lib/polyfill';
import 'babel-polyfill';

import Vue, {VNodeDirective} from 'vue';
import Vuelidate from 'vuelidate';
import IconComponent from 'vue-awesome/components/Icon.vue';
import * as ElementQueries from 'css-element-queries/src/ElementQueries';

import store, {State} from 'JS/store';
import router from 'JS/router';
import AppComponent from './components/app.vue';
import LazyImgComponent from './components/widgets/image/lazy-img.vue';
import {Store} from "vuex";

declare global {
    interface Window {
        data: string
    }
}

// setup

Vue.use(Vuelidate);
ElementQueries.listen();

// Global Vue components and directives

Vue.component('icon', IconComponent);
Vue.component('lazy-img', LazyImgComponent);

Vue.directive('focus', {
    bind(el: HTMLElement, binding: VNodeDirective) {
        if (binding.value)
            el.focus();
    },
    inserted(el: HTMLElement, binding: VNodeDirective) {
        if (binding.value)
            el.focus();
    },
    update(el: HTMLElement, binding: VNodeDirective) {
        if (binding.value)
            el.focus();
    }
});

// Vue app

export const app = new Vue({
    el: '#app',
    store: <Store<any>> store,
    router,
    components: {
        app: AppComponent,
    }
});