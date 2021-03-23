<template>
    <div>
        <v-container 
            v-if="user.groups.includes('mapping | access')"
            fluid>
            <v-card class="pa-0 ma-0">
                <v-toolbar
                color="cyan darken-2"
                :loading="loading"
                dark
                dense>
                    <v-toolbar-title>Bron component</v-toolbar-title>
                </v-toolbar>
                <v-simple-table dense>
                    <template v-slot:default>
                        <tbody>
                            <tr><th>Component code</th><td>{{selectedTask.component.id}}</td></tr>
                            <tr><th>Component titel</th><td>{{selectedTask.component.title}}</td></tr>
                            <tr><th>Codesystem</th><td>{{selectedTask.component.codesystem.title}} ({{selectedTask.component.codesystem.version}})</td></tr>
                            <tr><th>Taak ID</th><td>{{selectedTask.id}}</td></tr>
                            <tr v-for="(value, key) in selectedTask.component.extra" :key="key">
                                <th v-if="value != false">{{ key }}</th>
                                <td v-if="value != false">{{ value }}</td>
                            </tr>
                            <tr>
                                <th>Gerelateerde taken</th>
                                <td>
                                    <div v-for="(task,key) in relatedTasks" :key="key" dense>
                                        <li v-if="task.id != selectedTask.id">
                                            <!-- {{task.source_component.component_id}} {{task.source_component.component_title}}<br> -->
                                            {{task.project.title}} [{{task.status.title}} @ {{task.user.username}}] - {{task.source_component.component_id}} |{{task.source_component.component_title}}|
                                            <v-btn text :href="`#/mapping/Projects/${task.project.id}/Task/`+task.id" target="_blank"><v-icon>mdi-link</v-icon></v-btn>

                                            <v-tooltip right v-if="task.comments.length > 0">
                                                <template v-slot:activator="{ on }">
                                                    <v-btn color="primary" dark v-on="on" icon><v-icon bottom color="black">mdi-comment-multiple-outline</v-icon></v-btn>
                                                </template>
                                                <v-list three-line
                                                    style="max-width:100%"
                                                    class="overflow-y-auto overflow-x-auto">
                                                    <template v-for="item in task.comments">
                                                        <v-list-item
                                                            dense
                                                            class="white"
                                                            :key="item.id">
                                                            <v-list-item-content>
                                                                <v-list-item-title><v-icon>mdi-comment-text-outline</v-icon> Commentaar (door {{item.user}})</v-list-item-title>
                                                                <v-list-item-subtitle v-html="item.created"></v-list-item-subtitle>
                                                                {{item.body}}
                                                            </v-list-item-content>
                                                        </v-list-item>
                                                    </template>
                                                </v-list>
                                            </v-tooltip>
                                        </li>
                                    </div>
                                </td>
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
        relatedTasks(){
            return this.$store.state.MappingTasks.relatedTasks
        },
        loading(){
            return this.$store.state.MappingTasks.loading.details
        },
        user(){
            return this.$store.state.userData
        }
    },
    created() {
        this.$store.dispatch('MappingTasks/getMappingTargets',this.selectedTask.id)
        // this.$store.dispatch('MappingTasks/getTasks',this.$route.params.projectid)
    }
}
</script>

