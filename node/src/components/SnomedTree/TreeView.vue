<template>
    <v-container fluid>
        <v-row dense>
            <v-col cols=12 dense>
                <b>Status</b>:<br>
                
                <i>dispatched: Tree bestond nog niet, taak is gestart. Zoek opnieuw om de status te zien.<br>
                error: nonexistant SCTID: Snomed concept bestaat niet in de mapping database<br>
                running: Export draait nog<br>
                loaded: Tree is klaar en geladen<br></i>

                <b>Status</b>: {{data.message}}<br>
                <b>Geselecteerde concepten</b>: {{selected}}<br>
                <hr>

                <v-text-field v-model="filterInResults" label="Filter in resultaten"></v-text-field>

                <v-treeview
                    shaped
                    dense
                    hoverable
                    selectable
                    selection-type="independent"
                    open-on-click
                    v-model="selected"
                    :search="filterInResults"
                    :items="data.data"
                >
                    <template v-slot:label="{item}">
                        {{item.component_id}} |{{item.name}}|<br>
                    </template>
                    
                    <template v-slot:append="{item}">
                        <span v-for="(item, key) in item.refsets" :key="key">
                            {{item}} / 
                        </span>
                    </template>
                </v-treeview>

            </v-col> 
        </v-row>          
    </v-container>
</template>
<script>
export default {
    data() {
        return {
            selected:[],
            filterInResults: '',
        }
    },
    methods: {
        set () {
        },
    },
    computed: {
        user(){
            return this.$store.state.userData
        },
        data(){
            return this.$store.state.TreeView.treeData
        },
    },
    mounted() {
    }
}
</script>

