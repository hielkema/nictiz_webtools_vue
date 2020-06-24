<template>
    <div>
        <v-container v-if="user.groups.includes('mapping | access')">
            <v-row>
                <v-col cols=12>
                    <v-card class="pa-1">
                        <v-card-title>
                            Projecten
                        </v-card-title>   
                        <v-card-text>
                            <v-data-table
                                :headers="headers"
                                :items="Projects"
                                :items-per-page="15"
                                :loading="loading"
                                class="elevation-2"
                                multi-sort
                                dense
                            >
                                <template v-slot:item.open="{ item }">
                                    <v-btn small color="blue lighten-2" v-on:click="selectProject(item.id)">Open</v-btn>
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
                { text: '', value: 'open' },
                { text: 'Titel', value: 'title' },
                { text: 'Open taken', value: 'open_tasks' },
                { text: 'Actief', value: 'active' },
                { text: 'Bron', value: 'source' },
            ]
        }
    },
    methods: {
        selectProject(projectid){
            this.$router.push({ path: `/mapping/Projects/${projectid}` });
            this.$store.dispatch('MappingProjects/getProjectDetails',projectid)
        }
    },
    computed: {
        Projects(){
            return this.$store.state.MappingProjects.projects
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

