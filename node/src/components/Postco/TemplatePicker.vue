<template>
    <v-container fluid>
        <v-card>
            <v-card-title>
                Templates (TemplatePicker.vue)
            </v-card-title>
            <v-card-text>
                <v-select v-model="selectedTemplate" return-object v-on:change="select()" :items="templates" item-text="title" item-value="id" label="Template"></v-select>
                <span v-if="selectedTemplate">
                    {{selectedTemplate.description}}
                </span>

            </v-card-text>
        </v-card>
    </v-container>
</template>
<script>
export default {
    data() {
        return {
            selectedTemplate: null,
        }
    },
    methods: {
        select () {
            this.$store.commit('Postco/setSelectedTemplate', this.selectedTemplate)
        },
    },
    computed: {
        user(){
            return this.$store.state.userData
        },
        templates(){
            return this.$store.state.Postco.templates
        },
    },
    mounted() {
    }
}
</script>

