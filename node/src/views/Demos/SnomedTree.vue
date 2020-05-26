<template>
    <div id="app">
        <v-container>
            <v-card>
                <v-card-title>
                    Framework (SnomedTree.vue)
                </v-card-title>
                <v-card-text>
                    <v-text-field v-model="searchString" label="Root concept"></v-text-field><br>
                    <v-btn @click="search(searchString)">Zoek</v-btn>
                </v-card-text>
            </v-card>
            
            <v-card>
                <v-card-text>
                    <v-row>
                        <v-col cols=12 v-if="!loading.tree">
                            <TreeView/>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-container>
    </div>
</template>

<script>
import TreeView from '@/components/SnomedTree/TreeView';

export default {
    data() {
        return{
            searchString: '',
        }
    },
    methods: {
        search () {
            this.$store.dispatch('TreeView/getTreeData', this.searchString)
        },
    },
    components: {
        TreeView,
    },
    computed: {
        loading() {
            return this.$store.state.TreeView.loading
        },
    },
}
</script>