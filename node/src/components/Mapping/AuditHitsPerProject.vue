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
                    <v-card>
                        <v-card-title>
                            Taken
                        </v-card-title>
                        <v-card-text>
                            <v-simple-table max-width="40">
                                <tbody>
                                    <tr>
                                        <td colspan=2>
                                            <v-text-field
                                                v-model="search"
                                                label="Zoek binnen resultaten"
                                                hide-details
                                                autofocus
                                                clearable
                                                dense></v-text-field>
                                        </td>
                                    </tr>
                                    <tr
                                        v-for="header in headers"
                                        :key="header.text">
                                        <td 
                                            v-if="filters.hasOwnProperty(header.value)"
                                            align="left">
                                        {{header.text}} 
                                        </td>
                                        <td v-if="filters.hasOwnProperty(header.value)" class="text-left">
                                            <v-select 
                                                flat 
                                                dense 
                                                hide-details 
                                                small 
                                                multiple 
                                                clearable 
                                                :items="columnValueList(header.value)" 
                                                v-model="filters[header.value]">     
                                            </v-select>
                                        </td>
                                    </tr>
                                </tbody>

                            </v-simple-table>
                        </v-card-text>
                    </v-card>
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
                                :footer-props="pagination" 
                                :items="filteredHits"
                                :items-per-page="50"
                                :loading="loading"
                                :search="search"
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
                { text: 'Gebruiker', value: 'user' },
                { text: 'Status', value: 'status' },
                { text: 'Whitelist', value: 'ignore' },
                { text: 'timestamp', value: 'timestamp' },
            ],
            pagination: {
                "items-per-page-options": [25,50,100,150]
            },
            filters: {
                user: [],
                status: [],
                ignore: [],
            }
        }
    },
    methods: {
        selectTask(taskid, projectid){
            this.$router.push({ path: `/mapping/Projects/${projectid}/Task/${taskid}` });
        },
        columnValueList(val) {
           return this.hits.map(d => d[val]).sort()
        },
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
        },
        filteredHits() {
            return this.hits.filter(d => {
                return Object.keys(this.filters).every(f => {
                    return this.filters[f].length < 1 || this.filters[f].includes(d[f])
                })
            })
        },
    },
    created() {
        this.$store.commit('MappingAudits/resetAuditHitsByProject')
        this.$store.dispatch('MappingAudits/getAuditsByProject', this.$route.params.projectid)
    }
}
</script>

