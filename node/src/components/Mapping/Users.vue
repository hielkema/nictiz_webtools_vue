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
            changeUser (userid) {
                this.$store.dispatch('MappingTasks/changeUser', userid)
            },
        }
    },
    methods: {
        
    },
    computed: {
        users(){
            return this.$store.state.MappingProjects.users
        },
        task(){
            return this.$store.state.MappingTasks.selectedTask
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

