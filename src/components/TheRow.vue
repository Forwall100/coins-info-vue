<template>
    <tr class="transition-all ease-in-out duration-100 border-b-4 border-white hover:border-black">
        <td>{{ num }}</td>

        <router-link :to="'/coin/' + id">
            <td class="flex flex-row items-center hover:cursor-pointer">
                <img :src="icon" class="w-8 h-8" />
                <div class="flex flex-col ml-3">
                    <span class="font-bold text-lg">{{ ticker }}</span>
                    <span class="font-light text-sm">{{ name }}</span>
                </div>
            </td>
        </router-link>
        <td class="w-16">$ {{ price }}</td>
        <td class="text-[#149728]  w-44 md:text-base text-xs" v-if="tfh >= 0">{{ tfh }} %</td>
        <td class="text-[#f51f44]   w-44  md:text-base text-xs" v-if="tfh < 0">{{ tfh }} %</td>
        <td class="text-[#149728]  w-44 md:text-base text-xs" v-if="sd >= 0">{{ sd }} %</td>
        <td class="text-[#f51f44]  w-44 md:text-base text-xs" v-if="sd < 0">{{ sd }} %</td>
        <td>{{ cap }}</td>
    </tr>
</template>

<script setup>
const props = defineProps([
    'id',
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