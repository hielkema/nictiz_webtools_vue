<template>
    <div id="app">
            <v-col>
                <v-row no-gutters>
                    <v-col cols=12>
                        <v-card>
                            <v-card-title>{{selectedProject.title}}
                            </v-card-title>
                        </v-card>
                    </v-col>
                </v-row>
                <!-- <v-row v-if="user.groups.includes('groepen | nictiz')">
                    <v-col cols=12>
                        <v-alert type="warning">
                            Geniet, maar map met mate. <i>©Michael Verbeek, 2020</i>
                        </v-alert>
                    </v-col>
                </v-row> -->
                <!-- Interface 1-N mapping -->
                <v-row no-gutters v-if="selectedProject && (selectedProject.type == '1')">
                    <v-col cols=3>
                        <v-row no-gutters>
                            <v-col cols=12>
                                <BackToProjects />
                                <TaskList />
                            </v-col>
                        </v-row>
                    </v-col>

                    
                    <v-col cols=5 v-if="selectedTask">
                        <v-row no-gutters>
                            <v-col cols=12>
                                <ReverseMappings />
                            </v-col>
                        </v-row>
                        <v-row no-gutters>
                            <v-col cols=12>
                                <Automap />
                            </v-col>
                        </v-row>
                        <v-row no-gutters>
                            <v-col cols=12>
                                <TaskDetails />
                            </v-col>
                        </v-row>
                        <v-row no-gutters>
                            <v-col cols=12>
                                <AuditList />
                            </v-col>
                        </v-row>
                        <v-row no-gutters>
                            <v-col cols=12>
                                <CommentsList />
                            </v-col>
                        </v-row>
                        <v-row no-gutters>
                            <v-col cols=12>
                                <CommentsForm />
                            </v-col>
                        </v-row>
                        <v-row no-gutters>
                            <v-col cols=12>
                                <Statuses />
                            </v-col>
                        </v-row>
                        <v-row no-gutters>
                            <v-col cols=12>
                                <Users />
                            </v-col>
                        </v-row>
                    </v-col>
                    
                    <v-col cols=4>
                        <v-row no-gutters>
                            <v-col cols=12>
                                <MappingEditor1N />
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>

                <!-- ECL - 1 mapping interface -->
                <v-row no-gutters v-if="selectedProject && (selectedProject.type == '4')">
                    <v-col cols=3>
                        <v-row no-gutters>
                            <v-col cols=12>
                                <BackToProjects />
                                <TaskList />
                            </v-col>
                        </v-row>
                    </v-col>

                    <v-col cols=5>
                        <v-row no-gutters>
                            <v-col cols=12>
                                <ResetTask />
                            </v-col>
                        </v-row>
                        <v-row no-gutters>
                            <v-col cols=12>
                                <ReverseMappings />
                            </v-col>
                        </v-row>
                        <v-row no-gutters>
                            <v-col cols=12>
                                <Automap />
                            </v-col>
                        </v-row>
                        <v-row no-gutters>
                            <v-col cols=12>
                                <MappingEditorECL1 />
                            </v-col>
                        </v-row>
                    </v-col>
                    
                    <v-col cols=4 v-if="selectedTask">
                        <v-row no-gutters>
                            <v-col cols=12>
                                <TaskDetails />
                            </v-col>
                        </v-row>
                        <v-row no-gutters>
                            <v-col cols=12>
                                <AuditList />
                            </v-col>
                        </v-row>
                        <v-row no-gutters>
                            <v-col cols=12>
                                <CommentsList />
                            </v-col>
                        </v-row>
                        <v-row no-gutters>
                            <v-col cols=12>
                                <CommentsForm />
                            </v-col>
                        </v-row>
                        <v-row no-gutters>
                            <v-col cols=12>
                                <Statuses />
                            </v-col>
                        </v-row>
                        <v-row no-gutters>
                            <v-col cols=12>
                                <Users />
                            </v-col>
                        </v-row>
                    </v-col>
                    
                </v-row>
            </v-col>
    </div>
</template>

<script>
import Automap from '@/components/Mapping/Automap';
import TaskList from '@/components/Mapping/TaskList';
import TaskDetails from '@/components/Mapping/TaskDetails';
import AuditList from '@/components/Mapping/AuditList';
import CommentsList from '@/components/Mapping/CommentsList';
import MappingEditor1N from '@/components/Mapping/MappingEditor1N';
import MappingEditorECL1 from '@/components/Mapping/MappingEditorECL1';
import Statuses from '@/components/Mapping/Statuses';
import Users from '@/components/Mapping/Users';
import BackToProjects from '@/components/Mapping/BackToProjects';
import CommentsForm from '@/components/Mapping/CommentsForm';
import ReverseMappings from '@/components/Mapping/ReverseMappings';
import ResetTask from '@/components/Mapping/ResetTask'

export default {
    components: {
        Automap,
        TaskList,
        CommentsList,
        CommentsForm,
        TaskDetails,
        BackToProjects,
        Statuses,
        Users,
        ReverseMappings,
        AuditList,
        MappingEditor1N,
        MappingEditorECL1,
        ResetTask,
    },
    created(){
        
        this.$store.dispatch('MappingTasks/getTasks', this.$route.params.projectid)
        if(this.$route.params.projectid){
            this.$store.dispatch('MappingProjects/getProjectDetails', this.$route.params.projectid)
            this.$store.dispatch('MappingProjects/getProjectStatuses',this.$route.params.projectid)
            this.$store.dispatch('MappingProjects/getProjectUsers',this.$route.params.projectid)
        }
        if(this.$route.params.taskid){
            this.$store.dispatch('MappingTasks/getAutomap', this.$route.params.taskid)
            this.$store.dispatch('MappingTasks/getTaskDetails', this.$route.params.taskid)
            this.$store.dispatch('MappingTasks/getComments', this.$route.params.taskid)
            this.$store.dispatch('MappingTasks/getReverse', this.$route.params.taskid)
            this.$store.dispatch('MappingTasks/getMappingTargets', this.$route.params.taskid)
            this.$store.dispatch('MappingAudits/getAudits', this.$route.params.taskid)
            this.$store.dispatch('MappingTasks/getReverseExclusions', this.$route.params.taskid)            
            this.$store.dispatch('MappingTasks/getRelatedTasks', this.$route.params.taskid)
        }
    },
    computed: {
        selectedTask(){
            return this.$store.state.MappingTasks.selectedTask
        },
        selectedProject(){
            return this.$store.state.MappingProjects.selectedProject
        },
        user(){
            return this.$store.state.userData
        }
    }
}
</script>