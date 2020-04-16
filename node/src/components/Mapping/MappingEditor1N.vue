<template>
    <div>
        <v-container 
            v-if="user.groups.includes('mapping | access')"
            fluid>
                        <form>
                            <v-card>
                                <v-btn class="green" dark @click="submit">Alle wijzigingen opslaan</v-btn>
                            </v-card>
                            
                            <template v-for="item in targets">
                                <v-card :key="item.id"
                                    class="my-1">
                                    <v-toolbar
                                        color="cyan"
                                        dark
                                        dense>
                                        <v-toolbar-title>{{item.target.component_title}}</v-toolbar-title>
                                    </v-toolbar>
                                    <v-list three-line>
                                        <v-list-item
                                            :key="item.id"
                                            dense
                                            :loading="loading.targets">
                                            <v-list-item-content v-if="(item.id == 'extra') && (formDisabled == false)">
                                                    <v-btn color="grey lighten-2" small v-on:click="openDialog(item.id)">Nieuwe mapping toevoegen</v-btn>
                                            </v-list-item-content>

                                            <span v-else-if="(item.id == 'extra' && formDisabled == true)"></span>

                                            <v-list-item-content v-else>
                                                <v-list-item-subtitle>{{item.target.codesystem.title}} Code {{item.target.component_id}}</v-list-item-subtitle>
                                                    <v-container>
                                                        
                                                        <v-row  no-gutters align="center">
                                                            <v-col cols="6">
                                                                <v-btn color="grey lighten-2" small v-on:click="openDialog(item.id)">Details / doel aanpassen</v-btn>
                                                            </v-col>
                                                            <v-col cols="6">
                                                                <v-checkbox
                                                                    :disabled="formDisabled"
                                                                    v-model="item.delete"
                                                                    label="Verwijderen"
                                                                    dense
                                                                    ></v-checkbox>
                                                            </v-col>
                                                            <v-divider></v-divider>
                                                        </v-row>
                                                        <v-row no-gutters>
                                                            <v-col cols="4" v-if="project.group">
                                                                <v-text-field
                                                                    :disabled="formDisabled"
                                                                    v-model="item.group"
                                                                    label="Group"
                                                                    required
                                                                    ></v-text-field>
                                                            </v-col>
                                                            <v-col cols="4" v-if="project.priority">
                                                                <v-text-field
                                                                    :disabled="formDisabled"
                                                                    v-model="item.priority"
                                                                    label="Priority"
                                                                    required
                                                                    ></v-text-field>
                                                            </v-col>
                                                            <v-col cols="4" v-if="project.correlation">
                                                                <v-select :disabled="formDisabled" v-model="item.correlation" :items="project.correlation_options" label="Correlation"></v-select>
                                                            </v-col>
                                                        </v-row>
                                                        <v-row  no-gutters>
                                                            <v-col cols="12">
                                                                <v-text-field
                                                                    :disabled="formDisabled"
                                                                    v-if="project.rule"
                                                                    v-model="item.rule"
                                                                    label="Rule"
                                                                    required
                                                                    ></v-text-field>
                                                            </v-col>
                                                        </v-row>
                                                        <v-row  no-gutters>
                                                            <v-col cols="12">
                                                                <v-text-field
                                                                    :disabled="formDisabled"
                                                                    v-if="project.advice"
                                                                    v-model="item.advice"
                                                                    label="Advice"
                                                                    required
                                                                    ></v-text-field>
                                                            </v-col>
                                                        </v-row>
                                                        <v-row  no-gutters v-if="project.rulebinding">
                                                            <v-col cols="12">
                                                                <v-list-item-title>Bindings:</v-list-item-title>
                                                                <v-checkbox
                                                                    :disabled="formDisabled"
                                                                    v-for="dependency in item.dependency"  
                                                                    :key="dependency.id"
                                                                    v-model="dependency.binding"
                                                                    :label="dependency.source"
                                                                    ></v-checkbox>
                                                            </v-col>
                                                        </v-row>
                                                    </v-container>
                                            </v-list-item-content>
                                        </v-list-item>
                                    </v-list>
                                </v-card>
                            </template>
                            <v-card 
                                class="my-1">
                                <v-btn full-width class="green" dark @click="submit">Alle wijzigingen opslaan</v-btn>
                            </v-card>
                        </form>

        </v-container>

        <!-- Modal for editing target -->
        <v-dialog v-model="targetEditDialog" persistent max-width="1000px">
            <v-card
                :loading="loading.targets">
                <v-card-title>
                    <span class="headline">Aanpassen mapping</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                Oud: <b>{{dialogData.component.title}}</b>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12">
                                <v-autocomplete
                                    :disabled="formDisabled"
                                    v-model="targetDialogNewTarget"
                                    :loading="loading.search"
                                    :items="searchResults"
                                    :search-input.sync="search"
                                    :return-object="true"
                                    label="Nieuw doel van mapping"
                                    ></v-autocomplete>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="5">
                                <div><h2>Bestaande mapping</h2></div>
                                <v-simple-table dense>
                                    <template v-slot:default>
                                        <thead>
                                            <tr>
                                                <th class="text-left">Variabele</th>
                                                <th class="text-left">Waarde</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr><th>Component code</th><td>{{dialogData.component.id}}</td></tr>
                                            <tr><th>Component titel</th><td>{{dialogData.component.title}}</td></tr>
                                            <tr><th>Codesystem</th><td>{{dialogData.codesystem.title}} ({{dialogData.codesystem.version}})</td></tr>
                                            <tr v-for="(value, key) in dialogData.component.extra" :key="key">
                                                <th>{{ key }}</th>
                                                <td>{{ value }}</td>
                                            </tr>
                                        </tbody>
                                    </template>
                                </v-simple-table>
                            </v-col>
                            <v-divider vertical></v-divider>
                            <v-col cols="5">
                                <div><h2>Nieuwe mapping</h2></div>
                                <v-simple-table dense>
                                    <template v-slot:default>
                                        <thead>
                                            <tr>
                                            <th class="text-left">Variabele</th>
                                            <th class="text-left">Waarde</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr><th>Component code</th><td>{{targetDialogNewTarget.value}}</td></tr>
                                            <tr><th>Component titel</th><td>{{targetDialogNewTarget.text}}</td></tr>
                                            <tr><th>Codesystem</th><td>{{targetDialogNewTarget.codesystem.title}} ({{targetDialogNewTarget.codesystem.version}})</td></tr>
                                            <tr v-for="(value, key) in targetDialogNewTarget.extra" :key="key">
                                                <th>{{ key }}</th>
                                                <td>{{ value }}</td>
                                            </tr>
                                        </tbody>
                                    </template>
                                </v-simple-table>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="targetEditDialog = false">Close</v-btn>
                    <v-btn color="blue darken-1" :disabled="formDisabled" text @click="saveDialog(targetDialogNewTarget)">Save</v-btn>
                </v-card-actions>
            </v-card>
            </v-dialog>



    </div>
