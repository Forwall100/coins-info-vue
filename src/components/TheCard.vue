<template>
    <div class="flex flex-col bg-gradient-to-b px-8 rounded-xl mb-5 md:mb-0 w-full" :class="color">
        <div class="flex flex-col">
            <span class="font-black text-5xl mt-5">{{ content }}</span>
            <span class="font-bold text-xl mt-10 mb-6">/ {{ title }}</span>
        </div>
    </div>
</template>

<script setup>
const props = defineProps([
    'title',
    'color',
    'content'
])
</script>