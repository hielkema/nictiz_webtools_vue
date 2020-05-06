<template>
    <v-container>
        <v-card>
            <v-card-title>
                AttributeValues (Value.vue)
            </v-card-title>
            <v-card-text>
                {{selectedDomain}}<br>
                <v-text-field v-model="searchString" label="TermPrefix"></v-text-field><br>
                <v-btn @click="search(searchString)">Zoek</v-btn>
            </v-card-text>
        </v-card>

        <v-card
        :loading = "loading">
            <v-card-title>
                AttributeValues Results (Value.vue)
            </v-card-title>
            <v-card-text>
                <v-simple-table>
                    <template v-slot:default>
                        <thead>
                            <tr>
                                <th class="text-left">SCTID</th>
                                <th class="text-left">FSN</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, key) in AttributeValues.items" :key="key">
                            <!-- Loopen over items -->
                                <!-- <td>{{item}}</td> -->
                                <td>{{item.id}}</td>
                                <td>{{item.fsn.term}}</td>
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
    data() {
        return {
            searchString: ''
        }
    },
    methods: {
        search (string) {
            var payload = {
                'termPrefix' : string,
                'attributeId' : this.selectedDomain,
            }
            this.$store.dispatch('MRCM/getAttributeValues', payload)
        },
    },
    computed: {
        AttributeValues(){
            return this.$store.state.MRCM.results.attributeValues   
        },
        selectedDomain(){
            return this.$store.state.MRCM.results.selectedDomain
        },
        loading(){
            return this.$store.state.MRCM.loading.attributeValues
        },
    },
    mounted() {
    }
}
</script>

