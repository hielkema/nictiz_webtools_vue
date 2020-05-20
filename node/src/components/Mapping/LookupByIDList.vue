<template>
    <div>
        <v-container v-if="user.groups.includes('mapping | access')">
            <v-row>
                <v-col cols=12>
                    <v-row>
                        <v-textarea
                            v-model="lookupList"
                            label="Zoek binnen resultaten"
                            hide-details
                            autofocus
                            clearable
                            dense></v-textarea>
                            <v-btn small color="blue lighten-2" v-on:click="fetch()">Zoek</v-btn>
                    </v-row>
                </v-col>
            </v-row>
            <!-- <v-row>
                <v-col cols=12>
                    <v-card>
                        <v-card-title>
                            Filters
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
                                    <tr>
                                        <th>
                                        Group by
                                        </th>
                                        <td>
                                            <v-select flat dense hide-details small :items="groupByList" v-model="groupByList">
                                            </v-select>
                                        </td>
                                    </tr>
                                </tbody>
                            </v-simple-table>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row> -->
            
            <v-row>
                <v-col cols=12>
                    <v-card class="pa-1">
                        <v-card-title>
                            Regels
                        </v-card-title>   
                        <v-card-text>
                            <v-data-table
                                :footer-props="pagination" 
                                :headers="headers"
                                :items="filteredHits"
                                :items-per-page="5"
                                :loading="loading"
                                class="elevation-2"
                                multi-sort
                                dense
                            >
                            <template v-slot:item.targets="{ item }">
                                    <table>
                                        <tr>
                                            <th width=10>ID</th><th width=10>Titel</th><th width=500>Group</th><th width=200>Priority</th><th width=150>Correlation</th><th width=150>Advice</th>
                                        </tr>
                                        <tr v-for="(rule,key) in item.targets" v-bind:key="key">
                                            <td>{{rule.id}}</td>
                                            <td>{{rule.title}}</td>
                                            <td>{{rule.group}}</td>
                                            <td>{{rule.priority}}</td>
                                            <td>{{rule.correlation}}</td>
                                            <td>{{rule.advice}}</td>
                                        </tr>
                                    </table>
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
export default {
    components: {
    },
    data() {
        return {
            headers: [
                { text: 'Error', value: 'error' },
                { text: 'Project', value: 'project' },
                { text: 'Task', value: 'task' },
                { text: 'Status', value: 'status' },
                { text: 'Bron codesystem', value: 'source.codesystem' },
                { text: 'Bron ID', value: 'source.id' },
                { text: 'Bron titel', value: 'source.title' },
                { text: 'Targets', value: 'targets' },
            ],
            filters: {
                error: [],
            },
            lookupList: '74400008',
            groupByList: ['source_ident', 'target_ident'],
            groupBy: [],
            pagination: {
                "items-per-page-options": [10,25,50]
            },
            search: '',
        }
    },
    methods: {
        fetch(){
            this.$store.dispatch('MappingLookup/listLookup', this.lookupList)
        },
        columnValueList(val) {
           return this.hits.map(d => d[val]).sort()
        },
    },
    computed: {
        hits(){
            return this.$store.state.MappingLookup.results
        },
        loading(){
            return this.$store.state.MappingLookup.loading
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
    }
}
</script>