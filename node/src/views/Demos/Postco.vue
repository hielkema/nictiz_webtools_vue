<template>
    <div id="app">
        <v-container>
            <v-card>
                <v-card-title>
                    View (Postco.vue)
                </v-card-title>
                <v-card-text>
                    <TemplatePicker/>
                </v-card-text>
            </v-card>

            
            <v-card>
                <v-card-text>
                    <v-row>
                        <v-col cols=12>
                            Onderdelen postcoordinatie:<br>
                            Root:<br><li>{{selectedTemplate.root_concept.sctid}} |{{selectedTemplate.root_concept.fsn}}|</li><br>
                            Attributes:<br>
                            <li v-for="(value,key) in result" :key="key">
                                {{value.attribute.sctid}} |{{value.attribute.fsn}}| => {{value.value.sctid}} |{{value.value.fsn}}|
                            </li>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols=12>
                            <v-btn v-on:click="getExpression()">Expression:</v-btn><br>
                            <!-- {{expression}} -->
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
            <v-card>
                <v-card-text>
                    <v-row dense v-for="(value, key) in selectedTemplate.attributes" v-bind:key="key">
                        <v-col cols=12>
                            <!-- KEY={{key}} -->
                            <attributeValuePair v-bind:arrayKey="key"/>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>

        </v-container>
    </div>
</template>

<script>
import TemplatePicker from '@/components/Postco/TemplatePicker';
import attributeValuePair from '@/components/Postco/attributePairs';

export default {
    data() {
        return{
            searchString: '',
            postcoData: null,
        }
    },
    methods: {
        update() {
            console.log(this.$store.state.Postco.postcoResult)
            this.$forceUpdate()
        },
        getExpression() {
            this.$store.dispatch('Postco/getExpression')
        }
    },
    components: {
        TemplatePicker,
        attributeValuePair,
    },
    computed: {
        selectedTemplate() {
            return this.$store.state.Postco.selectedTemplate
        },
        result(){
            return this.$store.state.Postco.postcoComponents
        },
    },
    mounted() {
        this.$store.dispatch('Postco/getTemplates')
    }
}
</script>