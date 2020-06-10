<template>
    <div>
        <v-container 
            v-if="user.groups.includes('mapping | access')"
            tile>
            <v-card>
                <v-toolbar
                color="cyan"
                dark
                :loading="loading"
                dense>
                    <v-toolbar-title>Commentaren <v-btn @click="toggleEvents()" color="black" class="text-align-right" text>Toggle events</v-btn></v-toolbar-title>
                </v-toolbar>
                <v-list three-line
                    style="max-height:400px; max-width:100%"
                    class="overflow-y-auto overflow-x-auto">
                    <template v-for="item in comments">
                        <v-list-item
                        v-if="item.type == 'status_change' && showEvents == true"
                            dense
                            class="yellow lighten-4"
                            :key="item.id">
                            <v-list-item-content class="yellow lighten-5">
                                <v-list-item-title><v-icon>mdi-label-multiple-outline</v-icon> Statuswijziging (door {{item.action_user.name}})
                                    <v-tooltip right>
                                        <template v-slot:activator="{ on }">
                                            <v-btn color="primary" dark v-on="on" icon><v-icon right color="grey">mdi-information-outline</v-icon></v-btn>
                                        </template>
                                            <li v-for="(rule, key) in item.data" :key="key">
                                                {{key+1}}
                                                <table>
                                                    <thead>
                                                        <th>Variabele</th><th>Waarde</th>
                                                    </thead>
                                                    <tbody>
                                                        <tr v-for="(item, key) in rule" :key="key">
                                                            <td>{{key}}</td><td>{{item}}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </li>
                                    </v-tooltip>
                                
                                </v-list-item-title>
                                <v-list-item-subtitle>
                                    {{item.created}}
                                    

                                </v-list-item-subtitle>
                                {{item.text}}
                                
                            </v-list-item-content>
                        </v-list-item>
                        <v-list-item
                            v-else-if="item.type == 'comment'"
                            dense
                            class="white"
                            :key="item.id">
                            <v-list-item-content>
                                <v-list-item-title><v-icon>mdi-comment-text-outline</v-icon> Commentaar (door {{item.action_user.name}})</v-list-item-title>
                                <v-list-item-subtitle v-html="item.created"></v-list-item-subtitle>
                                {{item.text}}
                                <v-btn v-if="item.user.id == user.id" color="red lighten-3" @click="deleteComment(item.id)" small>Verwijderen</v-btn>
                            </v-list-item-content>
                        </v-list-item>
                        <v-list-item
                            v-else-if="item.type == 'user_change' && showEvents == true"
                            dense
                            class="yellow lighten-4"
                            :key="item.id">
                            <v-list-item-content class="yellow lighten-5">
                                <v-list-item-title><v-icon>mdi-account-arrow-right</v-icon> Toewijzing (door {{item.action_user.name}})</v-list-item-title>
                                <v-list-item-subtitle v-html="item.created"></v-list-item-subtitle>
                                {{item.text}}
                            </v-list-item-content>
                        </v-list-item>
                        
                        <v-divider :key="item.timestamp"></v-divider>
                    </template>
                </v-list>
            </v-card>
        </v-container>
    </div>
</template>
<script>
export default {
    data() {
        return {
            showEvents : false,
        }
    },
    methods: {
        deleteComment(id){
            this.$store.dispatch('MappingTasks/deleteComment', id)
        },
        toggleEvents(){
            if(this.showEvents == true){
                this.showEvents = false
            }else{
                this.showEvents = true
            }
        }
    },
    computed: {
        comments(){
            return this.$store.state.MappingTasks.selectedTaskComments
        },
        loading(){
            return this.$store.state.MappingTasks.loading.comments
        },
        user(){
            return this.$store.state.userData
        }
    },
    created() {
    }
}
</script>

