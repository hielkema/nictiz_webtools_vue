<template>
    <div>
        <v-container v-if="user.groups.includes('mapping | access')">
            <v-row>
                <v-col cols=6>
                    <v-card class="pa-1">
                        <v-card-title>
                            Zoeken
                        </v-card-title>   
                        <v-card-text>
                            <v-autocomplete
                                v-model="component"
                                :loading="loading.search"
                                :items="searchResults"
                                :search-input.sync="search"
                                :return-object="true"
                                label="Naam of code van component"
                                ></v-autocomplete>
                        
                            <span v-if="component.component">{{component.codesystem.title}} {{component.value}} {{component.component.title}}</span>

                        </v-card-text>

                        <v-card-actions>
                            <v-btn color="blue darken-1" text @click="searchByComponent(component.component.id)">Zoek</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>

            <v-row>
                <v-col cols=12>
                    <v-card>
                        <v-card-title>
                            Taken
                        </v-card-title>
                        <v-card-text>
                            <v-data-table
                                :headers="headers"
                                :items="searchResultsTasks"
                                :items-per-page="10"
                                :search="search"
                                :loading="loading"
                                item-key="id"
                                class="elevation-2"
                                multi-sort
                                dense
                            >
                            <template v-slot:item.task_id="{ item }">
                                <v-btn @click="openTaskEditor(item.project_id, item.task_id)" text>Open</v-btn>
                            </template>
                            </v-data-table>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>

        </v-container>
    </div>
</template>
<script>
export default {
    data() {
        return {
            headers: [
                { text: 'Task ID', value: 'task_id' },
                { text: 'Project', value: 'project' },
                { text: 'Source ID', value: 'source_id' },
                { text: 'Source Titel', value: 'source_title' },
                { text: 'Target ID', value: 'target_id' },
                { text: 'Target Titel', value: 'target_title' },
                { text: 'Gebruikersnaam', value: 'username', align: ' d-none' },
            ],
            search: null,
            component: {},
        }
    },
    watch: {
        search (val) {
            (val.length > 2) && this.$store.dispatch('MappingTasks/TargetSearch', val)
        },
    },
    methods: {
        searchByComponent (componentid) {
            this.$store.dispatch('MappingTasks/searchByComponent', componentid)
        },
        openTaskEditor(projectid, taskid){
            this.$router.push({ path: `/mapping/Projects/${projectid}/task/${taskid}` });
        }   
    },
    computed: {
        searchResults(){
            return this.$store.state.MappingTasks.searchResults
        },
        searchResultsTasks(){
            return this.$store.state.MappingTasks.searchByComponentResults
        },
        loading(){
            return this.$store.state.MappingTasks.loading
        },
        user(){
            return this.$store.state.userData
        }
    },
    mounted(){
        // this.$store.dispatch('TaskManager/getTasks')
    }
}
</script>

