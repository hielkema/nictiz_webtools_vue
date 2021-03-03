<template>
    <div>
        <v-container
            v-if="user.groups.includes('mapping | access') && user.groups.includes('mapping | audit_popup')">
            <v-card>
                <v-toolbar
                    color="cyan darken-2"
                    dark
                    dense>
                    <v-toolbar-title>Quality assurance</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                    <v-chip
                        v-if="(audits_active.length > 0 || audits_whitelisted.length > 0 )"
                        class="ma-2"
                        color="red"
                        label
                        text-color="white"
                        @click="auditDetails = 'true'"
                        >
                        <v-icon left>
                            mdi-alert-box-outline
                        </v-icon>
                        <span v-if="audits_active.length >1">
                            {{audits_active.length}} QA waarschuwingen
                        </span>
                        <span v-if="audits_active.length == 1">
                            {{audits_active.length}} QA waarschuwing
                        </span>
                        <v-divider/>
                    </v-chip>
                    
                    <v-chip
                        v-if="audits_whitelisted.length > 0"
                        class="ma-2"
                        color="green"
                        label
                        text-color="white"
                        @click="auditDetails = 'true'"
                        >
                        <v-icon left>
                            mdi-alert-box-outline
                        </v-icon>
                        <span v-if="audits_whitelisted.length >1">
                            {{audits_whitelisted.length}} QA waarschuwingen met whitelist
                        </span>
                        <v-divider/>
                        <span v-if="audits_whitelisted.length == 1">
                            {{audits_whitelisted.length}} QA waarschuwing met whitelist
                        </span>
                        <v-divider/>
                    </v-chip>
                    <v-card-actions>
                        <v-btn 
                            v-if="(audits_active.length > 0 || audits_whitelisted.length > 0 )"
                            small @click="auditDetails = 'true'">Toon hits</v-btn>
                        <v-spacer/>
                        <v-btn small @click="triggerAudit(selectedTask.id)">Trigger audit</v-btn>
                        <v-btn small @click="getAudits(selectedTask.id)">Vernieuw QA hits</v-btn>
                    </v-card-actions>
                </v-card-text>
            </v-card>
        </v-container>
        <v-container 
            v-else
            fluid>
            <div
                v-if="user.groups.includes('mapping | access') && (audits_active.length > 0 || audits_whitelisted.length > 0 )" 
                style="max-height:400px; overflow:auto;">
                <v-alert 
                    border="left"
                    dense
                    color="red lighten-2"
                    type="error" v-for="hit in audits_active" :key="hit.id">
                        {{hit.reason}}<br>
                        <a @click="whitelistAudit(hit.id)" v-if="user.groups.includes('mapping | audit whitelist')">[whitelist]</a>
                        <a @click="removeAudit(hit.id)" v-if="user.groups.includes('mapping | audit whitelist')">[remove]</a>
                    </v-alert>

                <v-alert 
                    border="left"
                    dense
                    color="green lighten-2"
                    type="info" v-for="hit in audits_whitelisted" :key="hit.id">
                        Whitelisted | {{hit.reason}}<br>
                        <a @click="removeWhitelistAudit(hit.id)" v-if="user.groups.includes('mapping | audit whitelist')">[reset whitelist]</a>
                        <a @click="removeAudit(hit.id)" v-if="user.groups.includes('mapping | audit whitelist')">[remove]</a>
                    </v-alert>
            </div>
            <v-card>
                <v-card-actions>
                    <v-btn 
                        v-if="(audits_active.length > 0 || audits_whitelisted.length > 0 )"
                        small @click="auditDetails = 'true'">Toon hits</v-btn>
                    <v-spacer/>
                    <v-btn small @click="triggerAudit(selectedTask.id)">Trigger audit</v-btn>
                    <v-btn small @click="getAudits(selectedTask.id)">Vernieuw QA hits</v-btn>
                </v-card-actions>
                <v-card-title v-if="backgroundProcesses.active">
                    Actieve achtergrondprocessen
                    <v-spacer/>
                    <v-progress-circular
                        indeterminate
                        color="primary"
                        v-if="interval_process_check != null"
                        ></v-progress-circular>
                </v-card-title>
                <v-card-text v-if="backgroundProcesses.active">
                    <i v-if="interval_process_check != null"><strong>Herlaadt automatisch <small>[loop tracker ID: {{interval_process_check}}]</small></strong></i>
                    <ol>
                        <li v-for="(item, key) in backgroundProcesses.list" :key="key">
                            {{item.name}} <span v-if="item.args.length > 0">[{{item.args}}]</span> <span v-if="item.kwargs.length > 0">{{item.kwargs}}</span>
                        </li>
                    </ol>
                    
                </v-card-text>
            </v-card>
        </v-container>


        <!-- Modal for editing target -->
        <v-dialog v-model="auditDetails" max-width="2000px">
            <v-card>
                <v-card-title>
                    <span class="headline">Audit hits</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
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
                                            <template v-slot:item.reason="{ item }">
                                                <span style="white-space: pre;">
                                                    {{item.reason}}
                                                </span>
                                            </template>
                                            <template v-slot:item.acties="{ item }">
                                                <v-btn small @click="whitelistAudit(item.id)" v-if="user.groups.includes('mapping | audit whitelist')">Whitelist</v-btn>
                                                <v-btn small @click="removeAudit(item.id)" v-if="user.groups.includes('mapping | audit whitelist')">Remove</v-btn>
                                            </template>
                                            <template v-slot:item.timestamp="{ item }">
                                                {{Date(item.timestamp).toLocaleString()}}
                                            </template>
                                        </v-data-table>
                                    </v-card-text>
                                </v-card>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="auditDetails = false">Sluiten</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>


    </div>
