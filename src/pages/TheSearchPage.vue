<template>
    <div class="flex flex-col pt-5 px-8">
        <the-header></the-header>
        <the-search></the-search>
    </div>
</template>

<script>
import TheSearch from '../components/TheSearch.vue'
import TheHeader from '../components/TheHeader.vue'
export default {
    components: {
        TheSearch,
        TheHeader
    },
    mounted() {
    }
}
</script>