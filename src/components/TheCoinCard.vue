<template>
    <div v-if="!loading" class="flex md:flex-row flex-col mt-5 md:w-5/6 md:items-start items-center justify-between">
        <div class="flex flex-col w-2/3">
            <div class="flex md:flex-row flex-col">
                <img :src="icon" class="w-20 h-20">
                <div class="flex flex-col">
                    <div class="flex ml-2">
                        <h1 class="text-5xl font-bold">{{ name }}</h1>
                        <h1 class="text-2xl ml-2 text-gray-500">{{ symbol }}</h1>
                    </div>
                    <span class="flex bg-black text-white justify-center ml-2 text-xl font-semibold mt-2">Rank #{{ rank
                    }}</span>
                </div>
            </div>
            <div class="flex flex-col mt-7">
                <p class="text-md text-gray-500">{{ symbol }} Price</p>
                <div class="flex md:flex-row flex-col">
                    <h1 class="text-7xl font-black">${{ price }}</h1>
                    <span v-if="tfh >= 0"
                        class="rounded-lg text-2xl mt-5 flex ml-4 bg-[#aff51f] items-center px-4 text-[#172004] font-bold">{{
                                tfh
                        }}%</span>
                    <span v-if="tfh < 0"
                        class="rounded-lg text-2xl mt-5 flex ml-4 bg-[#f51f44] items-center px-4 text-white font-bold">{{
                                tfh
                        }}%</span>
                </div>
                <div class="flex flex-col mt-5">
                    <h1 class="text-gray-500 mb-2">Price range 24h</h1>
                    <span class="rounded-full h-2 bg-gradient-to-r from-[#f51f44] to-[#aff51f]"></span>
                    <div class="flex justify-between mt-2">
                        <div>low= <span class="font-semibold">${{ low_price }}</span></div>
                        <div>High= <span class="font-semibold">${{ high_price }}</span></div>
                    </div>
                </div>
                <div class="flex font-semibold md:flex-row flex-col justify-between mt-5">
                    <span class="flex flex-col items-center border-black border-4 px-14 py-2 mt-5 mr-4 rounded-2xl">
                        <h1 class="text-gray-500">Market Cap</h1>
                        <h1 class="font-semibold">${{ cap }}</h1>
                    </span>
                    <span class="flex flex-col  items-center border-black border-4 px-14 py-2 mt-5 mr-4 rounded-2xl">
                        <h1 class="text-gray-500">Volume</h1>
                        <h1 class="font-semibold">${{ volume }}</h1>
                    </span>
                    <span class="flex flex-col items-center border-black border-4 px-14 py-2 mt-5 mr-4 rounded-2xl">
                        <h1 class="text-gray-500">ATH</h1>
                        <h1 class="font-semibold">${{ ath }}</h1>
                    </span>
                    <span class="flex flex-col border-black items-center border-4 px-14 py-2 mt-5 mr-4 rounded-2xl">
                        <h1 class="text-gray-500">All Supply</h1>
                        <h1 class="font-semibold">{{ total_supply }}</h1>
                    </span>
                </div>
                <div class="flex flex-col">
                    <h1 class="text-2xl font-semibold mt-8 mb-3">{{ symbol }} price chart</h1>
                    <coingecko-coin-compare-chart-widget :coin-ids="id" currency="usd" locale="en">
                    </coingecko-coin-compare-chart-widget>
                </div>

            </div>
        </div>
        <div class="flex flex-col text-xl font-semibold md:ml-28 items-center md:items-start mt-10">
            <div v-if="website != ''" class="flex items-center mt-4">
                <h1>Website: </h1>
                <a :href="website" class="hover:bg-black 
                hover:text-white border-4 px-4 py-1 ml-3 
                bg-white text-black border-black 
                hover=cursor-pointer">{{ website }}</a>
            </div>
            <div v-if="twitter_link != ''" class="flex items-center mt-4">
                <h1>Twitter followers: </h1>
                <a :href="twitter_link" class="hover:bg-black 
                hover:text-white border-4 px-4 py-1 ml-3 
                bg-white text-black border-black 
                hover=cursor-pointer">{{ twitter_followers }}</a>
            </div>
            <div v-if="reddit_link != ''" class="flex items-center mt-4">
                <h1>Reddit followers: </h1>
                <a :href="reddit_link" class="hover:bg-black 
                hover:text-white border-4 px-4 py-1 ml-3 
                bg-white text-black border-black 
                hover=cursor-pointer">{{ reddit_followers }}</a>
            </div>
            <div v-if="github_link != ''" class="flex items-center mt-4">
                <h1>GitHub stars: </h1>
                <a :href="github_link" class="hover:bg-black 
                hover:text-white border-4 px-4 py-1 ml-3 
                bg-white text-black border-black 
                hover=cursor-pointer">{{ github_stars }}</a>
            </div>

            <transition name="slide-up">
                <div @click="show_all_desc = !show_all_desc" v-if="!show_all_desc"
                    class=" mt-10 font-normal border-l-4 pl-5 hover:border-black text-transparent bg-clip-text bg-gradient-to-b from-black via-black to-gray-100 hover:to-black cursor-pointer">
                    {{ description.substring(0, 600) + '...' }}
                </div>
                <div v-else class="mt-10 font-normal border-l-4 pl-5 border-black">
                    {{ description }}
                </div>
            </transition>
        </div>
        <div v-if="loading" class="flex flex-row align-middle items-center justify-center mt-16">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1"
                stroke="currentColor" class="animate-spin w-16 h-16 text-black">
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    data() {
        return {
            id: "",
            icon: "",
            name: "",
            rank: 0,
            symbol: "",
            price: "",
            tfh: 0,
            low_price: 0,
            high_price: 0,
            cap: 0,
            volume: 0,
            ath: 0,
            total_supply: 0,
            website: "",
            twitter_followers: 0,
            reddit_followers: 0,
            github_stars: 0,
            description: '',
            twitter_link: 0,
            reddit_link: 0,
            github_link: 0,
            show_all_desc: false,
            loading: false
        }
    },
    mounted() {
        this.loading = true
        axios
            .get(`https://api.coingecko.com/api/v3/coins/${this.$route.params.id}?tickers=true&market_data=true&community_data=true&developer_data=true`)
            .then((responce) => {
                this.id = this.$route.params.id
                this.icon = responce.data.image.large
                this.name = responce.data.name
                this.rank = responce.data.market_cap_rank
                this.symbol = responce.data.symbol.toUpperCase()
                this.price = responce.data.market_data.current_price.usd.toLocaleString('ru')
                this.tfh = responce.data.market_data.price_change_percentage_24h.toFixed(2)
                this.low_price = responce.data.market_data.low_24h.usd.toFixed(4)
                this.high_price = responce.data.market_data.high_24h.usd.toFixed(4)
                this.cap = responce.data.market_data.market_cap.usd.toLocaleString('ru')
                this.volume = responce.data.market_data.total_volume.usd.toLocaleString('ru')
                this.ath = responce.data.market_data.ath.usd.toLocaleString('ru')
                this.total_supply = responce.data.market_data.total_supply.toLocaleString('ru')
                this.website = responce.data.links.homepage[0]
                this.twitter_followers = responce.data.community_data.twitter_followers.toLocaleString('ru')
                this.reddit_followers = responce.data.community_data.reddit_subscribers.toLocaleString('ru')
                this.reddit_link = responce.data.links.subreddit_url.toLocaleString('ru')
                this.twitter_link = 'https://twitter.com/' + responce.data.links.twitter_screen_name.toLocaleString('ru')
                this.github_link = responce.data.links.repos_url.github[0].toLocaleString('ru')
                this.github_stars = responce.data.developer_data.stars.toLocaleString('ru')
                this.description = responce.data.description.en.replace(/<[^>]*>/g, '');
                document.title = this.name + " Price in USD"
            })
            .finally(() => this.loading = false)
    },
    watch: {
        $route() {
            this.loading = true
            axios
                .get(`https://api.coingecko.com/api/v3/coins/${this.$route.params.id}?tickers=true&market_data=true&community_data=true&developer_data=true`)
                .then((responce) => {
                    this.id = this.$route.params.id
                    this.icon = responce.data.image.large
                    this.name = responce.data.name
                    this.rank = responce.data.market_cap_rank
                    this.symbol = responce.data.symbol.toUpperCase()
                    this.price = responce.data.market_data.current_price.usd.toLocaleString('ru')
                    this.tfh = responce.data.market_data.price_change_percentage_24h.toFixed(2)
                    this.low_price = responce.data.market_data.low_24h.usd.toFixed(2)
                    this.high_price = responce.data.market_data.high_24h.usd.toFixed(2)
                    this.cap = responce.data.market_data.market_cap.usd.toLocaleString('ru')
                    this.volume = responce.data.market_data.total_volume.usd.toLocaleString('ru')
                    this.ath = responce.data.market_data.ath.usd.toLocaleString('ru')
                    this.total_supply = responce.data.market_data.total_supply.toLocaleString('ru')
                    this.website = responce.data.links.homepage[0]
                    this.twitter_followers = responce.data.community_data.twitter_followers.toLocaleString('ru')
                    this.reddit_followers = responce.data.community_data.reddit_subscribers.toLocaleString('ru')
                    this.reddit_link = responce.data.links.subreddit_url.toLocaleString('ru')
                    this.twitter_link = 'https://twitter.com/' + responce.data.links.twitter_screen_name.toLocaleString('ru')
                    this.github_link = responce.data.links.repos_url.github[0].toLocaleString('ru')
                    this.github_stars = responce.data.developer_data.stars.toLocaleString('ru')
                    this.description = responce.data.description.en
                    document.title = this.name + " Price in USD"
                })
                .finally(() => this.loading = false)
        }
    }
}
</script>

<style>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.1s ease-out;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

</style>