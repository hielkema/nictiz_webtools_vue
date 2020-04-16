<template>
    <div id="app">
        <ProjectTable/>
        <ProjectDetails v-if="selectedProject"/>
    </div>
</template>

<script>
import ProjectTable from '@/components/Mapping/ProjectTable';
import ProjectDetails from '@/components/Mapping/ProjectDetails';

export default {
    components: {
        ProjectTable,
        ProjectDetails,
    },
    created(){
        this.$store.dispatch('MappingProjects/getProjects')
    },
    computed: {
        selectedProject(){
            return this.$store.state.MappingProjects.selectedProject
        },
    }
}
</script>