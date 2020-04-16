<template>
    <div>
        <v-container v-if="user.groups.includes('mapping | access')" fluid>
            <v-card
                max-width="400"
                class="mx-auto"
                :loading="loading"
            >
                <v-toolbar
                color="cyan"
                dark
                >
                    <v-app-bar-nav-icon></v-app-bar-nav-icon>

                    <v-toolbar-title>Inbox ({{tasks.length}})</v-toolbar-title>

                    <v-spacer></v-spacer>

                    <v-btn icon>
                        <v-icon>mdi-magnify</v-icon>
                    </v-btn>
                </v-toolbar>

                <v-list three-line
                    style="max-height:800px"
                    class="overflow-y-auto">
                    <template v-for="item in tasks">
                        <v-list-item
                            :v-model="selectedTask.id"
                            :key="item.id"
                            @click="selectTask(item.id)">
                            <v-list-item-content>
                                <v-list-item-title v-html="item.component.title"></v-list-item-title>
                                <v-list-item-subtitle>
                                    {{item.status.title}} @ {{item.user.name}}<br>
                                    Code: {{item.component.id}} / Taak: {{item.id}}
                                    </v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                    </template>
                </v-list>
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
        selectTask(taskid){
            this.$router.push({ path: `/mapping/Projects/${this.$route.params.projectid}/Task/`+taskid });
            this.$store.dispatch('MappingAudits/getAudits',taskid)
            this.$store.dispatch('MappingTasks/getMappingTargets',taskid)
            this.$store.dispatch('MappingTasks/getTaskDetails',taskid)
            this.$store.dispatch('MappingTasks/getComments',taskid)
        }
    },
    computed: {
        selectedTask(){
            return this.$store.state.MappingTasks.selectedTask
        },
        tasks(){
            return this.$store.state.MappingTasks.tasks
        },
        loading(){
            return this.$store.state.MappingTasks.loading.tasklist
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

