<template>
    <div>
        <v-container 
            v-if="user.groups.includes('mapping | access') && audits_active.length > 0"
            fluid
            >
                <v-alert 
                border="left"
                dense
                color="red lighten-2"
                type="error" v-for="hit in audits_active" :key="hit.id">
                    {{hit.reason}}
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

