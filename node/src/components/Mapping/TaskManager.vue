<template>
    <div>
        <v-container v-if="user.groups.includes('mapping | taskmanager')">
            <v-row>
                <v-col cols=6>
                    <v-row>
                        <BackToProjectsSolo/>
                    </v-row>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols=6>
                    <v-card class="pa-1">
                        <v-card-title>
                            Filters en zoeken
                        </v-card-title>   
                        <v-card-text>
                            <v-simple-table max-width="40">
                                <tbody>
                                    <tr>
                                        <td colspan=2>
                                            <v-text-field
                                                v-model="search"
                                                label="Zoek binnen resultaten"
                                                hide-details
                                                autofocus
                                                clearable
                                                dense></v-text-field>
                                        </td>
                                    </tr>
                                    <tr
                                        v-for="header in headers"
                                        :key="header.text">
                                        <td 
                                            v-if="filters.hasOwnProperty(header.value)"
                                            align="left">
                                        {{header.text}} 
                                        </td>
                                        <td v-if="filters.hasOwnProperty(header.value)" class="text-left">
                                            <v-select 
                                                flat 
                                                dense 
                                                hide-details 
                                                small 
                                                multiple 
                                                clearable 
                                                :items="columnValueList(header.value)" 
                                                v-model="filters[header.value]">     
                                            </v-select>
                                        </td>
                                    </tr>
                                </tbody>

                            </v-simple-table>
                        </v-card-text>
                    </v-card>
                </v-col>
                <v-col cols=6>
                    <v-card class="pa-1">   
                        <v-card-title>
                            Acties
                        </v-card-title>
                        <v-card-text>
                            <v-row dense>
                                <v-col cols=5>
                                    <v-checkbox class="pa-1" v-model="action.changeUser" label="Wijzig gebruiker"></v-checkbox>
                                </v-col>
                                <v-col cols=6>
                                    <v-select class="pa-1" :items="users" v-model="value.changeUser" label="Gebruikers"></v-select>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols=5>
                                    <v-checkbox class="pa-1" v-model="action.changeStatus" label="Wijzig Status"></v-checkbox>
                                </v-col>
                                <v-col cols=6>
                                    <v-select class="pa-1" :items="statuses" v-model="value.changeStatus" label="Status"></v-select>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols=5>
                                    <v-checkbox class="pa-1" v-model="action.changeProject" label="Wijzig Project"></v-checkbox>
                                </v-col>
                                <v-col cols=6>
                                    <v-select class="pa-1" :items="projects" v-model="value.changeProject" item-text="title" item-value="id" label="Projecten"></v-select>
                                </v-col>
                            </v-row>
                            
                            <v-alert type="warning" v-if="action.changeProject && value.changeProject && (selectedTasks.length != 0)">Het project wordt bij {{selectedTasks.length}} taken gewijzigd</v-alert>
                            <v-alert type="info" v-if="action.changeUser && value.changeUser && (selectedTasks.length != 0)">De gebruiker wordt bij {{selectedTasks.length}} taken gewijzigd</v-alert>
                            <v-alert type="info" v-if="action.changeStatus && value.changeStatus && (selectedTasks.length != 0)">De status wordt bij {{selectedTasks.length}} taken gewijzigd</v-alert>

                        </v-card-text>
                        <v-card-actions>
                            <v-btn
                                color="success"
                                class="mr-4"
                                @click="submit()">
                                Validate
                            </v-btn>
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
                        <v-card-actions>
                            <v-btn v-on:click="refresh()">Ververs gehele tabel</v-btn><br>
                        </v-card-actions>
                        <v-card-text>
                            <v-data-table
                                :headers="headers"
                                :items="filteredTasks"
                                :items-per-page="10"
                                :search="search"
                                :loading="loading"
                                item-key="id"
                                v-model="selected"
                                class="elevation-2"
                                multi-sort
                                show-select
                                dense
                            >
                            </v-data-table>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>
<script>
import BackToProjectsSolo from '@/components/Mapping/BackToProjectsSolo.vue'

export default {
    components: {
        BackToProjectsSolo,
    },
    data() {
        return {
            headers: [
                { text: 'Task ID', value: 'id' },
                { text: 'Project', value: 'project' },
                { text: 'Codesystem', value: 'component.codesystem.title' },
                { text: 'Code', value: 'component.id' },
                { text: 'Term', value: 'component.title' },
                { text: 'Component actief', value: 'component_actief' },
                { text: 'Status', value: 'status_title' },
                { text: 'Gebruiker', value: 'user.name' },
                // headers used exclusively for filtering
                { text: 'Source codesystem', value: 'codesystem', align: ' d-none' },
                { text: 'Gebruikersnaam', value: 'username', align: ' d-none' },
            ],
            action: {
                'changeUser': false,
                'changeStatus': false,
                'changeProject': false,
            },
            value: {
                'changeUser': false,
                'changeStatus': false,
                'changeProject': false,
            },
            selected: [],
            search: '',
            groupBy: null,
            form: true,
            formData: {
                'name' : '',
            },
            filters: {
                username: [],
                component_actief: [],
                codesystem: [],
                project: [],
                status_title: [],
            }
        }
    },
    methods: {
        refresh: function() {
            this.$store.dispatch('TaskManager/getTasks', this.$route.params.projectid)
        },
        submit: function() {
            var payload = {
                'tasks' : this.selectedTasks,
                'action' : this.action,
                'value' : this.value,
                'projectid': this.$route.params.projectid,
            }
            this.$store.dispatch('TaskManager/changeTasks', payload)
        },
        columnValueList(val) {
           return this.$store.state.TaskManager.tasks.map(d => d[val]).sort()
        },
    },
    computed: {
        loading(){
            return this.$store.state.TaskManager.loading
        },
        tasks(){
            return this.$store.state.TaskManager.tasks
        },
        filteredTasks() {
            return this.$store.state.TaskManager.tasks.filter(d => {
                return Object.keys(this.filters).every(f => {
                    return this.filters[f].length < 1 || this.filters[f].includes(d[f])
                })
            })
        },
        selectedTasks(){
            return Array.from(this.selected, x => x['id'])
        },
        // groupByList(){
        //     const result = this.headers
        //     // result.push('Niet groeperen')
        //     return result
        // },
        user(){
            return this.$store.state.userData
        },
        users(){
            return this.$store.state.MappingProjects.users
        },
        statuses(){
            return this.$store.state.MappingProjects.statuses
        },
        projects(){
            return this.$store.state.MappingProjects.projects
        },
    },
    mounted(){
        this.$store.dispatch('TaskManager/getTasks', this.$route.params.projectid)
    },
    created(){
        if(this.$route.params.projectid){
            this.$store.dispatch('MappingProjects/getProjectDetails', this.$route.params.projectid)
            this.$store.dispatch('MappingProjects/getProjectStatuses',this.$route.params.projectid)
            this.$store.dispatch('MappingProjects/getProjectUsers',this.$route.params.projectid)
        }
        this.$store.dispatch('MappingProjects/getProjects')
    }
}
</script>

