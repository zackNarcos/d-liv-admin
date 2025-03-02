<template>
    <div>
        <Piece /> 
    </div>

</template>
<script setup>
import Piece from './piece.vue';

const route = useRoute()
const title = ref('Details')

const id = route.params.id

</script>