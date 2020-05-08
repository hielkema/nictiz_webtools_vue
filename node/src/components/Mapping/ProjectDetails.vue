<template>
    <div>
        <v-container v-if="user.groups.includes('mapping | access')">
            <v-row>
                <v-col cols=12>
                    <v-card class="pa-1">
                        <v-card-title>
                            Project {{projectDetails.id}}: {{projectDetails.title}}
                        </v-card-title>   
                        <v-card-text>
                            <v-simple-table dense>
                                <thead>
                                    <tr>
                                        <th width="200"></th><th>Gebruiker</th><th>Totaal</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th>Open taken in project</th><td>{{projectDetails.open_tasks_user}}</td><td>{{projectDetails.open_tasks}}</td>
                                    </tr>
                                    <tr v-for="(value, key) in projectDetails.tasks_per_status" :key="key">
                                        <th>{{value.status_title}}</th><td>{{value.count_user}}</td><td>{{value.count_total}}</td>
                                    </tr>
                                </tbody>
                            </v-simple-table>
                            <v-card-actions>
                                <v-btn v-on:click="openTaskEditor()">Inbox</v-btn>
                                <v-btn v-if="user.groups.includes('mapping | taskmanager')" v-on:click="openTaskManager()">Taskmanager</v-btn>
                                <v-btn v-if="user.groups.includes('mapping | create tasks')" v-on:click="openTaskCreator()">Taken aanmaken</v-btn>

                            </v-card-actions>
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

        }
    },
    methods: {
        openTaskEditor(){
            this.$store.commit('MappingTasks/clearTaskMemory')
            this.$router.push({ path: `/mapping/Projects/${this.projectDetails.id}/task/` });
        },
        openTaskManager(){
            this.$store.commit('TaskManager/resetTasks')
            this.$router.push({ path: `/mapping/TaskManager/${this.projectDetails.id}/` });
        },
        openTaskCreator(){
            this.$router.push({ path: `/mapping/CreateTasks/${this.projectDetails.id}/` });
        },
    },
    computed: {
        projectDetails(){
            return this.$store.state.MappingProjects.selectedProject
        },
        loading(){
            return this.$store.state.MappingProjects.loading
        },
        user(){
            return this.$store.state.userData
        }
    },
}
</script>

