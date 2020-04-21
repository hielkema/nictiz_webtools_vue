<template>
    <v-container fluid>
        <v-card>
            <v-card-title>
                attributeDomain
            </v-card-title>
            <v-card-text>
                <v-text-field v-model="searchString" label="Domain"></v-text-field><br>
                <v-btn @click="search">Zoek</v-btn>
            </v-card-text>
        </v-card>
        
        <v-card>
            {{hover}}
        </v-card>

        <v-card>
            <v-card-text>
                <v-simple-table>
                    <template v-slot:default>
                        <thead>
                            <tr>
                                <th class="text-left">FSN</th>
                                <th class="text-left">Aantal</th>
                                <th class="text-left">Active</th>
                                <th class="text-left">effectiveTime</th>
                                <th class="text-left">domainId</th>
                                <th class="text-left">attributeCardinality</th>
                                <th class="text-left">attributeInGroupCardinality</th>
                                <th class="text-left">ruleStrength</th>
                                <th class="text-left">contentType</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, key) in results.items" :key="key">
                                <td>{{item.fsn.term}}</td>
                                <td>{{item.attributeDomain.length}}</td>
                                <td>{{item.attributeDomain[0].active}}</td>
                                <td>{{item.attributeDomain[0].effectiveTime}}</td>
                                <td>{{item.attributeDomain[0].domainId}}                <v-btn @click="lookup(item.attributeDomain[0].domainId)">Zoek</v-btn></td>
                                <td>{{item.attributeDomain[0].attributeCardinality.value}}</td>
                                <td>{{item.attributeDomain[0].attributeInGroupCardinality.value}}</td>
                                <td>{{item.attributeDomain[0].ruleStrength}}</td>
                                <td>{{item.attributeDomain[0].contentType}}</td>
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
        search () {
            this.$store.dispatch('Snowstorm/domainAttributes', this.searchString)
        },
        lookup (term) {
            this.$store.dispatch('Snowstorm/lookupFSN', term)
        }
    },
    computed: {
        user(){
            return this.$store.state.userData
        },
        results(){
            return this.$store.state.Snowstorm.results.domainAttributes
        },
        hover() {
            return this.$store.state.Snowstorm.results.lookupFsn.fsn.term
        }
    },
    mounted() {
    }
}
</script>

