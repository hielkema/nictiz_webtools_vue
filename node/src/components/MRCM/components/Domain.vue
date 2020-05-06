<template>
    <v-container>
        <v-card
        :loading="loading">
            <v-card-title>
                DomainAttributes (Domain.vue)
            </v-card-title>
            <v-card-text>
                <v-simple-table>
                    <template v-slot:default>
                        <thead>
                            <tr>
                                <th class="text-left">FSN</th>
                                <th class="text-left">SCTID</th>
                                <th class="text-left">Aantal</th>
                                <th class="text-left">Active</th>
                                <!-- <th class="text-left">effectiveTime</th> -->
                                <th class="text-left">domainId</th>
                                <th class="text-left">attributeCardinality</th>
                                <th class="text-left">attributeInGroupCardinality</th>
                                <!-- <th class="text-left">ruleStrength</th> -->
                                <!-- <th class="text-left">contentType</th> -->
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, key) in attributes.items" :key="key">
                            <!-- Loopen over items -->
                                <td><v-btn @click="setDomain(item.id)">{{item.fsn.term}}</v-btn></td>
                                <td>({{item.id}})</td>
                                <td>{{item.attributeDomain.length}}</td>
                                <td>{{item.attributeDomain[0].active}}</td>
                                <!-- <td>{{item.attributeDomain[0].effectiveTime}}</td> -->
                                <td>{{item.attributeDomain[0].domainId}}</td>
                                <td>{{item.attributeDomain[0].attributeCardinality.value}}</td>
                                <td>{{item.attributeDomain[0].attributeInGroupCardinality.value}}</td>
                                <!-- <td>{{item.attributeDomain[0].ruleStrength}}</td> -->
                                <!-- <td>{{item.attributeDomain[0].contentType}}</td> -->
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
        // lookupValues (id) {
        //     this.$store.dispatch('MRCM/getAttributeValues', id)
        // },
        setDomain(id){
            this.$store.commit('MRCM/setDomain', id)
        }
    },
    computed: {
        attributes(){
            return this.$store.state.MRCM.results.domainAttributes
        },
        loading(){
            return this.$store.state.MRCM.loading.domainAttributes
        },
    },
    mounted() {
    }
}
</script>