</template>
<script>
export default {
    data() {
        return {
            auditDetails: false,
            search : '',
            headers: [
                { text: 'Project ID', value: 'project', align: ' d-none'  },
                { text: 'Type melding', value: 'type' },
                { text: 'Reden', value: 'reason' },
                { text: 'Whitelist', value: 'ignore' },
                { text: 'Sticky', value: 'sticky' },
                { text: '', value: 'acties' },
            ],
            pagination: {
                "items-per-page-options": [25,50,100,150]
            },
            filters: {
                user: [],
                status: [],
                ignore: [],
                type: [],
            },
            interval_process_check: null,
        }
    },
    methods: {
        whitelistAudit(id){
            this.$store.dispatch('MappingAudits/whitelist', id)
        },
        removeWhitelistAudit(id){
            this.$store.dispatch('MappingAudits/removeWhitelist', id)
        },
        removeAudit(id){
            this.$store.dispatch('MappingAudits/remove', id)
        },
        triggerAudit(id){
            this.$store.dispatch('MappingAudits/trigger', id)
            this.getAudits(id)
        },
        getAudits(id){
            this.$store.dispatch('MappingAudits/getAudits', id)
            this.$store.dispatch('MappingAudits/getBackgroundProcesses')
            this.pollProcesses()
        },
        columnValueList(val) {
           return this.hits.map(d => d[val]).sort()
        },
        pollProcesses () {
            clearInterval(this.interval_process_check)
            this.interval_process_check = setInterval(() => {
                console.log("Instantie van loop pollProcesses() begonnen.")

                if(this.backgroundProcesses.active == true){
                    this.$store.dispatch('MappingAudits/getBackgroundProcesses')
                }else{
                    // this.$store.dispatch('MappingAudits/getBackgroundProcesses')
                    clearInterval(this.interval_process_check)
                }
                console.log("Instantie van loop pollProcesses() klaar.")
            }, 4000)
        },
    },
    computed: {
        selectedTask(){
            return this.$store.state.MappingTasks.selectedTask
        },
        audits(){
            return this.$store.state.MappingAudits.audits
        },
        backgroundProcesses(){
            return this.$store.state.MappingAudits.backgroundProcesses
        },
        audits_active(){
            return this.audits.filter(function(item){
                return item.ignore == false
            })
        },
        audits_whitelisted(){
            return this.audits.filter(function(item){
                return item.ignore
            })
        },
        hits(){
            return this.$store.state.MappingAudits.audits
        },
        filteredHits() {
            return this.hits.filter(d => {
                return Object.keys(this.filters).every(f => {
                    return this.filters[f].length < 1 || this.filters[f].includes(d[f])
                })
            })
        },
        loading(){
            return this.$store.state.MappingAudits.loading
        },
        user(){
            return this.$store.state.userData
        }
    },
    mounted() {
        this.$store.dispatch('MappingAudits/getAudits',this.selectedTask.id)
        this.$store.dispatch('MappingAudits/getBackgroundProcesses')
        this.pollProcesses()
    }
}
</script>

