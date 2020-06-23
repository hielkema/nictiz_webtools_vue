<template>
    <div>
        <v-container 
            v-if="user.groups.includes('mapping | access')"
            fluid>
            <v-card
                class="mx-auto"
                :loading="loading"
            >
                <v-toolbar
                    color="cyan darken-2"
                    dark
                    dense>
                    <v-toolbar-title>Mappings [ECL - 1 interface]</v-toolbar-title>
                </v-toolbar>
            </v-card>

            <!-- Tabs -->
            <v-tabs
                v-model="tab"
                background-color="primary"
                dark
                :loading="loading">
                    <v-tab key="query" >
                        Queries
                    </v-tab>
                    <v-tab key="results" >
                        Resultaten
                    </v-tab>
            </v-tabs>

            <v-tabs-items v-model="tab"
                :loading="loading">
                <v-tab-item key="query" >
                    <v-card ma-1>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="loadTargets()">Opnieuw laden</v-btn>
                            <v-btn color="blue darken-1" :disabled="formDisabled" text @click="saveQueries()">Opslaan</v-btn>
                        </v-card-actions>
                    </v-card>

                    <!-- General warning -->
                    <v-alert 
                        dense
                        color="red lighten-2"
                        type="warning"
                        v-if="targets.unfinished">
                        Nog niet alle queries zijn klaar! Het scherm ververst automatisch.
                    </v-alert>

                    <!-- Existing queries -->
                    <template v-for="item in targets.queries">
                        <v-card :key="item.id"
                            class="my-1">
                            <v-card-title v-if="item.id == 'extra'">
                                <span>Nieuwe ECL query</span>
                            </v-card-title>
                            <v-card-text>
                                <v-container dense>
                                    <v-row dense>
                                        <v-col>
                                            <span v-if="item.id != 'extra'">
                                                <!-- Query ID = {{item.id}} -->
                                                <v-alert 
                                                    dense
                                                    color="red lighten-2"
                                                    type="alert"
                                                    v-if="item.failed">
                                                    Query is mislukt: {{item.error}}
                                                </v-alert>
                                                <v-alert 
                                                    dense
                                                    color="red lighten-2"
                                                    type="alert"
                                                    v-if="!item.finished">
                                                    Query loopt nog, of is overleden zonder foutmelding.
                                                </v-alert>
                                                <!-- <v-alert 
                                                    dense
                                                    type="success"
                                                    v-else>
                                                    Query is klaar.
                                                </v-alert> -->
                                            </span>
                                        </v-col>
                                    </v-row>
                                    <v-row dense>
                                        <v-col>
                                            <v-textarea
                                                :disabled="formDisabled"
                                                dense
                                                outlined
                                                name="input-7-1"
                                                label="Beschrijving *"
                                                hint="Beschrijving van de query - zorg dat je duidelijk maakt wat het doel van deze ECL query is."
                                                v-model="item.description" 
                                                rows="2"
                                                auto-grow
                                                ></v-textarea>
                                                
                                        </v-col>
                                    </v-row>
                                    <v-row dense>
                                        <v-col>
                                            <v-textarea
                                                :disabled="formDisabled"
                                                dense
                                                outlined
                                                label="Query *"
                                                hint="ECL query - snomed.org/ecl"
                                                rows="2"
                                                v-model="item.query" 
                                                auto-grow></v-textarea>
                                        </v-col>
                                    </v-row>
                                    <v-row dense>
                                        <v-col cols=4>
                                            <v-select 
                                                :disabled="formDisabled" 
                                                dense
                                                outlined
                                                v-model="item.correlation" 
                                                :items="project.correlation_options" 
                                                label="Correlation *"></v-select>
                                        </v-col>
                                        <v-col cols=4 v-if="item.id != 'extra'">
                                            Aantal concepten in resultaat: {{item.result.numResults}}
                                        </v-col>
                                        <v-col cols=4 v-if="item.id != 'extra'">
                                            <v-checkbox
                                                :disabled="formDisabled"
                                                v-model="item.delete"
                                                label="Verwijderen"
                                                dense   
                                                ></v-checkbox>
                                        </v-col>
                                                <!-- {{item.failed}} {{item.finished}} {{item.error}} -->
                                    </v-row>
                                </v-container>
                            </v-card-text>
                        </v-card>
                    </template>

                    
                    <v-card ma-1>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="loadTargets()">Opnieuw laden</v-btn>
                            <v-btn color="blue darken-1" :disabled="formDisabled" text @click="saveQueries()">Opslaan</v-btn>
                        </v-card-actions>
                    </v-card>
                    <br>
                    <v-card ma-1>
                        <v-card-actions>
                            <v-btn color="blue darken-1" :disabled="formDisabled" text @click="console.log('run')">Mappingsregels aanmaken</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-tab-item>

                <v-tab-item key="results"
                    :loading="loading">
                    <v-card ma-1>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="loadTargets()">Opnieuw laden</v-btn>
                        </v-card-actions>
                        <v-card-text>
                            <v-alert 
                                dense
                                color="red lighten-2"
                                type="warning"
                                v-if="targets.unfinished">
                                Nog niet alle queries zijn klaar!
                            </v-alert>
                            <v-card-title>
                            Resultaten
                            <v-spacer></v-spacer>
                            <v-text-field
                                v-model="searchString"
                                append-icon="mdi-magnify"
                                label="Zoeken (alleen op SCTID / QueryID)"
                            ></v-text-field>
                            </v-card-title>
                            <v-data-table
                                multi-sort
                                :headers="resultsHeaders"
                                :search="searchString"
                                :items="Object.values(targets.allResults)">

                                <template v-slot:item.query="{ item }">
                                    <v-tooltip right>
                                        <template v-slot:activator="{ on }">
                                            <v-btn color="primary" dark v-on="on" icon><v-icon right color="grey">mdi-information-outline</v-icon></v-btn>
                                        </template>
                                        <pre>{{item.description}}</pre>
                                        <hr>
                                        <pre>{{item.query}}</pre>
                                    </v-tooltip>
                                </template>
                                <template v-slot:item.pt="{ item }">
                                    {{item.fsn.term}}
                                </template>
                                <template v-slot:item.correlation="{ item }">
                                    <span v-if="item.correlation == '447559001'" style="color:purple; font-weight:bold; white-space: nowrap;">Broad to narrow</span>
                                    <span v-if="item.correlation == '447557004'" style="color:red; font-weight:bold; white-space: nowrap;">Exact match</span>
                                    <span v-if="item.correlation == '447558009'" style="color:orange; font-weight:bold; white-space: nowrap;">Narrow to broad</span>
                                    <span v-if="item.correlation == '447560006'" style="color:blue; font-weight:bold; white-space: nowrap;">Partial overlap</span>
                                    <span v-if="item.correlation == '447556008'" style="color:black; font-weight:bold; white-space: nowrap;">Not mappable</span>
                                    <span v-if="item.correlation == '447561005'" style="color:black; font-weight:bold; white-space: nowrap;">Not specified</span>
                                </template>
                            </v-data-table>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="loadTargets()">Opnieuw laden</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-tab-item>
            </v-tabs-items>
        </v-container>



    </div>
