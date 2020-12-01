<template>
    <div>
        <v-container 
            fluid>
            <v-card v-if="user.groups.includes('mapping | change task status')">
                <v-toolbar
                    color="cyan darken-2"
                    dark
                    dense>
                    <span class="headline">Gebruiker</span>
                </v-toolbar>
                <v-select class="pa-1" :items="users" v-model="task.user.id" @change="changeUser(task.user.id)"></v-select>
            </v-card>
            <v-card v-else>
                <v-toolbar
                    color="cyan darken-2"
                    dark
                    dense>
                    <span class="headline">Gebruiker</span>
                </v-toolbar>
                <v-card-text align-center>
                    {{task.user.name}}
                </v-card-text>
            </v-card>
        </v-container>
    </div>
</template>
<script>
export default {
    data() {
        return {
            selectedUser: null,
        }
    },
    methods: {
        changeUser (userid) {
            if(this.comment != ''){
                alert("Je hebt de taak aan iemand anders toegewezen terwijl er nog een niet-opgeslagen commentaar aanwezig is. Vergeet niet om het commentaar op te slaan voor je verder gaat. De toewijzing is al wel doorgevoerd.")
            }
            this.$store.dispatch('MappingTasks/changeUser', userid)
        },
    },
    computed: {
        users(){
            return this.$store.state.MappingProjects.users
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

