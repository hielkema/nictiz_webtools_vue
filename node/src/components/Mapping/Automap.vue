<template>
    <div v-if="automap.length > 0">
        <v-container 
            v-if="user.groups.includes('mapping | access')"
            tile>
            <v-card>
                <v-toolbar
                color="cyan"
                dark
                :loading="loading"
                dense>
                    <v-toolbar-title>Automaps</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                    <li v-for="(value, key) in automap" :key="key">
                        [{{value.equivalence}}] {{value.concept.system}} - {{value.concept.code}} - {{value.concept.display}}{{value.concept.semantic_tag}}
                    </li>
                </v-card-text>
            </v-card>
        </v-container>
    </div>
</template>
<script>
export default {
    data() {
        return {
        }
    },
    methods: {
        
    },
    computed: {
        automap(){
            return this.$store.state.MappingTasks.automap
        },
        loading(){
            return this.$store.state.MappingTasks.loading.comments
        },
        user(){
            return this.$store.state.userData
        }
    },
    created() {
        this.$store.dispatch('MappingTasks/getAutomap', this.$route.params.taskid)
    }
}
</script>

