<template>
    <div v-if="user.groups.includes('mapping | place comments')">
        <span v-for="tag in tags" :key="tag.id">
            <v-btn class="ma-1 pa-1" @click="submitcomment(tag)" >#{{tag}}</v-btn>
        </span>
    </div>
</template>
<script>
export default {
    data() {
        return {
        }
    },
    methods: {
        submitcomment (tag) {
            var payload = {
                'comment' : '#'+tag,
                'taskId' : this.task.id,
            }
            this.$store.dispatch('MappingTasks/postComment', payload)
        },
    },
    computed: {
        task(){
            return this.$store.state.MappingTasks.selectedTask
        },
        tags(){
            return this.$store.state.MappingProjects.selectedProject.tags
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

