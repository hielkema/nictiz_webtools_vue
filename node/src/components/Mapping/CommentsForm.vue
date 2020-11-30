<template>
        <form>
            <v-container fluid v-if="user.groups.includes('mapping | place comments')">
                <v-card>
                    <v-toolbar
                        color="cyan"
                        dark
                        dense>
                        <v-toolbar-title>Nieuw commentaar</v-toolbar-title>
                    </v-toolbar>
                    <v-textarea
                        class="pa-1"
                        v-model="comment"
                        rows="3"
                        label="Commentaar"
                        @change="saveDraft()"
                        ></v-textarea>
                    <v-btn @click="submitcomment" color="primary lighten-3" text>Opslaan</v-btn>
                    <Tags />
                </v-card>
            </v-container>
        </form>
</template>
<script>
import Tags from '@/components/Mapping/Tags';

export default {
    components: {
        Tags,
    },
    data() {
        return {
            comment: this.commentStore,
        }
    },
    methods: {
        submitcomment () {
            var payload = {
                'comment' : this.comment,
                'taskId' : this.task.id,
            }
            this.$store.dispatch('MappingTasks/postComment', payload)
            this.$store.dispatch('MappingTasks/saveDraftComment', '')
            this.comment = ''
        },
        saveDraft () {
            this.$store.dispatch('MappingTasks/saveDraftComment', this.comment)
        },
    },
    computed: {
        task(){
            return this.$store.state.MappingTasks.selectedTask
        },
        commentStore(){
            return this.$store.state.MappingTasks.commentDraft
        },
        loading(){
            return this.$store.state.MappingTasks.loading.comments
        },
        user(){
            return this.$store.state.userData
        }
    },
    created() {
    }
}
</script>

 