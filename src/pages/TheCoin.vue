<template>
    <div class="flex flex-col pt-5 px-8">
        <the-header></the-header>
        <the-coin-card></the-coin-card>
    </div>
</template>

<script>
import TheCoinCard from '../components/TheCoinCard.vue'
import TheHeader from '../components/TheHeader.vue'
export default {
    components: {
        TheCoinCard,
        TheHeader
    }
}
</script>