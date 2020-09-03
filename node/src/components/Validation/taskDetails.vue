<template>
    <v-container fluid>
        <v-card>
            <v-card-title>
                Details huidige taak
            </v-card-title>
            <v-card-text>
                <v-simple-table>
                    <template v-slot:default>
                        <tbody>
                            <tr>
                                <th>SortIndex</th>
                                <td>{{currentTask.data.sortIndex}}</td>
                            </tr>
                            <tr>
                                <th>Term</th>
                                <td>{{currentTask.data.preferredTerm}}</td>
                            </tr>
                            <tr>
                                <th>Beschrijving</th>
                                <td>{{currentTask.data.text}}</td>
                            </tr>
                        </tbody>
                    </template>
                </v-simple-table>
            </v-card-text>
        </v-card>
    </v-container>
</template>
<script>
export default {
    data: () => ({

    }),
    methods: {
    },
    computed: {
        user(){
            return this.$store.state.userData
        },
        tasks(){
            return this.$store.state.Validation.taskStatistics
        },
        currentTask(){
            return this.$store.state.Validation.currentTask
        }
    },
    // mounted() {
    //     this.$store.dispatch('Validation/getTask')
    // }
}
</script>

