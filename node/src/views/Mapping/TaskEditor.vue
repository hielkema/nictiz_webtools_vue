<template>
    <div id="app">
        <v-container no-gutters>
            <v-row>
                <v-col cols=3>
                    <v-row>
                        <v-col cols=12>
                            <BackToProjects />
                            <TaskList />
                        </v-col>
                    </v-row>
                </v-col>

                <v-col cols=5 v-if="selectedTask">
                    <v-row>
                        <v-col cols=12>
                            <TaskDetails />
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols=12>
                            <AuditList />
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols=12>
                            <Statuses />
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols=12>
                            <Users />
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols=12>
                            <CommentsForm />
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols=12>
                            <CommentsList />
                        </v-col>
                    </v-row>
                </v-col>
                <v-col cols=4>
                    <v-row>
                        <v-col cols=12>
                            <MappingEditor1N />
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import TaskList from '@/components/Mapping/TaskList';
import TaskDetails from '@/components/Mapping/TaskDetails';
import AuditList from '@/components/Mapping/AuditList';
import CommentsList from '@/components/Mapping/CommentsList';
import MappingEditor1N from '@/components/Mapping/MappingEditor1N';
import Statuses from '@/components/Mapping/Statuses';
import Users from '@/components/Mapping/Users';
import BackToProjects from '@/components/Mapping/BackToProjects';
import CommentsForm from '@/components/Mapping/CommentsForm';

export default {
    components: {
        TaskList,
        CommentsList,
        CommentsForm,
        TaskDetails,
        BackToProjects,
        Statuses,
        Users,
        AuditList,
        MappingEditor1N,
    },
    created(){
        
        this.$store.dispatch('MappingTasks/getTasks', this.$route.params.projectid)
        if(this.$route.params.projectid){
            this.$store.dispatch('MappingProjects/getProjectDetails', this.$route.params.projectid)
            this.$store.dispatch('MappingProjects/getProjectStatuses',this.$route.params.projectid)
            this.$store.dispatch('MappingProjects/getProjectUsers',this.$route.params.projectid)
        }
        if(this.$route.params.taskid){
            this.$store.dispatch('MappingTasks/getTaskDetails', this.$route.params.taskid)
            this.$store.dispatch('MappingTasks/getComments', this.$route.params.taskid)
            this.$store.dispatch('MappingTasks/getMappingTargets', this.$route.params.taskid)
        }
    },
    computed: {
        selectedTask(){
            return this.$store.state.MappingTasks.selectedTask
        },
        selectedProject(){
            return this.$store.state.MappingTasks.selectedProject
        }
    }
}
</script>