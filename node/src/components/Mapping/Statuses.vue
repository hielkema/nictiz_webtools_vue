<template>
    <div>
        <v-container fluid>
            <v-card class="ma-0 pa-0" v-if="user.groups.includes('mapping | change task status')">
                <v-toolbar
                    color="cyan darken-1"
                    dark
                    dense>
                    <span class="headline">Status</span>
                </v-toolbar>
                <v-card-text align-center>
                    <span v-for="status in statuses" :key="status.id">
                        <v-btn v-if="status.id == task.status.id" color="primary lighten-2" class="ma-1 pa-1">{{status.title}}</v-btn>
                        <v-btn v-else class="ma-1 pa-1" @click="changeStatus(status.id)">{{status.title}}</v-btn>
                    </span>
                </v-card-text>
                <v-toolbar
                    color="cyan darken-1"
                    dark
                    dense>
                    <span>Huidige status is <strong>{{task.status.title}}</strong><br> {{task.status.description}}</span>
                </v-toolbar>
            </v-card>
            <v-card v-else class="ma-0 pa-0">
                <v-toolbar
                    color="cyan darken-1"
                    dark
                    dense>
                    <span class="headline">Status</span>
                </v-toolbar>
                <v-card-text align-center>
                    {{task.status.title}}
                </v-card-text>
            </v-card>
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
        changeStatus (statusid) {
            if(this.comment != ''){
                alert("Het commentaar is nog niet opgeslagen. Verwijder het commentaar, of sla het op voordat je verder gaat. De status is al wel gewijzigd.")
            }
            this.$store.dispatch('MappingTasks/changeStatus', statusid)
        },
    },
    computed: {
        statuses(){
            return this.$store.state.MappingProjects.statuses
        },
        task(){
            return this.$store.state.MappingTasks.selectedTask
        },
        comment(){
            return this.$store.state.MappingTasks.commentDraft
        },
        loading(){
            return this.$store.state.MappingProjects.loading
        },
        user(){
            return this.$store.state.userData
        }
    },
    mounted() {
    }
}
</script>

