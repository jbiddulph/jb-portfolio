<template>
  <div class="container mx-auto flex mt-6 md:flex-row flex-col p-6 md:p-0">
    <div class="w-100 md:w-2/3">
      <div class="text-6xl md:text-8xl font-bold">I'm John,<br /> I've got new trainers, sunglasses, a shopping bag...<br /><span class="text-4xl md:text-6xl"> and I wear a hat!</span></div>
    </div>
    <div class="w-100 md:w-1/3 mt-6 md:mt-0">
      Projects I've built or worked on:
      <ul class="mt-6">
        <li class="mb-6">
          <h4 class="font-bold underline"><NuxtLink :href="'https://melvbiddulph.art'" target="_blank">‹Melvyn Biddulph Art /›</NuxtLink></h4>
          <p>My dad was an artist, a good one but not that well known until his later years when he finaly started to exhibit.</p>
        </li>
        <li class="mb-6">
          <h4 class="font-bold underline"><NuxtLink :href="'https://pinspots.co.uk'" target="_blank">‹Pin Spots /›</NuxtLink></h4>
          <p><span class="font-bold underline">Why?:</span> Just a new idea, it's possibly helpful and useful and because I am always learning and enjoy coding.</p>
        </li>
        <li class="mb-6">
          <h4 class="font-bold underline"><NuxtLink :href="'https://lookwhatfound.me'" target="_blank">‹LookWhatFound.Me /›</NuxtLink></h4>
          <p><span class="font-bold underline">Why?:</span> This is about version 6 now, it was originally MyPubSpace, PubMic, PubHub, SplendidSussex, BN-Here. It's evolved from PHP, Laravel/Vue, Python/Nuxt, Nuxt/Supabase/Prisma</p>
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