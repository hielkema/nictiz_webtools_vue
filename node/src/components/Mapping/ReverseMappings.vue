<template>
    <div>
        <v-container
            v-if="user.groups.includes('mapping | access') && (reverse_mappings.length > 0)"
            fluid>
            <v-card>
                <v-card-title>
                    Reverse mappings
                </v-card-title>
                <v-card-text>
                    <v-alert 
                        border="left"
                        dense
                        color="green lighten-2"
                        type="info" v-for="(mapping, key) in reverse_mappings" :key="key">
                            {{mapping.codesystem.title}} #{{mapping.id}} - {{mapping.title}}
                            <a v-if="mapping.codesystem.title == 'SNOMED'" :href="'https://terminologie.nictiz.nl/art-decor/snomed-ct?conceptId='+mapping.id" target="_blank">Open in browser</a>
                            <a v-if="mapping.codesystem.title == 'Labcodeset'" :href="'https://labterminologie.nl/art-decor/labconcepts?search='+mapping.id" target="_blank">Open in browser</a>
                    </v-alert>
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
        selectedTask(){
            return this.$store.state.MappingTasks.selectedTask
        },
        reverse_mappings(){
            return this.$store.state.MappingTasks.reverse
        },
        loading(){
            return this.$store.state.MappingAudits.loading
        },
        user(){
            return this.$store.state.userData
        }
    },
    mounted() {
        this.$store.dispatch('MappingAudits/getReverse',this.selectedTask.id)
    }
}
</script>

