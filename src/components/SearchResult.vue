<template>
    <div class="transition duration-100 flex flex-row border-b-2 border-white hover:cursor-pointer hover:border-black py-2"
        v-for="coin in coins" :key="coin.id">
        <router-link :to="'/coin/' + coin.id">
            <div class="flex w-full">
                <img :src="coin.thumb" alt="icon" class="mr-3">
                {{coin.name}}
            </div>
        </router-link>
    </div>
</template>

<script>
export default {
    name: 'SearchResult',
    props: {
        coins: Object,
    }
}
</script>