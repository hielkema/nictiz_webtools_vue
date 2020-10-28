<template>
    <v-container>
        <v-card>
            <v-card-title>
                Framework (postcoframe)
            </v-card-title>
            <v-card-text>
                <v-text-field v-model="searchString" label="Domain"></v-text-field><br>
                <v-btn @click="addNew(searchString)">Push</v-btn>
            </v-card-text>
        </v-card>

        <v-card>
            <v-card-text>
                <li v-for="(attribute, key) in attributes" :key="key">
                    {{attribute}}
                </li>
            </v-card-text>
        </v-card>
    </v-container>
</template>
<script>
export default {
    data() {
        return {
            searchString: '',
            attributes: [],
        }
    },
    methods: {
        addNew (string) {
            this.attributes.push(string)
            this.searchString = ''
            // this.$store.dispatch('Snowstorm/domainAttributes', this.searchString)
        },
    },
    computed: {
        user(){
            return this.$store.state.userData
        },
        hover() {
            return this.$store.state.Snowstorm.results.lookupFsn.fsn.term
        }
    },
    mounted() {
    }
}
</script>

