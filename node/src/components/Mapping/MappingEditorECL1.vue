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
            
            <form>
                <template v-for="item in targets">
                    <v-card :key="item.id"
                        class="my-1">
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
                                        <v-container>
                                            <v-row  no-gutters align="center">
                                                <v-col cols=11>
                                                    <v-simple-table dense>
                                                        <template v-slot:default>
                                                            <tbody>
                                                                <tr>
                                                                    <th width="50">Term</th>
                                                                    <td>{{item.target.component_title}}</td>
                                                                </tr>
                                                                <tr>
                                                                    <th>Code</th>
                                                                    <td v-if="item.target.codesystem.title == 'SNOMED'">{{item.target.codesystem.title}} - Code: {{item.target.component_id}} <a :href="'https://terminologie.nictiz.nl/art-decor/snomed-ct?conceptId='+item.target.component_id" target="_blank">Open in browser</a></td>
                                                                    <td v-else-if="item.target.codesystem.title == 'Labcodeset'">{{item.target.codesystem.title}} - Code: {{item.target.component_id}} <a :href="'https://labterminologie.nl/art-decor/labconcepts?search='+item.target.component_id" target="_blank">Open in browser</a></td>
                                                                    <td v-else>{{item.target.codesystem.title}} - Code: {{item.target.component_id}}</td>
                                                                </tr>
                                                                <tr v-if="project.group">
                                                                    <th>Group</th>
                                                                    <td>{{item.group}}</td>
                                                                </tr>
                                                                <tr v-if="project.priority">
                                                                    <th>Priority</th>
                                                                    <td>{{item.priority}}</td>
                                                                </tr>
                                                                <tr v-if="project.correlation">
                                                                    <th>Correlation</th>
                                                                    <td v-if="item.correlation == '447559001'">Broad to narrow</td>
                                                                    <td v-if="item.correlation == '447557004'">Exact match</td>
                                                                    <td v-if="item.correlation == '447558009'">Narrow to broad</td>
                                                                    <td v-if="item.correlation == '447560006'">Partial overlap</td>
                                                                    <td v-if="item.correlation == '447556008'">Not mappable</td>
                                                                    <td v-if="item.correlation == '447561005'">Not specified</td>
                                                                </tr>
                                                                <tr v-if="project.rule">
                                                                    <th>Rule</th>
                                                                    <td>{{item.rule}}</td>
                                                                </tr>
                                                                <tr v-if="project.advice">
                                                                    <th>Advice</th>
                                                                    <td>{{item.advice}}</td>
                                                                </tr>
                                                                <tr v-if="project.rulebinding">
                                                                    <th>Bindings</th>
                                                                    <td>
                                                                        <ul v-for="dependency in item.dependency" :key="dependency.id">
                                                                            <li v-if="dependency.binding == true">{{dependency.source}}</li>
                                                                        </ul>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </template>
                                                    </v-simple-table>
                                                </v-col>
                                                <v-col cols="1">
                                                    <v-row v-if="formDisabled == false">
                                                        <v-btn color="grey" v-on:click="openDialog(item.id)" icon><v-icon right>mdi-file-edit</v-icon></v-btn>
                                                    </v-row>
                                                    <v-row>
                                                        <v-tooltip right>
                                                            <template v-slot:activator="{ on }">
                                                                <v-btn color="primary" dark v-on="on" icon><v-icon right color="grey">mdi-information-outline</v-icon></v-btn>
                                                            </template>
                                                            <span>
                                                                <table>
                                                                    <tr v-for="(value, key) in item.target.extra" :key="key">
                                                                        <th>{{ key }}</th>
                                                                        <td v-if="key == 'Materialen'">
                                                                            <li v-for="value in value" :key="value.SCTID">{{value.SCTID}} {{value.FSN}}</li>
                                                                        </td>
                                                                        <td v-else>{{ value }}</td>
                                                                    </tr>
                                                                </table>
                                                            </span>
                                                        </v-tooltip>
                                                    </v-row>
                                                </v-col>
                                            </v-row>
                                        </v-container>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list>
                    </v-card>
                </template>
            </form>
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
        }
    },
    watch: {
    },
    methods: {
        submit () {
            this.$store.dispatch('MappingTasks/postMappingTargets',this.targets)
        },
        openDialog (mappingid) {
            this.targetEditDialog = true
            this.$store.dispatch('MappingTasks/getDialogData', mappingid)
            // this.$store.dispatch('MappingTasks/getDialogTarget', mappingid)
            this.dialogTarget = this.targets.filter(obj => {
                return obj.id === mappingid
            })[0]
        },
        saveDialog (newData) {
            this.targetEditDialog = false
            this.targetDialogOldTarget = {}
            this.targetDialogNewTarget = false
            this.$store.dispatch('MappingTasks/saveDialogTarget', newData)
            this.$store.dispatch('MappingTasks/postMappingTargets',this.targets)
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