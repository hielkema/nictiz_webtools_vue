<template>
    <div>
        <v-container v-if="user.groups.includes('mapping | access')">
            <v-row>
                <v-col cols=12>
                    <v-row>
                        <BackToProjectsSolo/>
                    </v-row>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols=12>
                    <v-card class="pa-1">
                        <v-card-title>
                            Audit hits
                        </v-card-title>   
                        <v-card-text>
                            <v-data-table
                                :headers="headers"
                                :items="hits"
                                :items-per-page="5"
                                :loading="loading"
                                class="elevation-2"
                                multi-sort
                                dense
                            >
                                <template v-slot:item.open="{ item }">
                                    <v-btn small color="blue lighten-2" v-on:click="selectTask(item.task, item.project)">Open</v-btn>
                                </template>
                            </v-data-table>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>
<script>
import BackToProjectsSolo from '@/components/Mapping/BackToProjectsSolo.vue'
export default {
    components: {
        BackToProjectsSolo,
    },
    data() {
        return {
            headers: [
                { text: '', value: 'open' },
                { text: 'Task ID', value: 'task' },
                { text: 'Project ID', value: 'project', align: ' d-none'  },
                { text: 'Reden', value: 'reason' },
                { text: 'Whitelist', value: 'ignore' },
                { text: 'timestamp', value: 'timestamp' },
            ]
        }
    },
    methods: {
        selectTask(taskid, projectid){
            this.$router.push({ path: `/mapping/Projects/${projectid}/Task/${taskid}` });
        }
    },
    computed: {
        hits(){
            return this.$store.state.MappingAudits.auditsPerProject
        },
        loading(){
            return this.$store.state.MappingAudits.loading
        },
        user(){
            return this.$store.state.userData
        }
    },
    created() {
        this.$store.commit('MappingAudits/resetAuditHitsByProject')
        this.$store.dispatch('MappingAudits/getAuditsByProject', this.$route.params.projectid)
    }
}
</script>

