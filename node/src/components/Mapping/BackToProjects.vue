<template>
    <v-container v-if="user.groups.includes('mapping | access')" fluid>
        <v-card>
            <v-toolbar
            color="cyan darken-2"
            dark>
                <v-toolbar-title>
                    <v-btn @click="back()" text>Terug naar projecten</v-btn>
                    <v-btn @click="refresh()" text>Vernieuwen</v-btn>
                </v-toolbar-title>
            </v-toolbar>
        </v-card>
    </v-container>
</template>
<script>
export default {
    data() {
        return {
        }
    },
    methods: {
        back () {
            this.$store.commit('MappingTasks/clearTaskMemory')
            this.$router.push({ path: `/mapping/Projects/${this.$route.params.projectid}/` });
        },
        refresh() {
            this.$store.dispatch('MappingProjects/getProjectDetails', this.$route.params.projectid)
            this.$store.dispatch('MappingProjects/getProjectStatuses',this.$route.params.projectid)
            this.$store.dispatch('MappingProjects/getProjectUsers',this.$route.params.projectid)

            this.$store.dispatch('MappingAudits/getAudits',this.$route.params.taskid)
            
            this.$store.dispatch('MappingTasks/getTasks', this.$route.params.projectid)
            this.$store.dispatch('MappingTasks/getTaskDetails', this.$route.params.taskid)
            this.$store.dispatch('MappingTasks/getComments', this.$route.params.taskid)
            this.$store.dispatch('MappingTasks/getMappingTargets', this.$route.params.taskid)
        }
    },
    computed: {
        user(){
            return this.$store.state.userData
        }
    },
    mounted() {
    }
}
</script>

