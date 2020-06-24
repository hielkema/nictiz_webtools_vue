<template>
    <div>
        <v-container 
            v-if="user.groups.includes('mapping | access') && (audits_active.length > 0 || audits_whitelisted.length > 0 )"
            fluid
            >
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
        </v-container>
    </div>
</template>
<script>
export default {
    data() {
        return {
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
    },
    computed: {
        selectedTask(){
            return this.$store.state.MappingTasks.selectedTask
        },
        audits(){
            return this.$store.state.MappingAudits.audits
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
        loading(){
            return this.$store.state.MappingAudits.loading
        },
        user(){
            return this.$store.state.userData
        }
    },
    mounted() {
        this.$store.dispatch('MappingAudits/getAudits',this.selectedTask.id)
    }
}
</script>

