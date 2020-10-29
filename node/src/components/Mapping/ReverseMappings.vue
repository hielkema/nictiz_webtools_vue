<template>
    <div>
        <v-container
            v-if="user.groups.includes('mapping | access') && (reverse_mappings.length > 0)"
            fluid>
            <v-card v-if="reverse_mappings.length <= 5">
                <v-card-title>
                    Reverse mappings
                </v-card-title>
                <v-card-text>
                    <v-alert 
                        border="left"
                        dense
                        color="green lighten-2"
                        type="info" v-for="(mapping, key) in reverse_mappings" :key="key">
                            {{mapping.codesystem.title}} {{mapping.id}} |{{mapping.title}}|
                            (
                            <span v-if="mapping.correlation == '447559001'">B2N</span>
                            <span v-if="mapping.correlation == '447557004'">EM</span>
                            <span v-if="mapping.correlation == '447558009'">N2B</span>
                            <span v-if="mapping.correlation == '447560006'">PO</span>
                            <span v-if="mapping.correlation == '447556008'">Not mappable</span>
                            <span v-if="mapping.correlation == '447561005'">Not specified</span>
                            )
                            <a v-if="mapping.codesystem.title == 'SNOMED'" :href="'https://terminologie.nictiz.nl/art-decor/snomed-ct?conceptId='+mapping.id" target="_blank">Open in browser</a>
                            <a v-if="mapping.codesystem.title == 'Labcodeset'" :href="'https://labterminologie.nl/art-decor/labconcepts?search='+mapping.id" target="_blank">Open in browser</a>
                    </v-alert>
                </v-card-text>
            </v-card>
            <v-card v-else>
                    <v-expansion-panels>
                        <v-expansion-panel>
                            <v-expansion-panel-header>
                                <v-alert 
                                    border="left"
                                    dense
                                    color="green lighten-2"
                                    type="info">
                                    Er zijn {{reverse_mappings.length}} reverse mappings voor dit component.
                                </v-alert>
                            </v-expansion-panel-header>
                            <v-expansion-panel-content>
                                <v-data-table
                                    :headers="headers"
                                    :items="reverse_mappings"
                                    :items-per-page="5"
                                    class="elevation-1"
                                    dense
                                ></v-data-table>
                            </v-expansion-panel-content>
                        </v-expansion-panel>
                    </v-expansion-panels>
            </v-card>
        </v-container>
    </div>
</template>
<script>
export default {
    data() {
        return {
            headers: [
                {text : 'Codesystem', value: 'codesystem.title'},
                {text : 'ID', value: 'id'},
                {text : 'FSN', value: 'title'},
            ]
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

