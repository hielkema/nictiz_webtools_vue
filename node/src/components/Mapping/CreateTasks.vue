<template>
    <div>
        <v-container v-if="user.groups.includes('mapping | create tasks')">
            <v-row>
                <v-col cols=12>
                    <v-row>
                        <BackToProjectsSolo/>
                    </v-row>
                </v-col>
            </v-row>
            
            <v-row>
                <v-col cols=4>
                    <v-card>
                        <v-card-title>
                            Nieuwe taken aanmaken
                        </v-card-title>   
                        <v-card-text>
                            <ul>
                                <li>1 Concept ID per regel</li>
                                <li>Niet meer dan 5000 per keer</li>
                            </ul>
                            <v-textarea
                                v-model="createTasks"
                                label="Plak hier de aan te maken taken"
                                autofocus
                                clearable
                                hide-details
                                ></v-textarea>
                        </v-card-text>
                    </v-card>
                </v-col>
                <v-col cols=4>
                    <v-card>
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
                <v-col cols=4>
                    <v-card>   
                        <v-card-title>
                            Details aan te maken taken
                        </v-card-title>
                        <v-card-text>
                            <v-row dense>
                                <v-col cols=12>
                                    <strong>Project: {{selectedProject.title}}</strong>
                                </v-col>
                            </v-row>
                            <v-row dense>
                                <v-col cols=12>
                                    <v-select class="pa-1" :items="users" v-model="value.createWithUser" label="Gebruiker"></v-select>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols=12>
                                    <v-select class="pa-1" :items="statuses" v-model="value.createWithStatus" label="Status"></v-select>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols=12>
                                    <v-select class="pa-1" :items="codesystems" v-model="value.createWithCodesystem" item-value="id" item-text="title" label="Codesystems"></v-select>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols=12>
                                    <v-textarea
                                        v-model="comments"
                                        label="Commentaar bij aangemaakte taken"
                                        autofocus
                                        clearable
                                        hide-details
                                        ></v-textarea>
                                </v-col>
                            </v-row>
                            
                        </v-card-text>
                        <v-card-actions>
                            <v-btn
                                color="success"
                                class="mr-4"
                                @click="submit()">
                                Verzenden
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        
            <v-row>
                <v-col cols=12>
                    <v-card>
                        <v-card-title>
                            Aangemaakte taken
                        </v-card-title>
                        <v-card-text>
                            <v-data-table
                                :headers="headers"
                                :items="filteredTasks"
                                :items-per-page="50"
                                :search="search"
                                :loading="loading"
                                item-key="id"
                                class="elevation-2"
                                multi-sort
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
                { text: 'Component zoekterm', value: 'reqid' },
                { text: 'Task ID', value: 'taskid' },
                { text: 'Component gevonden', value: 'component_title' },
                { text: 'Al aanwezig', value: 'present' },
                { text: 'Aangemaakt', value: 'created' },
                { text: 'Error', value: 'error' },
                { text: 'Project', value: 'project' },
                // { text: 'Codesystem', value: 'component.codesystem.title' },
                // { text: 'Code', value: 'component.id' },
                // { text: 'Term', value: 'component.title' },
                { text: 'Status', value: 'status' },
                { text: 'Gebruiker', value: 'user' },
                // { text: 'Resultaat', value: 'resultaat' },
            ],
            value: {
                'createWithUser': false,
                'createWithStatus': false,
                'createWithCodesystem': false,
            },
            search: '',
            createTasks: '',
            comments: '',
            filters: {
                present: [],
                created: [],
                error: [],
                user: [],
                status: [],
                project: [],
            }
        }
    },
    methods: {
        submit: function() {
            var payload = {
                'tasks' : this.createTasks,
                'comments' : this.comments,
                'user' : this.value.createWithUser,
                'status' : this.value.createWithStatus,
                'codesystem': this.value.createWithCodesystem,
                'projectid': this.$route.params.projectid,
            }
            this.$store.dispatch('TaskManager/createTasks', payload)
            this.createTasks = ''
        },
        columnValueList(val) {
           return this.tasks.map(d => d[val]).sort()
        },
    },
    computed: {
        loading(){
            return this.$store.state.TaskManager.loading
        },
        tasks(){
            return this.$store.state.TaskManager.newTasks
        },
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
        selectedProject(){
            return this.$store.state.MappingProjects.selectedProject
        },
        codesystems(){
            return this.$store.state.MappingCodesystems.codesystems
        },
        filteredTasks() {
            return this.tasks.filter(d => {
                return Object.keys(this.filters).every(f => {
                    return this.filters[f].length < 1 || this.filters[f].includes(d[f])
                })
            })
        },
    },
    mounted(){
    },
    created(){
        if(this.$route.params.projectid){
            // this.$store.dispatch('MappingProjects/getProjectDetails', this.$route.params.projectid)
            this.$store.dispatch('MappingProjects/getProjectStatuses',this.$route.params.projectid)
            this.$store.dispatch('MappingProjects/getProjectUsers',this.$route.params.projectid)
        }
        this.$store.dispatch('MappingProjects/getProjects')
        this.$store.dispatch('MappingCodesystems/getCodesystems')
    }
}
</script>

