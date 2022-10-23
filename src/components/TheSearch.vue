<template>
    <div
        class="flex flex-col justify-between mt-5 border-2 border-black py-3 px-5 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none">
        <form @submit.prevent="search()">
            <div class=" border-black flex flex-row justify-between">
                <input type="text"
                    class="w-full mr-5 transition duration-100 border-b-2 focus:border-black border-white outline-none text-lg"
                    placeholder="Input coin..." v-model="inputValue" @keyup.esc="coins = []">
                <button type="submit" class="text-lg">
                    search
                </button>
            </div>
        </form>
        <transition name="slide-fade">
            <div v-if="!loading">
                <search-result :coins="coins"></search-result>
            </div>
        </transition>
        <transition name="slide-fade">
            <div v-if="errorMessage.length != 0">
                {{errorMessage}}
            </div>
        </transition>
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
import axios from 'axios'
import SearchResult from './SearchResult.vue'

export default {
    components: {
        SearchResult
    },
    data() {
        return {
            inputValue: '',
            errorMessage: '',
            loading: false,
            coins: []
        }
    },
    methods: {
        search() {
            this.loading = true;
            if (this.inputValue != '') {
                axios
                    .get(`https://api.coingecko.com/api/v3/search?query=${this.inputValue}`)
                    .then(responce => (this.coins = responce.data.coins))
                    .catch(error => {
                        this.errorMessage = error.message
                    })
                    .finally(() => {
                        if (this.coins.length == 0) {
                            this.errorMessage = 'Nothing found'
                            this.loading = false
                        }
                        else {
                            this.errorMessage = ''
                            this.loading = false
                            this.inputValue = ''
                        }
                    })
            } else{
                this.errorMessage = 'Nothing found'
                this.loading = false
            }
        }
    }
}
</script>

<style>
.slide-fade-enter-active {
    transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
    transition: all 0.4s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    transform: translateX(100px);
    opacity: 0;
}
</style>