<template>
    <v-container fluid>
        <v-card>
            <v-card-title>
                Vragen
            </v-card-title>
            <v-card-text>
                <v-form
                    ref="form"
                    v-model="valid"
                    :lazy-validation="lazy"
                    >


                    <!-- Is het item te valideren? -->
                    <v-checkbox
                            v-model="cannot_validate"
                            label="Ik kan de beschrijving niet valideren"
                        ></v-checkbox>
                    <strong v-if="cannot_validate"></strong>
                    <v-textarea
                            v-if="cannot_validate"
                            v-model="why_no_validate"
                            label="Waarom kan de beschrijving niet gevalideerd worden?"
                            :rules="[v => (cannot_validate && !!v) || 'Item is required']"
                            required
                        ></v-textarea>
                    <div v-if="!cannot_validate">
                        <!-- Zitten er fouten in de beschrijving? -->
                        <strong>Bevat de beschrijving fouten?</strong>
                        <v-radio-group 
                            v-model="errors" 
                            row
                            required
                            :rules="[v => ((cannot_validate) || !!v) || 'Item is required']"
                            >
                            <v-radio
                                key="1"
                                label="Ja"
                                value="1"
                            ></v-radio>
                            <v-radio
                                key="2"
                                label="Nee"
                                value="0"
                            ></v-radio>
                        </v-radio-group>
                        <v-text-field
                            v-if="errors == '1'"
                            v-model="what_errors"
                            label="Wat zijn de fouten in de beschrijving?"
                            :rules="[v => ((cannot_validate) || (errors && !!v)) || 'Item is required']"
                            required
                        ></v-text-field>

                        <!-- Compleet? -->
                        <strong>Hoe compleet is de beschrijving?</strong>
                        <v-radio-group 
                            v-model="complete" 
                            row
                            required
                            :rules="[v => ((cannot_validate) || (!!v)) || 'Item is required']"
                            >
                            <v-radio key="1" label="1" value="1"></v-radio>
                            <v-radio key="2" label="2" value="2"></v-radio>
                            <v-radio key="3" label="3" value="3"></v-radio>
                            <v-radio key="4" label="4" value="4"></v-radio>
                            <v-radio key="5" label="5" value="5"></v-radio>
                        </v-radio-group>

                        <!-- Relevant? -->
                        <strong>Hoe relevant is de beschrijving?</strong>
                        <v-radio-group 
                            v-model="relevance" 
                            row
                            required
                            :rules="[v => ((cannot_validate) || (!!v)) || 'Item is required']"
                            >
                            <v-radio key="1" label="1" value="1"></v-radio>
                            <v-radio key="2" label="2" value="2"></v-radio>
                            <v-radio key="3" label="3" value="3"></v-radio>
                            <v-radio key="4" label="4" value="4"></v-radio>
                            <v-radio key="5" label="5" value="5"></v-radio>
                        </v-radio-group>

                        <!-- Duidelijk? -->
                        <strong>Hoe duidelijk is de beschrijving?</strong>
                        <v-radio-group 
                            v-model="clarity" 
                            row
                            required
                            :rules="[v => ((cannot_validate) || (!!v)) || 'Item is required']"
                            >
                            <v-radio key="1" label="1" value="1"></v-radio>
                            <v-radio key="2" label="2" value="2"></v-radio>
                            <v-radio key="3" label="3" value="3"></v-radio>
                            <v-radio key="4" label="4" value="4"></v-radio>
                            <v-radio key="5" label="5" value="5"></v-radio>
                        </v-radio-group>

                        <!-- Acceptabel? -->
                        <strong>Is de beschrijving acceptabel?</strong>
                        <v-radio-group 
                            v-model="acceptable" 
                            row
                            required
                            :rules="[v => ((cannot_validate) || (!!v)) || 'Item is required']"
                            >
                            <v-radio key="1" label="Ja" value="1"></v-radio>
                            <v-radio key="2" label="Nee" value="0"></v-radio>
                        </v-radio-group>


                        <!-- Feedback -->
                        <v-textarea
                            v-model="feedback"
                            label="Feedback"
                            cols = 100
                        ></v-textarea>

                    </div>

                    <br><br>

                    <v-btn
                            :disabled="!valid"
                            color="success"
                            class="mr-4"
                            @click="saveForm"
                        >
                            Opslaan en volgende taak
                        </v-btn>

                    <!-- <v-btn
                            color="error"
                            class="mr-4"
                            @click="reset"
                        >
                            Reset Formulier
                        </v-btn> -->
                </v-form>
            </v-card-text>
        </v-card>
    </v-container>
</template>
<script>
export default {
    data: () => ({
        // Form fields
        cannot_validate: 0,
        why_no_validate : '',
        errors: 0,
        what_errors: '',
        clarity: false,
        relevance: false,
        acceptable: 0,
        complete: false,
        feedback: '',
    
        // Form validation
        valid: true,
        lazy: false,

    }),
    methods: {
        validate () {
            this.$refs.form.validate()
        },
        reset () {
            this.$refs.form.reset()
        },
        saveForm () {
            var payload = {
                'taskId' : this.currentTask.id,
                'taskData' : this.currentTask,

                'cannot_validate' : this.cannot_validate,
                'why_no_validate' : this.why_no_validate,
                'errors' : this.errors,
                'what_errors' : this.what_errors,
                'clarity' : this.clarity,
                'relevance' : this.relevance,
                'acceptable' : this.acceptable,
                'complete' : this.complete,
                'feedback' : this.feedback,
            }
            this.$store.dispatch('Validation/sendForm', payload)
            this.why_no_validate = ''
            this.what_errors = ''
            this.$refs.form.reset()
        }
    },
    computed: {
        user(){
            return this.$store.state.userData
        },
        tasks(){
            return this.$store.state.Validation.taskStatistics
        },
        currentTask(){
            return this.$store.state.Validation.currentTask
        }
    },
    mounted() {
        this.$store.dispatch('Validation/getTask')
    }
}
</script>

