<template>
    <div class="flex flex-col bg-gradient-to-b px-8 py-14 border-2 mb-5 md:mb-0 border-black w-full" :class="color">
       <span class="font-black text-5xl mb-5">{{content}}</span> 
       <span class="font-bold text-xl">/ {{title}}</span>
    </div>
</template>

<script setup>
    const props = defineProps([
        'title',
        'color',
        'content'
    ])
</script>