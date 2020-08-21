<template>
    <v-container fluid>
        <v-card>
            <v-card-title>
                Statistieken
            </v-card-title>
            <v-card-text>
                Open taken: {{tasks.open.count}} <br/>
                Totaal: {{tasks.total.count}}
            </v-card-text>
        </v-card>
    </v-container>
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
        user(){
            return this.$store.state.userData
        },
        tasks(){
            return this.$store.state.Validation.taskStatistics
        }
    },
    mounted() {
        this.$store.dispatch('Validation/getTaskStatistics')
    }
}
</script>

