<template>
  <div class="flex flex-col pt-5 px-8">
    <the-header />
    <div class="flex md:flex-row flex-col justify-between mt-4">
      <the-card class="mr-5" title="DEFI market cap" :content="defiMarketCap" color="bg-lime-200" />
      <the-card class="mr-5" title="Trending coin" :content="trending" color="bg-indigo-100" />
      <the-card class="" title="BTC Dominance" :content="btcDominance" color="bg-yellow-100" />
    </div>
    <the-table />
  </div>
</template>

<script>
import TheHeader from "./components/TheHeader.vue"
import TheCard from "./components/TheCard.vue"
import TheTable from "./components/TheTable.vue"
import axios from "axios"

export default {
  components: {
    TheHeader,
    TheCard,
    TheTable
  },
  data() {
    return {
      defiMarketCap: 0,
      trending: '',
      btcDominance: 0,
    }
  },
  mounted() {
    axios
      .get('https://api.coingecko.com/api/v3/search/trending')
      .then(response => (this.trending = response.data.coins[0].item.name + " [" + response.data.coins[0].item.symbol + "]"))
    axios
      .get('https://api.coingecko.com/api/v3/global/decentralized_finance_defi')
      .then(response => (this.defiMarketCap = Intl.NumberFormat('en', { notation: 'compact' }).format(response.data.data.defi_market_cap)))
    axios
      .get('https://api.coingecko.com/api/v3/global')
      .then(response => (this.btcDominance = response.data.data.market_cap_percentage.btc.toFixed(2) + '%'))
  }
}
</script>