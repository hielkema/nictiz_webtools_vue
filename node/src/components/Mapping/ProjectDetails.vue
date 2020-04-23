<template>
    <div>
        <v-container v-if="user.groups.includes('mapping | access')">
            <v-row>
                <v-col cols=12>
                    <v-card class="pa-1">
                        <v-card-title>
                            Project {{$route.params.projectid}}: {{projectDetails.title}}
                        </v-card-title>   
                        <v-card-text>
                            <v-simple-table dense>
                                <thead>
                                    <tr>
                                        <th width="200"></th><th>Totaal</th><th>Gebruiker</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th>Open taken in project</th><td>{{projectDetails.open_tasks}}</td><td>{{projectDetails.open_tasks_user}}</td>
                                    </tr>
                                    <tr v-for="(value, key) in projectDetails.tasks_per_status" :key="key">
                                        <th>{{value.status_title}}</th><td>{{value.count_total}}</td><td>{{value.count_user}}</td>
                                    </tr>
                                </tbody>
                            </v-simple-table>
                            <v-card-actions>
                                <v-btn v-on:click="openTaskEditor()">Ga naar de inbox</v-btn><br>
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
            this.$router.push({ path: `/mapping/Projects/${this.$route.params.projectid}/task/` });
        }
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

