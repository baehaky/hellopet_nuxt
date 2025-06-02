<script setup>
// Move data to a composable or api call
import { ref } from 'vue'

const groomingData = ref([
    {
        id: 1,
        name: "Grooming BOLU PET GROOMING",
        address: "Jl. Kihajar Dewantoro No.mer 14, Gondrong, Kec. Cipondoh, Kota Tangerang, Banten 15146",
        image: "https://i.pinimg.com/736x/e9/4a/d3/e94ad3b42d6fc9675bb647d7a52fcff2.jpg",
    },
])

// Method for handling booking
const handleBooking = (id) => {
    // Add booking logic here
    console.log('Booking for service:', id)
}
</script>

<template>
    <section class="bg-gray-50 py-8 antialiased md:py-10">
        <div class="mx-auto max-w-screen-xl px-4 2xl:px-0">
            <div class="mb-4 items-end justify-center space-y-4 sm:flex sm:space-y-0 md:mb-6">
                <div>
                    <h2 class="mt-3 text-xl font-semibold text-gray-900 sm:text-2xl">
                        Pet Grooming
                    </h2>
                </div>
            </div>
            
            <div class="mb-4 flex justify-center gap-x-5">
                <div
                    v-for="item in groomingData"
                    :key="item.id"
                    class="rounded-lg border border-gray-200 min-w-sm bg-white p-6 shadow-sm"
                >
                    <div class="h-40 w-full">
                        <div class="h-[180px]">
                            <img
                                class="mx-auto h-full"
                                :src="item.image"
                                :alt="`${item.name} Image`"
                            >
                        </div>
                    </div>
                    
                    <div class="pt-9 text-center">
                        <p class="text-md font-bold leading-tight text-gray-900 hover:underline">
                            {{ item.name }}
                        </p>

                        <div class="mt-4 flex flex-col items-center">
                            <p class="text-xs font-light leading-tight text-gray-900">
                                {{ item.address }}
                            </p>
                            <button
                                class="bg-[#16BDCA] py-1.5 px-3.5 text-white rounded-lg mt-2"
                                @click="handleBooking(item.id)"
                            >
                                Pesan
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
