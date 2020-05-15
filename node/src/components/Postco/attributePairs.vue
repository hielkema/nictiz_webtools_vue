<template>
    <v-container fluid>
                <!-- Key: {{template.attributes[attributeKey]}}<br> -->
                <v-row dense>
                    <v-col cols=6 dense>
                        <v-text-field dense disabled :placeholder="template.attributes[attributeKey].sctid + ' ' + template.attributes[attributeKey].fsn" solo>
                            {{template.attributes[attributeKey].sctid}} |{{template.attributes[attributeKey].fsn}}|>
                        </v-text-field>
                        <!-- {{template.attributes[attributeKey]}} -->
                    </v-col>
                    <v-col cols=6 dense>
                        <v-select dense solo v-model="selectedValue" return-object v-on:change="set()" :items="template.attributes[attributeKey].attribute_values" item-text="fsn" item-value="stcid" label="Value"></v-select>
                        <!-- {{selectedValue}} -->
                    </v-col>     
                </v-row>          
    </v-container>
</template>
<script>
export default {
    data() {
        return {
            selectedValue: null,
            attributeKey: this.arrayKey,
        }
    },
    props: ['arrayKey'],
    methods: {
        set () {
            var payload = {
                'key' : this.attributeKey,
                'attribute' : {
                    'sctid': this.template.attributes[this.attributeKey].sctid,
                    'fsn': this.template.attributes[this.attributeKey].fsn,
                },
                'value' : {
                    'sctid': this.selectedValue.sctid,
                    'fsn' : this.selectedValue.fsn,
                }
            }
            this.$store.commit('Postco/setValue', payload)
        },
    },
    computed: {
        user(){
            return this.$store.state.userData
        },
        template(){
            return this.$store.state.Postco.selectedTemplate
        },
    },
    mounted() {
        var attribute = {
            'attribute': {
                'sctid': this.template.attributes[this.attributeKey].sctid,
                'fsn': this.template.attributes[this.attributeKey].fsn,
            },
            'type': 'attribute',
        }
        this.$store.commit('Postco/createAttribute', attribute)
    }
}
</script>

