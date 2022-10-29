<template>
    <div v-if="!loading" class="overflow-x-scroll overflow-y-visible p-0 font-bold text-lg border-4 mt-4 px-10 border-black">
        <table  class="border-spacing-3 border-collapse w-full mt-4">
            <tbody class="sm:table-row-group inline-block">
                <tr class="font-bold">
                    <td class="hover:text-blue-900 cursor-pointer select-none" width="3%"
                        @click="sortBy('market_cap_rank')">
                        <span>#</span>
                        <svg v-if="sortby == 'market_cap_rank'" xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4 inline"
                            :class="{'rotate-180': !reverse}">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" />
                        </svg>

                    </td>
                    <td class="hover:text-blue-900 cursor-pointer select-none" width="25%" @click="sortBy('symbol')">
                        <span>ASSET</span>
                        <svg v-if="sortby == 'symbol'" xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4 inline"
                            :class="{'rotate-180': !reverse}">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" />
                        </svg>
                    </td>
                    <td class="hover:text-blue-900 cursor-pointer select-none" @click="sortBy('current_price')">
                        <span>PRICE</span>
                        <svg v-if="sortby == 'current_price'" xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4 inline"
                            :class="{'rotate-180': !reverse}">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" />
                        </svg>
                    </td>
                    <td class="hover:text-blue-900 cursor-pointer select-none"
                        @click="sortBy('price_change_percentage_24h')">
                        <span>24H %</span>
                        <svg v-if="sortby == 'price_change_percentage_24h'" xmlns="http://www.w3.org/2000/svg"
                            fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
                            class="w-4 h-4 inline" :class="{'rotate-180': !reverse}">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" />
                        </svg>
                    </td>
                    <td class="hover:text-blue-900 cursor-pointer select-none"
                        @click="sortBy('price_change_percentage_7d_in_currency')">
                        <span>7D %</span>
                        <svg v-if="sortby == 'price_change_percentage_7d_in_currency'"
                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                            stroke="currentColor" class="w-4 h-4 inline" :class="{'rotate-180': !reverse}">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" />
                        </svg>
                    </td>
                    <td class="hover:text-blue-900 cursor-pointer select-none" @click="sortBy('market_cap')"
                        width="10%">
                        <span>MARKET CAP</span>
                        <svg v-if="sortby == 'market_cap'" xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4 inline"
                            :class="{'rotate-180': !reverse}">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" />
                        </svg>
                    </td>
                </tr>
                <the-row v-for="coin in allCoins" :key="coin.id" :num="coin.market_cap_rank" :icon="coin.image"
                    :ticker="coin.symbol.toUpperCase()" :name="coin.name" :price="coin.current_price"
                    :tfh="Math.round(coin.price_change_percentage_24h * 100)/100"
                    :sd="Math.round(coin.price_change_percentage_7d_in_currency * 100)/100"
                    :cap="Intl.NumberFormat('en', { notation: 'compact' }).format(coin.market_cap)" :id="coin.id"/>
            </tbody>
        </table>

    </div>
    <div v-if="loading" class="flex flex-row align-middle items-center justify-center mt-16">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor"
            class="animate-spin w-16 h-16 text-black">
            <path stroke-linecap="round" stroke-linejoin="round"
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
        </svg>
    </div>

</template>

<script>
import TheRow from './TheRow.vue'
import axios from 'axios'

export default {
    components: {
        TheRow
    },
    data() {
        return {
            allCoins: null,
            loading: false,
            reverse: true,
            sortby: 'market_cap_rank'
        }
    },
    mounted() {
        document.title = "Home"
        this.loading = true
        axios
            .get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=7d')
            .then(responce => (this.allCoins = responce.data))
            .finally(() => this.loading = false)
    },
    methods: {
        sortBy(key) {
            this.sortby = key
            this.allCoins.sort((a, b) => a[key] > b[key] ? 1 : -1)
            if (this.reverse == true) {
                this.allCoins.reverse()
                this.reverse = false
            } else {
                this.allCoins.sort((a, b) => a[key] > b[key] ? 1 : -1)
                this.reverse = true
            }
        }
    }
}


</script>