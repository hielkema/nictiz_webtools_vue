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
                    <v-select class="pa-1" :items="users" v-model="selectedUser" @change="changeUser(selectedUser)"></v-select>
                    <strong>Huidige gebruiker:</strong> {{task.user.name}}
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
            if(this.comment == ''){
                this.$store.dispatch('MappingTasks/changeUser', userid)
            }else{
                this.selectedUser = null
                alert("Het commentaar is nog niet opgeslagen. Verwijder het commentaar, of sla het op voordat je de gebruiker wijzigt.")
            }
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
        this.selectedUser = this.task.user.id
    }
}
</script>