</template>
<script>
export default {
    data() {
        return {
            search: null,
            searchExtra: null,
            dialogTarget: {},
            targetEditDialog: false,
            targetDialogOldTarget: {},
            targetDialogNewTarget: false,
            resultsHeaders: [
                { text: 'Query', value: 'query', sortable: false },
                { text: 'QueryID', value: 'queryId' },
                { text: 'ID', value: 'id' },
                { text: 'Preferred term', value: 'pt', sortable: false },
                { text: 'Correlation', value: 'correlation' },
            ],
            tab: null,
            searchString: '',
        }
    },
    watch: {
    },
    methods: {
        loadTargets () {
            this.$store.dispatch('MappingTasks/getMappingTargets', this.selectedTask.id)
        },
        saveQueries () {
            this.$store.dispatch('MappingTasks/postMappingTargets',this.targets)
            this.pollTargets()
        },
        pollTargets () {
            setInterval(() => {
                if(this.targets.unfinished == true){
                    this.$store.dispatch('MappingTasks/getMappingTargets', this.selectedTask.id)
                }else{
                    clearInterval()
                }
            }, 1500)
        },
    },
    computed: {
        formDisabled(){
            if((this.user.id == this.selectedTask.user.id) && (this.user.groups.includes('mapping | edit mapping'))){
                return false
            }else{
                return true
            }
        },
        project(){
            return this.$store.state.MappingProjects.selectedProject
        },
        targets(){
            return this.$store.state.MappingTasks.mappingTargets
        },
        selectedTask(){
            return this.$store.state.MappingTasks.selectedTask
        },
        dialogData(){
            return this.$store.state.MappingTasks.dialogData
        },
        searchResults(){
            return this.$store.state.MappingTasks.searchResults
        },
        loading(){
            return this.$store.state.MappingTasks.loading.eclqueries
        },
        user(){
            return this.$store.state.userData
        }
    },
    created() {
    }
}
</script>

<style scoped>
    .list-group div:nth-child(odd) {
        background-color : aliceblue;
    }

    .list-group div:nth-child(even) {
        background-color : cornsilk;
    }
</style>