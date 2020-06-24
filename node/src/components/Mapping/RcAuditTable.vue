<template>
    <div>
        <v-container v-if="user.groups.includes('mapping | rc_audit')">
            <v-row>
                <v-col cols=5>
                    <v-card class="pa-1">
                        <v-card-title>
                            Filters en zoeken
                        </v-card-title>   
                        <v-card-text>
                            <v-table dense>
                                <tbody>
                                <tr>
                                    <th 
                                    width=180
                                    align="left">
                                        Zoek binnen resultaten
                                    </th>
                                    <td>
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
                                    <th 
                                        v-if="filters.hasOwnProperty(header.value)"
                                        align="left">
                                    {{header.text}} 
                                    </th>
                                    <td v-if="filters.hasOwnProperty(header.value)" class="text-left">
                                    <v-select flat dense hide-details small multiple clearable :items="columnValueList(header.value)" v-model="filters[header.value]">     
                                    </v-select>
                                    </td>
                                </tr>
                                </tbody>
                            </v-table>
                        </v-card-text>
                    </v-card>
                </v-col>
                <v-col cols=7>
                    <v-card class="pa-1">   
                        <v-card-title>
                            Release candidate statistieken
                        </v-card-title>
                        <v-card-text>
                            <v-simple-table dense>
                                <tbody>
                                    <tr>
                                        <th>Titel release candidate</th>
                                        <td>{{RcRules.rc.title}}</td>
                                    </tr>
                                    <tr>
                                        <th>Aangemaakt</th>
                                        <td>{{RcRules.rc.created}}</td>
                                    </tr>
                                    <tr>
                                        <th>Status</th>
                                        <td>{{RcRules.rc.status}}</td>
                                    </tr>
                                    <tr>
                                        <th>Export klaar?</th>
                                        <td>
                                            <span v-if="RcRules.rc.finished">Ja</span>
                                            <span v-else>Nee, loopt nog of is mislukt</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Totaal aantal componenten in broncodestelsel</th>
                                        <td>{{RcRules.rc.stats.total_components}}</td>
                                    </tr>
                                    <tr>
                                        <th>Totaal aantal taken/componenten in development path</th>
                                        <td>{{RcRules.rc.stats.total_tasks}}</td>
                                    </tr>
                                    <tr>
                                        <th>Totaal aantal taken/componenten in release candidate</th>
                                        <td>{{RcRules.rc.stats.tasks_in_rc}}</td>
                                    </tr>
                                    <tr>
                                        <th>% componenten uit broncodestelsel in release candidate</th>
                                        <td>{{RcRules.rc.stats.perc_in_rc}}%</td>
                                    </tr>
                                    <tr>
                                        <th>Totaal aantal taken met >= 1 fiat</th>
                                        <td>{{RcRules.rc.stats.num_accepted}} / {{RcRules.rc.stats.tasks_in_rc}}</td>
                                    </tr>
                                    <tr>
                                        <th>Totaal aantal taken met >= 1 veto</th>
                                        <td>{{RcRules.rc.stats.num_rejected}} / {{RcRules.rc.stats.tasks_in_rc}}</td>
                                    </tr>
                                </tbody>
                            </v-simple-table>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        
            <v-row>
                <v-col cols=12>
                    <v-card>
                        <v-card-title>
                            Release candidate audit
                        </v-card-title>
                        <v-card-actions>
                            <v-btn v-on:click="refresh()">Ververs gehele tabel</v-btn><br>
                            <v-btn 
                                v-if="user.groups.includes('mapping | audit admin')"
                                v-on:click="createCacheSelectedRc()"
                                >Genereer een FHIR ConceptMap</v-btn><br>
                            <v-btn 
                                v-if="user.groups.includes('mapping | audit admin') && (RcRules.rc.status != 'Production')"
                                v-on:click="massPullChanges()"
                                >Mass pull changes (needs manual refresh) </v-btn>
                        </v-card-actions>
                        <v-card-text>
                            <v-alert type="info" v-if="!RcRules.rc.finished">
                                {{RcRules.rc.title}} [{{RcRules.rc.created}}] - {{RcRules.rc.status}}
                            </v-alert>
                            <v-alert type="error" v-if="!RcRules.rc.finished">
                                Let op: de export vanuit de development database loopt nog of is mislukt.
                            </v-alert>
                            <v-data-table
                                :headers="headers"
                                :items="filteredResults"
                                :items-per-page="15"
                                :search="search"
                                :loading="loading"
                                class="elevation-2"
                                sort-by="source.identifier"
                                multi-sort
                                dense
                            >
                                
                                <template v-slot:item.source.identifier="{ item }">
                                    
                                    <v-btn small color="primary lighten-2" :href="'?#/mapping/Projects/'+item.project_id+'/Task/'+item.task_id" target="_blank">{{item.source.identifier}}</v-btn>
                                    <!-- <v-btn small color="primary lighten-2" v-on="on" v-on:click="$router.push({ path: `/mapping/Projects/${item.project_id}/Task/${item.task_id}` })">{{item.source.identifier}}</v-btn>  -->
                                    
                                </template>

                                <template v-slot:item.source.title="{ item }">
                                    <v-tooltip right>
                                        <template v-slot:activator="{ on }">
                                            <v-btn color="primary" dark v-on="on" icon><v-icon right color="grey">mdi-information-outline</v-icon></v-btn>
                                        </template>
                                        <span>
                                            <table>
                                                <tr v-for="(value, key) in item.source.extra" :key="key">
                                                    <th align=left>{{ key }}</th>
                                                    <td v-if="key == 'Materialen'">
                                                        <li v-for="value in value" :key="value.SCTID">{{value.SCTID}} {{value.FSN}}</li>
                                                    </td>
                                                    <td v-else>{{ value }}</td>
                                                </tr>
                                            </table>
                                        </span>
                                    </v-tooltip>
                                    {{item.source.title}} 

                                </template>

                                <template v-slot:item.rules="{ item }">
                                    <!-- <ul v-for="rule in item.rules" v-bind:key="rule.rule_id">
                                        #{{rule.rule_id}} * G{{rule.mapgroup}} P{{rule.mappriority}} -> {{rule.target.title}} [{{rule.mapadvice}}]
                                    </ul> -->
                                    <table>
                                        <tr>
                                            <th width=10>Group</th><th width=10>Prio</th><th width=500>Target</th><th width=200>Correlation</th><th width=150>Advice</th>
                                        </tr>
                                        <tr v-for="rule in item.rules" v-bind:key="rule.rule_id">
                                            <td>{{rule.mapgroup}}</td>
                                            <td>{{rule.mappriority}}</td>
                                            <td>
                                                {{rule.target.identifier}} - {{rule.target.title}}
                                                <li v-for="rule in rule.mapspecifies" v-bind:key="rule.id"><!-- {{rule.id}} - -->{{rule.title}}</li>
                                            </td>
                                            <td width=10>{{rule.mapcorrelation}}</td>
                                            <td width=10>{{rule.mapadvice}}</td>
                                        </tr>
                                    </table>
                                </template>
                                <template v-slot:item.audit="{ item }">
                                    <v-chip
                                        class="ma-2"
                                        color="red"
                                        text-color="white"
                                        v-if="item.audit.length > 0">
                                        {{item.audit.length}}
                                    </v-chip>
                                </template>
                                <template v-slot:item.actions="{ item }">
                                    <v-tooltip bottom v-if="user.groups.includes('mapping | rc_audit')">
                                        <template v-slot:activator="{ on }">
                                            <v-btn small color="green lighten-2" v-on="on" v-on:click="postRuleReview(RcRules.rc.id, item.source.identifier, 'fiat', item.task_id)">Fiat <p v-if="item.num_accepted >0">{{item.num_accepted}}</p></v-btn> 
                                        </template>
                                        <span>{{item.accepted_list}}</span>
                                    </v-tooltip>
                                    <v-tooltip bottom v-if="user.groups.includes('mapping | rc_audit')">
                                        <template v-slot:activator="{ on }">
                                            <v-btn small color="red lighten-2" v-on="on" v-on:click="openDialog(RcRules.rc.id, item.source.identifier, item.task_id)">Veto <p v-if="item.num_rejected >0">{{item.num_rejected}}</p></v-btn> 
                                        </template>
                                        <span>{{item.rejected_list}}</span>
                                    </v-tooltip>
                                    <v-btn
                                        v-if="user.groups.includes('mapping | audit mass pull changes')"
                                        small v-on:click="pullRulesFromDev(item.source.codesystem.id, item.source.identifier)"
                                        >Pull</v-btn> 
                                </template>
                                <template v-slot:item.rejected="{ item }">
                                    <v-simple-checkbox v-model="item.rejected" disabled></v-simple-checkbox>
                                </template>
                                <template v-slot:item.accepted_me="{ item }">
                                    <v-simple-checkbox v-model="item.rejected" disabled></v-simple-checkbox>
                                </template>
                                <template v-slot:item.rejected_me="{ item }">
                                    <v-simple-checkbox v-model="item.rejected" disabled></v-simple-checkbox>
                                </template>
                            </v-data-table>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>

        <!-- Modal for editing target -->
        <v-dialog v-model="rejectCommentDialog" max-width="800px">
            <v-card>
                <v-card-title>
                    <span class="headline">Commentaar bij veto</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field
                                    label="Commentaar"
                                    required
                                    v-model="rejectCommentDialogData.comment"></v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-btn small color="red lighten-2" v-on:click="postRuleReview(rejectCommentDialogData.rc_id, rejectCommentDialogData.source_identifier, 'veto', rejectCommentDialogData.task_id)">Veto</v-btn> 
                    <v-btn small color="info lighten-2" v-on:click="rejectCommentDialog = false">Annuleer</v-btn> 
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>
<script>
export default {
    data() {
        return {
            headers: [
                { text: 'Code', value: 'source.identifier' },
                { text: 'Audit', value: 'audit' },
                { text: 'Audit hits', value: 'audit_present', align: ' d-none' },
                { text: 'Source', value: 'source.title' },
                { text: 'Groep', value: 'group' },
                // { text: 'Status', value: 'status' },
                { text: 'Rules', value: 'rules' },
                { text: 'Actions', value: 'actions' },
                { text: 'Rejected', value: 'rejected' },
                { text: 'Project', value: 'project', align: ' d-none' },
                { text: 'My fiat', value: 'accepted_me', align: ' d-none' },
                { text: 'My veto', value: 'rejected_me', align: ' d-none' },
                { text: 'Fiat Nictiz', value: 'accepted_nictiz', align: ' d-none' },
                { text: 'Fiat NHG', value: 'accepted_nhg', align: ' d-none' },
                { text: 'Fiat PALGA', value: 'accepted_palga', align: ' d-none' },
                { text: 'Fiat NVKC', value: 'accepted_nvkc', align: ' d-none' },
                { text: 'Fiat NVMM', value: 'accepted_nvmm', align: ' d-none' },
            ],
            search: '',
            groupBy: null,
            rejectCommentDialog: false,
            rejectCommentDialogData: {
                'rc_id': '',
                'source_identifier': '',
                'task_id': '',
                'comment': '',
            },
            filters: {
                project: [],
                group: [],
                rejected: [],
                status: [],
                audit_present: [],
                accepted_me: [],
                rejected_me: [],
                accepted_nictiz: [],
                accepted_nvmm: [],
                accepted_nvkc: [],
                accepted_nhg: [],
                accepted_palga: [],
            }
        }
    },
    methods: {
        refresh: function() {
            this.$store.dispatch('RcAuditConnection/getRcRules', this.selectedRc)
        },
        pullRulesFromDev: function(codesystem, component_id) {
            this.$store.dispatch('RcAuditConnection/pullRulesFromDev', {'codesystem':codesystem, 'component_id':component_id})
        },
        postRuleReview: function(rc_id, component_id, action, task_id) {
            if(action=='veto'){
                var payload = {
                    'comment' : '[Commentaar bij veto in Release Candidate audit]: '+this.rejectCommentDialogData.comment,
                    'taskId' : task_id,
                }
                this.$store.dispatch('MappingTasks/postComment', payload)
            }
            this.$store.dispatch('RcAuditConnection/postRuleReview', {'rc_id':rc_id, 'component_id':component_id, 'action': action, 'task_id':task_id})
            this.rejectCommentDialog = false
        },
        massPullChanges: function() {
            this.$store.dispatch('RcAuditConnection/massPullChanges')
        },
        columnValueList(val) {
           return this.$store.state.RcAuditConnection.RcRules.rules.map(d => d[val]).sort()
        },
        createCacheSelectedRc: function() {
            this.$store.dispatch('RcAuditConnection/createCacheSelectedRc', this.selectedRc)
        },
        openDialog(rc_id, source_identifier, task_id) {
            this.rejectCommentDialog = true
            this.rejectCommentDialogData = {
                'rc_id': rc_id,
                'source_identifier': source_identifier,
                'task_id': task_id,
            }
        }
    },
    computed: {
        RcRules(){
            return this.$store.state.RcAuditConnection.RcRules
        },
        loading(){
            return this.$store.state.RcAuditConnection.loading
        },
        selectedRc(){
            return this.$store.state.RcAuditConnection.selectedRc
        },
        searchResults(){
            return this.$store.state.MappingComments.results;
        },
        filteredResults() {
            return this.$store.state.RcAuditConnection.RcRules.rules.filter(d => {
                return Object.keys(this.filters).every(f => {
                    return this.filters[f].length < 1 || this.filters[f].includes(d[f])
                })
            })
        },
        groupByList(){
            const result = this.headers
            // result.push('Niet groeperen')
            return result
        },
        user(){
            return this.$store.state.userData
        }
    },
    created(){
        // this.$store.dispatch('RcAuditConnection/getRcRules', this.selectedRc)
    }
}
</script>

