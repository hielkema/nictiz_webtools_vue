<template>
    <div id="app" v-if="user.groups.includes('dhd | demo integratie')">
        <IntegratedCodePicker />
    </div>
</template>

<script>
import IntegratedCodePicker from '@/components/DHD/IntegratedCodePicker';

export default {
    components: {
        IntegratedCodePicker,
    }
}
</script>