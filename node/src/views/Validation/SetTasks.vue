<template>
    <div id="app" v-if="user.groups.includes('validation | admin')">
        <v-container>
            <v-row>
                <v-col cols=3>
                    <v-card>
                        <v-card-title>
                            Gebruikers met taken
                        </v-card-title>
                        <v-card-text>
                            <li v-for="(user,key) in userStats" v-bind:key="key">
                                {{user.username}} [{{user.task_count}}]
                            </li>
                        </v-card-text>
                    </v-card>
                </v-col>
                <v-col cols=9>
                    <v-card>
                        <v-card-title>
                            Beheer
                        </v-card-title>
                        <v-card-text>
                            <v-form>
                                <v-row>
                                    <v-select
                                        v-model="selectedUser"
                                        :items="userList"
                                        label="Gebruiker"
                                        item-text="username"
                                        item-value="id">
                                    </v-select>
                                </v-row>
                                <v-row>
                                    <v-textarea
                                        v-model="tasks"
                                        label="SortId's van taken. 1 per rij.">
                                    </v-textarea>
                                </v-row>
                                <v-row>
                                    <v-btn
                                        color="success"
                                        class="mr-4"
                                        @click="addAccess"
                                    >
                                        Toegang geven tot taken
                                    </v-btn>
                                    <v-btn
                                        color="warning"
                                        class="mr-4"
                                        @click="removeAccess"
                                    >
                                        Toegang verwijderen
                                    </v-btn>
                                </v-row>
                            </v-form>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>

export default {
    data () {
        return {
            selectedUser: null,
            tasks: null,
        }
    },
    methods: {
        addAccess () {
            var payload = {
                'action' : 'add',
                'user' : this.selectedUser,
                'tasks' : this.tasks,
            }
            this.$store.dispatch('Validation/createTasks', payload)
        },
        removeAccess () {
            var payload = {
                'action' : 'remove',
                'user' : this.selectedUser,
                'tasks' : this.tasks,
            }
            this.$store.dispatch('Validation/createTasks', payload)
        }
    },
    components: {
    },
    computed: {
        user(){
            return this.$store.state.userData
        },
        userList(){
            return this.$store.state.Validation.users
        },
        userStats(){
            return this.$store.state.Validation.userStats
        },
    },
    mounted() {
        this.$store.dispatch('Validation/getUsers')
        this.$store.dispatch('Validation/getUserStats')
    }
}
</script>