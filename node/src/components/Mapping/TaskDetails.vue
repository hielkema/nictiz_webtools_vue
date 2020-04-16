<template>
    <div>
        <v-container 
            v-if="user.groups.includes('mapping | access')"
            fluid>
            <v-card>
                <v-toolbar
                color="cyan"
                :loading="loading"
                dark
                dense>
                    <v-toolbar-title>Bron component</v-toolbar-title>
                </v-toolbar>
                <v-simple-table dense>
                    <template v-slot:default>
                    <thead>
                        <tr>
                        <th class="text-left">Variabele</th>
                        <th class="-text-left">Waarde</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><th>Component code</th><td>{{selectedTask.component.id}}</td></tr>
                        <tr><th>Component titel</th><td>{{selectedTask.component.title}}</td></tr>
                        <tr><th>Codesystem</th><td>{{selectedTask.component.codesystem.title}} ({{selectedTask.component.codesystem.version}})</td></tr>
                        <tr><th>Taak ID</th><td>{{selectedTask.id}}</td></tr>
                        <tr v-for="(value, key) in selectedTask.component.extra" :key="key">
                            <th>{{ key }}</th>
                            <td>{{ value }}</td>
                        </tr>
                    </tbody>
                    </template>
                </v-simple-table>
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
        
    },
    computed: {
        selectedTask(){
            return this.$store.state.MappingTasks.selectedTask
        },
        loading(){
            return this.$store.state.MappingTasks.loading.details
        },
        user(){
            return this.$store.state.userData
        }
    },
    created() {
        // this.$store.dispatch('MappingTasks/getTasks',this.$route.params.projectid)
    }
}
</script>

