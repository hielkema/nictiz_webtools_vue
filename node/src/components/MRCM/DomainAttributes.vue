<template>
    <v-container fluid>
        <v-card>
            <v-card-text>
                <v-text-field v-model="searchString" label="Domain"></v-text-field><br>
                <v-btn @click="search">Zoek</v-btn>
            </v-card-text>
        </v-card>
        
        <v-card>
            <v-card-text>
                {{results}}
            </v-card-text>
        </v-card>
    </v-container>
</template>
<script>
export default {
    data() {
        return {
            searchString: ''
        }
    },
    methods: {
        search () {
            this.$store.dispatch('Snowstorm/domainAttributes', this.searchString)
        },
    },
    computed: {
        user(){
            return this.$store.state.userData
        },
        results(){
            return this.$store.state.Snowstorm.results.domainAttributes
        }
    },
    mounted() {
    }
}
</script>

