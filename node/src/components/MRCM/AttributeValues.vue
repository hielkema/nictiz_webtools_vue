<template>
    <v-container fluid>
        <v-card>
            <v-card-title>
                attributeValues
            </v-card-title>
            <v-card-text>
                <v-text-field v-model="attributeId" label="Attribute"></v-text-field><br>
                <v-text-field v-model="termPrefix" label="Zoekterm"></v-text-field><br>
                <v-btn @click="search">Zoek</v-btn>
            </v-card-text>
        </v-card>
        
        <v-card>
            {{hover}}
        </v-card>

        <v-card>
            <v-card-text>
                NB: Maximaal 50!
                <v-simple-table>
                    <template v-slot:default>
                        <thead>
                            <tr>
                                <th class="text-left">FSN</th>
                                <th class="text-left">SCTID</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, key) in results.items" :key="key">
                            <!-- Loopen over items -->
                                <td>{{item.fsn.term}}</td>
                                <td>{{item.id}}</td>
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
            attributeId: '',
            termPrefix: '',
        }
    },
    methods: {
        search () {
            var payload = {
                'attributeId':  this.attributeId,
                'termPrefix':   this.termPrefix,
            }
            this.$store.dispatch('Snowstorm/attributeValues', payload)
        },
        lookup (term) {
            this.$store.dispatch('Snowstorm/lookupConcept', term)
        }
    },
    computed: {
        user(){
            return this.$store.state.userData
        },
        results(){
            return this.$store.state.Snowstorm.results.attributeValues
        },
        hover() {
            return this.$store.state.Snowstorm.results.lookupFsn.fsn.term
        }
    },
    mounted() {
    }
}
</script>

