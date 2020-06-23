import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
    breakpoint: {
        thresholds: {
          xs: 340,
          sm: 500,
          md: 510,
          lg: 1980,
        },
    },
});
