<template>
    <v-container v-if="user.groups.includes('mapping | access')" fluid>
        <v-card>
            <v-toolbar
            color="cyan darken-2"
            dark>
                <v-toolbar-title>
                    <v-btn @click="back()" text>Terug naar projecten</v-btn>
                </v-toolbar-title>
            </v-toolbar>
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
        back () {
            this.$store.commit('MappingTasks/clearTaskMemory')
            this.$router.push({ path: `/mapping/Projects/${this.$route.params.projectid}/` });
        },
    },
    computed: {
        user(){
            return this.$store.state.userData
        }
    },
    mounted() {
    }
}
</script>

