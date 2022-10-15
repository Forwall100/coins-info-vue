<template>
  <div class="flex flex-col pt-5 px-8">
    <the-header />
    <div class="flex md:flex-row flex-col justify-between mt-4">
      <the-card class="mr-5" title="Fear and greed index" content="25" color="bg-lime-200" />
      <the-card class="mr-5" title="ETH gas price" content="19 gwei" color="bg-indigo-100" />
      <the-card class="" title="BTC Dominance" content="38%" color="bg-yellow-100" />
    </div>
    <the-table class="" />
  </div>
</template>

<script setup>
import TheHeader from "./components/TheHeader.vue"
import TheCard from "./components/TheCard.vue"
import TheTable from "./components/TheTable.vue"
</script>