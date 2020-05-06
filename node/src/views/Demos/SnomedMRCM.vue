<template>
    <div id="app">
        <v-container>
            <v-card>
                <v-card-title>
                    Framework (SnomedMRCM.vue)
                </v-card-title>
                <v-card-text>
                    <v-text-field v-model="searchString" label="Domain"></v-text-field><br>
                    <v-btn @click="search(searchString)">Zoek</v-btn>
                </v-card-text>
            </v-card>

            <v-card>
                <v-card-text>
                    <v-row>
                        <v-col cols=6>
                            <RootConcept/>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols=6>
                            <MRCMDomainAttributes/>
                        </v-col>
                        <v-col cols=6>
                            <MRCMAttributeValues/>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-container>
    </div>
</template>

<script>
import RootConcept from '@/components/MRCM/components/Root';
// import MRCMPostCoFrame from '@/components/MRCM/postCoFrame';
import MRCMDomainAttributes from '@/components/MRCM/components/Domain';
import MRCMAttributeValues from '@/components/MRCM/components/Value';

export default {
    data() {
        return{
            searchString: '',
        }
    },
    methods: {
        search () {
            this.$store.dispatch('MRCM/getDomainAttributes', this.searchString)
            this.$store.dispatch('MRCM/lookupConcept', this.searchString)
        },
    },
    components: {
        // MRCMPostCoFrame,
        RootConcept,
        MRCMDomainAttributes,
        MRCMAttributeValues,
    },
    computed: {
        root() {
            return this.$store.state.MRCM.rootConcept
        },
        attributes(){
            return this.$store.state.MRCM.attributes
        },
        values(){
            return this.$store.state.MRCM.values
        }
    },
}
</script>