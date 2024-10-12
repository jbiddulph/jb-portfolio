<template>
  <div class="container mx-auto flex mt-6 md:flex-row flex-col p-6 md:p-0">
    <div class="w-100 md:w-2/3 pr-6">
      <div class="text-5xl md:text-5xl"><p>John Biddulph a passionate web developer specialising in modern JavaScript frameworks like Vue.js and Nuxt.</p> <p class="mt-6">Enjoys building intuitive, responsive applications that provide seamless user experiences.</p></div>
    </div>
    <div class="w-100 md:w-1/3 mt-6 md:mt-0">
      Projects I've built or worked on:
      <ul class="mt-6">
        <li class="mb-6">
          <h4 class="font-bold underline"><NuxtLink :href="'https://melvbiddulph.art'" target="_blank">‹Melvyn Biddulph Art /›</NuxtLink></h4>
          <p>Family first, my dad was an artist, a good one but not that well known until his later years.</p>
        </li>
        <li class="mb-6">
          <h4 class="font-bold underline"><NuxtLink :href="'https://nakedsloth.co.uk'" target="_blank">‹NakedSloth - Rapr /›</NuxtLink></h4>
          <p><span class="font-bold underline">Why?:</span> I wanted to build something using the OpenAI API and this is what I came up with, allowing people to create a design too and save it.</p>
        </li>
        <li class="mb-6">
          <h4 class="font-bold underline"><NuxtLink :href="'https://pinspots.co.uk'" target="_blank">‹Pin Spots /›</NuxtLink></h4>
          <p><span class="font-bold underline">Why?:</span> Just a new idea, it's possibly helpful and useful and because I am always learning and enjoy coding.</p>
        </li>
        <li class="mb-6">
          <h4 class="font-bold underline"><NuxtLink :href="'https://lookwhatfound.me'" target="_blank">‹LookWhatFound.Me /›</NuxtLink></h4>
          <p><span class="font-bold underline">Why?:</span> A large database of pubs and venues accross the UK. This is about version 6 now, it was originally MyPubSpace, PubMic, PubHub, SplendidSussex, BN-Here. It's evolved from PHP, Laravel/Vue, Python/Nuxt, Nuxt/Supabase/Prisma</p>
        </li>
        <li class="mb-6">
          <h4 class="font-bold underline"><NuxtLink :href="'https://stopcharge.co.uk/map'" target="_blank">stopcharge.co.uk /›</NuxtLink></h4>
          <p><span class="font-bold underline">Why?:</span> Another idea and use of MapBox and Supabase with Prisma using Nuxt 3 to show all (or most) electric charging points accross the UK and by selectiing 2 points to display the distance in KM or Miles between them</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.container {
  color: #e1ff00;
}
</style>