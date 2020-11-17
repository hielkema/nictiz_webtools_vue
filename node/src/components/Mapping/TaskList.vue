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
                        <v-col cols=10>
                            <v-select class="pa-1" :items="users" v-model="filterUser" label="Filter op gebruiker"></v-select>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols=1>
                            <v-checkbox v-model="filterOnStatus"></v-checkbox>
                        </v-col>
                        <v-col cols=10>
                            <v-select class="pa-1" :items="statuses" v-model="filterStatus" label="Filter op status"></v-select>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols=1>
                            <v-checkbox v-model="filterOnCategory"></v-checkbox>
                        </v-col>
                        <v-col cols=10>
                            <v-select class="pa-1" :items="categories" v-model="filterCategory" label="Filter op categorie"></v-select>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols=1>
                        </v-col>
                        <v-col cols=10>
                            <v-select class="pa-1" :items="perPageOptions" v-model="perPage" label="Aantal per pagina"></v-select>
                        </v-col>
                    </v-row>
                    <!-- <v-row>
                        <v-col cols=1>
                            <v-checkbox v-model="filterOnCode"></v-checkbox>
                        </v-col>
                        <v-col cols=10>
                            <v-text-field
                                label="Zoek op code"
                                model="filterCode"
                                ></v-text-field>
                        </v-col>
                    </v-row> -->
                </v-card-text>
            </v-card>

            <v-card
                max-width="400"
                class="mx-auto"
                :loading="loading"
            >
                <v-pagination
                    v-model="page"
                    total-visible="5"
                    dense
                    :length="Math.ceil(tasksFiltered.length/perPage)"
                ></v-pagination>

                <v-list three-line
                    style="max-height:800px"
                    class="overflow-y-auto pa-0"
                    >
                    <v-list-item-group
                        v-model=visiblePages>
                        <v-list-item
                            @click="selectTask(item.id)"
                            v-for="item in visiblePages"
                            :key="item.id"
                            :class="{'cyan lighten-3' : item.id == selectedTask.id}">
                            <v-list-item-content>
                                <v-list-item-title 
                                    v-html="item.component.title"></v-list-item-title>
                                <v-list-item-subtitle>
                                    {{item.status.title}} @ {{item.user.name}} [{{item.category}}]<br>
                                    Code: {{item.component.id}} / Taak: {{item.id}}                                    
                                    </v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list-item-group>
                </v-list>

                <v-skeleton-loader
                    v-if="(loading) && (!selectedTask)"
                    class="mx-auto"
                    max-width="400"
                    type="article"
                    ></v-skeleton-loader>

                <v-pagination
                    v-model="page"
                    total-visible="5"
                    dense
                    :length="Math.ceil(tasksFiltered.length/perPage)"
                ></v-pagination>
            </v-card>

            
        </v-container>
    </div>
</template>
<script>
export default {
    data() {
        return {
            filterStatus: '',
            filterUser: this.$store.state.userData.id,
            filterCode: '',
            filterCategory: 'Prioriteit 1',
            filterOnUser: true,
            filterOnStatus: true,
            filterOnCode: true,
            filterOnCategory: true,
            filterBox: false,

            selectedColor: 'green',

            page: 1,
            perPage: 8,
            perPageOptions: [8,20,50,100,500,1000,3000,8000],
        }
    },
    methods: {
        selectTask(taskid){
            this.$router.push({ path: `/mapping/Projects/${this.$route.params.projectid}/Task/`+taskid });
            this.$store.dispatch('MappingAudits/getAudits',taskid)
            this.$store.dispatch('MappingTasks/getTaskDetails',taskid)
            this.$store.dispatch('MappingTasks/getMappingTargets',taskid)
            this.$store.dispatch('MappingTasks/getReverse', taskid)
            this.$store.dispatch('MappingTasks/getComments',taskid)
            this.$store.dispatch('MappingTasks/getReverseExclusions', taskid)
            this.$store.dispatch('MappingTasks/getRelatedTasks', taskid)

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
        categories(){
            return this.$store.state.MappingProjects.selectedProject.categories
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
                filterStatus = this.filterStatus.toString(),
                filterCategory = this.filterCategory.toString()
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
                if(filtered){
                    if(that.filterOnCategory && filterCategory && filterCategory.length > 0){
                        filtered = item.category == filterCategory
                    }
                }
                return filtered
            })
        },
        visiblePages () {
            return this.tasksFiltered.slice((this.page - 1)* this.perPage, this.page* this.perPage)
        },
    },
    created() {
        // this.$store.dispatch('MappingTasks/getTasks',this.$route.params.projectid)
    }
}
</script>

