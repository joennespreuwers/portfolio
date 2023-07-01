<script setup>
let component = ref("work")


</script>

<template>
    <div class="w-screen h-screen bg-black/95 flex items-center justify-center">
    <div class="w-[96vw] h-[92vh] outline outline-1 outline-white/50 flex flex-col justify-evenly sm:flex-row">
            <div>
                <div class="mt-10 ml-10">
                    <h1 class="text-white font-Inter font-extralight text-5xl">Joenne Spreuwers</h1>
                    <h2 class="text-white font-Inter font-extralight text-l mt-2">Designer & Photographer</h2>
                </div>
                <div class="hidden flex-col items-start text-left border-l ml-10 mt-10 border-white/50 hover:border-white w-fit transition-all sm:flex ">
                    <button @click="component = 'work'" class=" text-white/50 hover:text-white font-Inter font-medium text-l pl-5 mb-5 mt-5 transition-all">My Work</button>
                    <button @click="component = 'about'" class="text-white/50 hover:text-white font-Inter font-medium text-l pl-5 mb-5 transition-all">About Me</button>
                    <button @click="component = 'contact'" class="text-white/50 hover:text-white hover:border-white font-Inter font-medium text-l pl-5 mb-5 transition-all">Contact</button>
                </div>
                <div class="flex flex-col items-start text-left border-l ml-10 mt-10 border-white/50 hover:border-white w-fit transition-all sm:hidden">
                    <NuxtLink to="mywork" class=" text-white/50 hover:text-white font-Inter font-medium text-l pl-5 mb-5 mt-5 transition-all">My Work</NuxtLink>
                    <NuxtLink to="aboutme" class="text-white/50 hover:text-white font-Inter font-medium text-l pl-5 mb-5 transition-all">About Me</NuxtLink>
                    <NuxtLink to="contact" class="text-white/50 hover:text-white hover:border-white font-Inter font-medium text-l pl-5 mb-5 transition-all">Contact</NuxtLink>
                </div>
            </div>
            <div class=" w-screen h-auto mt-10 mr-10 ">
                <Mywork v-if="component == 'work'" class="hidden sm:inline"/>
                <aboutme v-if="component == 'about'" class="hidden sm:inline"/>
                <contact v-if="component == 'contact'" class="hidden sm:inline"/>
            </div>
        </div>
    </div>
</template>

