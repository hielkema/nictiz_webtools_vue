<template>
    <div id="app" v-if="user.groups.includes('validation | access')">
        <v-container>
            <v-row>
                <v-col cols=3>
                    <TaskCounter />
                </v-col>
                <v-col cols=9>
                    <v-row>
                        <TaskDetails v-if="currentTask" />
                    </v-row>
                    <v-row>
                        <AnwerForm v-if="currentTask" />
                    </v-row>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import TaskCounter from '@/components/Validation/TaskCounter';
import AnwerForm from '@/components/Validation/AnwerForm_may2021';
import TaskDetails from '@/components/Validation/taskDetails';

export default {
    components: {
        TaskCounter,
        TaskDetails,
        AnwerForm,
    },
    computed: {
        user(){
            return this.$store.state.userData
        },
        currentTask(){
            return this.$store.state.Validation.currentTask
        }
    },
    mounted() {
        this.$store.dispatch('Validation/getTask')
    }
}
</script>