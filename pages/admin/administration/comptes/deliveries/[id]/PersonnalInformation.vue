<template>
    <div>
        <DeliveryLayout>
            Informations personnelles ss
        </DeliveryLayout>
    </div>

</template>
<script setup>
import DeliveryLayout from './DeliveryLayout.vue';

const route = useRoute()
const title = ref('Details')

const id = route.params.id

</script>