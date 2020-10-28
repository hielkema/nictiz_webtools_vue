<template>
    <v-container>
        <v-card>
            <v-card-title>
                SelectedConcept (Root.vue)
            </v-card-title>
            <v-card-text>
                {{root.id}} - 
                {{root.fsn.term}}
            </v-card-text>
        </v-card>
    </v-container>
</template>
<script>
export default {
    data() {
        return {
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
        root(){
            return this.$store.state.MRCM.results.lookupConcept
        },
    },
    mounted() {
    }
}
</script>