</template>
<script>
export default {
    data() {
        return {
            search: null,
            searchExtra: null,
            targetEditDialog: false,
            targetDialogOldTarget: {},
            targetDialogNewTarget: {},
        }
    },
    watch: {
        search (val) {
            (val.length > 2) && this.$store.dispatch('MappingTasks/TargetSearch', val)
        },
        searchExtra (val) {
            (val.length > 2) && this.$store.dispatch('MappingTasks/TargetSearch', val)
        }
    },
    methods: {
        submit () {
            this.$store.dispatch('MappingTasks/postMappingTargets',this.targets)
        },
        searchTarget () {
            this.$store.dispatch('MappingTasks/TargetSearch', this.search)
        },
        openDialog (mappingid) {
            this.targetEditDialog = true
            this.$store.dispatch('MappingTasks/getDialogData', mappingid)
        },
        saveDialog (newData) {
            this.targetEditDialog = false
            this.targetDialogOldTarget = {}
            this.targetDialogNewTarget = {}
            this.$store.dispatch('MappingTasks/saveDialogData', newData)
        }
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
            return this.$store.state.MappingTasks.loading
        },
        user(){
            return this.$store.state.userData
        }
    },
    created() {
        this.$store.dispatch('MappingProjects/getProjectDetails',this.$route.params.projectid)
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