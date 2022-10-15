<template>
   <tr class="transition-all ease-in-out duration-100 border-b-2 border-white hover:border-black hover:cursor-pointer">
    <td>{{num}}</td>
    <td class="flex flex-row items-center">
        <img :src="icon" class="w-8 h-8"/>
        <div class="flex flex-col ml-3">
            <span class="font-bold text-lg">{{ticker}}</span>
            <span class="font-light text-sm">{{name}}</span>
        </div>
    </td>
    <td >$ {{price}}</td>
    <td class="text-green-800" v-if="tfh >= 0">{{tfh}} %</td>
    <td class="text-red-800" v-if="tfh < 0">{{tfh}} %</td>
    <td class="text-green-800" v-if="sd >= 0">{{sd}} %</td>
    <td class="text-red-800" v-if="sd < 0">{{sd}} %</td>
    <td>{{cap}}</td>
   </tr> 
</template>

<script setup>
const props = defineProps([
    'num',
    'icon',
    'ticker',
    'name',
    'price',
    'tfh',
    'sd',
    'cap'
])
</script>