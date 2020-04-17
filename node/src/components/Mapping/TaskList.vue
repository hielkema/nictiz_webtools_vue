<template>
    <div>
        <v-container v-if="user.groups.includes('mapping | access')" fluid>
            <v-card
                max-width="400"
                class="mx-auto mb-1"
                :loading="loading"
            >
                <v-toolbar
                color="cyan darken-2"
                dark
                >
                    <v-app-bar-nav-icon @click="toggleFilterBox()">filter</v-app-bar-nav-icon>

                    <v-toolbar-title>Inbox ({{tasksFiltered.length}})</v-toolbar-title>
                </v-toolbar>
                <v-card-text v-if="filterBox">
                    <v-row>
                        <v-col cols=1>
                            <v-checkbox v-model="filterOnUser"></v-checkbox>
                        </v-col>
                        <v-col cols=11>
                            <v-select class="pa-1" :items="users" v-model="filterUser" label="Filter op gebruiker"></v-select>
                        </v-col>
                        <v-col cols=1>
                            <v-checkbox v-model="filterOnStatus"></v-checkbox>
                        </v-col>
                        <v-col cols=11>
                            <v-select class="pa-1" :items="statuses" v-model="filterStatus" label="Filter op status"></v-select>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>

            <v-card
                max-width="400"
                class="mx-auto"
                :loading="loading"
            >
                <v-list three-line
                    style="max-height:800px"
                    class="overflow-y-auto pa-0"
                    >
                    <v-list-item-group
                        v-model=tasksFiltered>
                        <v-list-item
                            @click="selectTask(item.id)"
                            v-for="item in tasksFiltered"
                            :key="item.id">
                            <v-list-item-content>
                                <v-list-item-title v-html="item.component.title"></v-list-item-title>
                                <v-list-item-subtitle>
                                    {{item.status.title}} @ {{item.user.name}}<br>
                                    Code: {{item.component.id}} / Taak: {{item.id}}
                                    </v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list-item-group>
                </v-list>
            </v-card>
        </v-container>
    </div>
</template>
<script>
export default {
    data() {
        return {
            filterStatus: '',
            filterUser: '',
            filterOnUser: true,
            filterOnStatus: true,
            filterBox: false,
        }
    },
    methods: {
        selectTask(taskid){
            this.$router.push({ path: `/mapping/Projects/${this.$route.params.projectid}/Task/`+taskid });
            this.$store.dispatch('MappingAudits/getAudits',taskid)
            this.$store.dispatch('MappingTasks/getTaskDetails',taskid)
            this.$store.dispatch('MappingTasks/getMappingTargets',taskid)
            this.$store.dispatch('MappingTasks/getComments',taskid)
        },
        toggleFilterBox(){
            if(this.filterBox == true){
                this.filterBox = false
            }else{
                this.filterBox = true
            }
            return true
        }
    },
    computed: {
        users(){
            return this.$store.state.MappingProjects.users
        },
        statuses(){
            return this.$store.state.MappingProjects.statuses
        },
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
        },
        tasksFiltered: function () {
            var that = this
            let filterUser = this.filterUser.toString(),
                filterStatus = this.filterStatus.toString()
            return this.tasks.filter(function(item){
                let filtered = true
                if(that.filterOnUser && filterUser && (filterUser.length > 0)){
                    filtered = item.user.id == filterUser
                }
                if(filtered){
                    if(that.filterOnStatus && filterStatus && filterStatus.length > 0){
                        filtered = item.status.id == filterStatus
                    }
                }
                return filtered
            })
      },
    },
    created() {
        // this.$store.dispatch('MappingTasks/getTasks',this.$route.params.projectid)
    }
}
</script>

