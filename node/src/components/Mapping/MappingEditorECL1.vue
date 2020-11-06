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
            <v-card
                class="mx-auto"
                :loading="loading"
            >
                <v-tabs
                    v-model="tab"
                    fixed-tabs  
                    :loading="loading">
                        <v-tab key="query" >
                            Queries
                        </v-tab>
                        <v-tab key="exclusions" >
                            Exclusies
                        </v-tab>
                        <v-tab key="preview" >
                            ECL resultaten
                        </v-tab>
                        <v-tab key="rules" >
                            Regels
                        </v-tab>
                </v-tabs>
            </v-card>

            <v-card
                class="mx-auto"
                :loading="loading"
            >
                <v-tabs-items v-model="tab"
                    :loading="loading">
                    
                    <!-- Tab queries -->
                    <v-tab-item key="query" >
                        <v-card ma-1>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue darken-1" text @click="loadTargets()">Opnieuw laden</v-btn>
                                <v-btn color="blue darken-1" :disabled="formDisabled()" text @click="saveQueries()">Opslaan</v-btn>
                            </v-card-actions>
                        </v-card>

                        <!-- General warning -->
                        <v-alert 
                            dense
                            color="red lighten-2"
                            type="warning"
                            v-if="targets.queries_unfinished">
                            Nog niet alle queries zijn klaar! Het scherm ververst automatisch.
                        </v-alert>

                        <!-- Warning against duplicates in ECL results -->
                        <v-alert 
                            dense
                            color="red lighten-2"
                            type="warning"
                            v-if="listDuplicatesInEcl">
                            Er zijn concepten die in de resultaten van meerdere ECL queries voorkomen. Deze fout moet gecorrigeerd worden.
                            <br>
                            <span v-for="(value, key) in duplicatesInEcl" :key="key">
                                <li v-if="value.duplicate">
                                    {{value.id}}
                                    {{value.pt.term}}
                                </li>
                            </span>
                        </v-alert>

                        <!-- Existing queries -->
                        <template v-for="item in targets.queries">
                            <div v-if="(item.id == 'extra') && (formDisabled())" :key="item.id">
                                
                            </div>
                            <div v-else :key="item.id">
                                <v-card :key="item.id" class="my-1">
                                    <v-card-title v-if="(item.id == 'extra')">
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
                                                <v-col v-if="!formDisabled()">
                                                    <v-textarea
                                                        :disabled="formDisabled()"
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
                                                <v-col v-else>
                                                    <strong>Beschrijving van de query - zorg dat je duidelijk maakt wat het doel van deze ECL query is.</strong><br>
                                                    {{item.description}}
                                                </v-col>
                                            </v-row>
                                            <v-row dense>
                                                <v-col v-if="!formDisabled()">
                                                    <v-textarea
                                                        :disabled="formDisabled()"
                                                        dense
                                                        outlined
                                                        label="Query *"
                                                        hint="ECL query - snomed.org/ecl"
                                                        rows="2"
                                                        v-model="item.query" 
                                                        auto-grow></v-textarea>
                                                </v-col>
                                                <v-col v-else>
                                                    <strong>ECL query</strong><br>
                                                    <div style="width:100%; overflow-x:auto;">
                                                        <pre>{{item.query}}</pre>
                                                    </div>
                                                    <br>
                                                </v-col>
                                            </v-row>
                                            <v-row dense>
                                                <v-col cols=4>
                                                    <v-select 
                                                        :disabled="formDisabled()" 
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
                                                        v-if="!formDisabled()"
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
                            </div>
                        </template>

                        
                        <v-card ma-1>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue darken-1" text @click="loadTargets()">Opnieuw laden</v-btn>
                                <v-btn color="blue darken-1" :disabled="formDisabled()" text @click="saveQueries()">Opslaan</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-tab-item>

                    <!-- Tab queries -->
                    <!-- General warning -->
                    <v-alert 
                        dense
                        color="red lighten-2"
                        type="warning"
                        v-if="targets.queries_unfinished">
                        Nog niet alle requests zijn klaar! Het scherm ververst automatisch.
                    </v-alert>

                    <v-tab-item key="exclusions" >
                        <v-card ma-1>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue darken-1" text @click="loadTargets()">Opnieuw laden</v-btn>
                                <v-btn color="blue darken-1" :disabled="formDisabled()" text @click="saveQueries()">Opslaan</v-btn>
                            </v-card-actions>
                        </v-card>

                        <!-- Reverse exclusions -->
                        <v-card
                            v-if="reverseExclusions.length > 0"
                            class="my-1 warning lighten-3">
                            <v-card-title>
                                <span>Het huidige component wordt geëxcludeerd bij de volgende taken:</span>
                            </v-card-title>
                            <v-card-text>
                                <li v-for="(value, key) in reverseExclusions" :key="key">
                                    Taak: {{value.task}} / Component: {{value.component_id}} {{value.component_title}}
                                </li>
                            </v-card-text>
                        </v-card>

                        <!-- Exclusion form -->
                        <v-card
                            class="my-1">
                            <v-card-title>
                                <span>Excludeer resultaat van ander component</span>
                            </v-card-title>
                            <v-card-text>
                                
                                <v-textarea
                                    :disabled="formDisabled()"
                                    dense
                                    outlined
                                    label="Exclusies"
                                    hint="1 component ID per regel"
                                    rows="3"
                                    v-model="selectedTask.exclusions.string" 
                                    auto-grow></v-textarea>
                                    <strong>Herkende codes:</strong><br>
                                    <pre>{{selectedTask.exclusions.recognized}}</pre>
                                    <br>
                                    Op basis van dit veld zijn <strong>{{targets.excluded.length}}</strong> concepten geëxcludeerd.

                                    <v-data-table
                                        multi-sort
                                        :headers="excludedHeaders"
                                        :items-per-page="10"
                                        :items="targets.excluded">
                                        <template v-slot:top="{ pagination, options, updateOptions }">
                                            <v-data-footer 
                                            :pagination="pagination" 
                                            :options="options"
                                            @update:options="updateOptions"
                                            items-per-page-text="$vuetify.dataTable.itemsPerPageText"/>
                                        </template>
                                    </v-data-table>

                            </v-card-text>
                        </v-card>

                        
                        <v-card ma-1>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue darken-1" text @click="loadTargets()">Opnieuw laden</v-btn>
                                <v-btn color="blue darken-1" :disabled="formDisabled()" text @click="saveQueries()">Opslaan</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-tab-item>

                    <!-- Tab results -->
                    <v-tab-item key="preview"
                        :loading="loading">
                        <v-card ma-1>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue darken-1" text @click="loadTargets()">Opnieuw laden</v-btn>
                            </v-card-actions>
                            <!-- Warning against duplicates in ECL results -->
                            <v-alert 
                                dense
                                color="red lighten-2"
                                type="warning"
                                v-if="listDuplicatesInEcl">
                                Er zijn concepten die in de resultaten van meerdere ECL queries voorkomen. Deze fout moet gecorrigeerd worden.
                                <br>
                                <span v-for="(value, key) in duplicatesInEcl" :key="key">
                                    <li v-if="value.duplicate">
                                        {{value.id}}
                                        {{value.pt.term}}
                                    </li>
                                </span>
                            </v-alert>
                            <v-card-text>
                                <v-alert 
                                    dense
                                    color="red lighten-2"
                                    type="warning"
                                    v-if="targets.queries_unfinished">
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
                                    :footer-props="pagination" 
                                    :items-per-page="50"
                                    :search="searchString"
                                    :items="Object.values(targets.allResults)">

                                    <template v-slot:top="{ pagination, options, updateOptions }">
                                        <v-data-footer 
                                        :pagination="pagination" 
                                        :options="options"
                                        @update:options="updateOptions"
                                        items-per-page-text="$vuetify.dataTable.itemsPerPageText"/>
                                    </template>

                                    <template v-slot:item.query="{ item }">
                                        <v-tooltip right>
                                            <template v-slot:activator="{ on }">
                                                <v-btn color="primary" dark v-on="on" icon><v-icon right color="grey">mdi-information-outline</v-icon></v-btn>
                                            </template>
                                            <pre>{{item.queryId}} - {{item.description}}</pre>
                                            <hr>
                                            <pre>{{item.query}}</pre>
                                        </v-tooltip>
                                    </template>
                                    <template v-slot:item.id="{ item }">
                                        <a :href="'https://terminologie.nictiz.nl/art-decor/snomed-ct?conceptId='+item.id" target="_blank">{{item.id}}</a>
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

                    <!-- Tab mappingrules -->
                    <v-tab-item key="rules">
                        <v-card ma-1>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue darken-1" text @click="loadTargets()">Opnieuw laden</v-btn>
                                <v-btn 
                                    color="blue darken-1" 
                                    :disabled="formDisabled()" 
                                    v-if="!targets.mappings_unfinished"
                                    text 
                                    @click="createMappingRules()">Mappingsregels aanmaken</v-btn>
                                <v-btn 
                                    v-if="!targets.mappings_unfinished"
                                    :disabled="formDisabled()" 
                                    color="red darken-1" 
                                    text 
                                    @click="removeMappingRules()">Verwijder regels</v-btn>
                            </v-card-actions>
                        
                            <v-card-title>
                                Regels
                                <v-spacer></v-spacer>
                                <v-text-field
                                    v-model="searchString"
                                    append-icon="mdi-magnify"
                                    label="Zoeken"
                                ></v-text-field>
                            </v-card-title>
                            <!-- General warning -->
                            <v-alert 
                                dense
                                color="red lighten-2"
                                type="warning"
                                v-if="targets.mappings_unfinished">
                                Nog niet alle queries zijn klaar! Het scherm ververst automatisch.
                            </v-alert>
                            <!-- Warning against duplicates in ECL results -->
                            <v-alert 
                                dense
                                color="red lighten-2"
                                type="warning"
                                v-if="listDuplicatesInEcl">
                                Er zijn concepten die in de resultaten van meerdere ECL queries voorkomen. Deze fout moet gecorrigeerd worden.
                                <br>
                                <h4>Let op: Bij dubbele regels wordt alleen degene in de laatst verwerkte query naar een regel geëxporteerd.</h4>
                                <span v-for="(value, key) in duplicatesInEcl" :key="key">
                                    <li v-if="value.duplicate">
                                        {{value.id}}
                                        {{value.pt.term}}
                                    </li>
                                </span>
                            </v-alert>
                            
                            <v-data-table
                                multi-sort
                                :headers="mappingHeaders"
                                :footer-props="pagination" 
                                :search="searchString"
                                :items-per-page="50"
                                :items="targets.mappings">
                                <template v-slot:top="{ pagination, options, updateOptions }">
                                    <v-data-footer 
                                    :pagination="pagination" 
                                    :options="options"
                                    @update:options="updateOptions"
                                    items-per-page-text="$vuetify.dataTable.itemsPerPageText"/>
                                </template>
                                <template v-slot:item.source.component_id="{ item }">
                                    <a :href="'https://terminologie.nictiz.nl/art-decor/snomed-ct?conceptId='+item.source.component_id" target="_blank">{{item.source.component_id}}</a>
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
                        </v-card>
                    </v-tab-item>
                </v-tabs-items>
            </v-card>
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
                // { text: 'QueryID', value: 'queryId' },
                { text: 'ID', value: 'id' },
                { text: 'Preferred term', value: 'pt', sortable: false },
                { text: 'Correlation', value: 'correlation' },
            ],
            mappingHeaders: [
                { text: 'ID', value: 'source.component_id', sortable: true },
                { text: 'Component', value: 'source.component_title', sortable: true },
                { text: 'Correlatie', value: 'correlation', sortable: true },
            ],
            excludedHeaders: [
                { text: 'ID', value: 'id', sortable: true },
                { text: 'FSN', value: 'fsn.term', sortable: true },
            ],
            tab: null,
            searchString: '',
            pagination: {
                "items-per-page-options": [25,50,100,250,500,1000,3000]
            },
            interval : null,
        }
    },
    watch: {
    },
    methods: {
        loadTargets () {
            this.$store.dispatch('MappingTasks/getTaskDetails',this.selectedTask.id)
            this.$store.dispatch('MappingTasks/getMappingTargets', this.selectedTask.id)
            this.$store.dispatch('MappingTasks/getReverseExclusions', this.selectedTask.component.id)
        },
        saveQueries () {
            var payload = this.targets
            delete payload.allResults
            delete payload.mappings
            payload.queries.forEach(function(query){ delete query.result });

            // First, save exclusions
            this.$store.dispatch('MappingTasks/postMappingExclusions',this.selectedTask).then(
                this.$store.dispatch('MappingTasks/postMappingTargets',this.targets)
            )
            this.pollTargets()
        },
        pollTargets () {
            this.interval = setInterval(() => {
                if(this.targets.queries_unfinished == true){
                    this.$store.dispatch('MappingTasks/getTaskDetails',this.selectedTask.id)
                    this.$store.dispatch('MappingTasks/getMappingTargets', this.selectedTask.id)
                    // this.$store.dispatch('MappingTasks/getReverseExclusions', this.selectedTask.id)
                }else{
                    this.$store.dispatch('MappingTasks/getTaskDetails',this.selectedTask.id)
                    this.$store.dispatch('MappingTasks/getMappingTargets', this.selectedTask.id)
                    this.$store.dispatch('MappingTasks/getReverseExclusions', this.selectedTask.id)
                    clearInterval(this.interval)
                }
            }, 2000)
        },
        pollRules () {
            this.interval = setInterval(() => {
                if(this.targets.mappings_unfinished == true){
                    this.$store.dispatch('MappingTasks/getTaskDetails',this.selectedTask.id)
                    this.$store.dispatch('MappingTasks/getMappingTargets', this.selectedTask.id)
                }else{
                    this.$store.dispatch('MappingTasks/getTaskDetails',this.selectedTask.id)
                    this.$store.dispatch('MappingTasks/getMappingTargets', this.selectedTask.id)
                    clearInterval(this.interval)
                }
            }, 2000)
        },
        createMappingRules() {
            this.$store.dispatch('MappingTasks/mappingsEclToRules',this.selectedTask.id)
            this.pollRules()
        },
        removeMappingRules() {
            this.$store.dispatch('MappingTasks/removeMappingRules',this.selectedTask.id)
            this.pollRules()
        },
        find_duplicate_components(propertyName, inputArray) {
            // var seenDuplicate = false
            var testObject = {}

            inputArray.map(function(item) {
                var itemPropertyName = item[propertyName];
                if (itemPropertyName in testObject) {
                    testObject[itemPropertyName].duplicate = true;
                    item.duplicate = true;
                    // seenDuplicate = true;
                }
                else {
                    testObject[itemPropertyName] = item;
                    delete item.duplicate;
                }
            });

            return testObject;
            // return seenDuplicate;
        },
        list_duplicate_components(propertyName, inputArray) {
            var seenDuplicate = false
            var testObject = {}

            inputArray.map(function(item) {
                var itemPropertyName = item[propertyName];
                if (itemPropertyName in testObject) {
                    testObject[itemPropertyName].duplicate = true;
                    item.duplicate = true;
                    seenDuplicate = true;
                }
                else {
                    testObject[itemPropertyName] = item;
                    delete item.duplicate;
                }
            });

            // return testObject;
            return seenDuplicate;
        },
        formDisabled(){
            if((this.user.id == this.selectedTask.user.id) && (this.user.groups.includes('mapping | edit mapping'))){
                return false
            }else{
                return true
            }
        },

    },
    computed: {
        duplicatesInEcl(){
            return this.find_duplicate_components("id", Object.values(this.targets.allResults))
        },
        listDuplicatesInEcl(){
            return this.list_duplicate_components("id", Object.values(this.targets.allResults))
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
        reverseExclusions(){
            return this.$store.state.MappingTasks.reverseExclusions
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
        },
    },
    mounted() {
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