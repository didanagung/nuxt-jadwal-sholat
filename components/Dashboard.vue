<template>
  <!-- <section class="grid place-items-center h-screen bg-[#222831]"> -->
  <section class="grid place-items-center h-screen">
    <div class="">
      <h1 class="text-6xl font-bold">Selamat Datang</h1>
      <AutoComplete class="my-4 mx-auto w-full" v-model="selectedCity" optionLabel="lokasi" :suggestions="cities" @complete="fetchData($event)" placeholder="Cari Kota"/>
      <Button type="button" label="Selanjutnya" icon="pi pi-search" :loading="loading" @click="gotoRealTime(selectedCity)" />
    </div>
  </section>
</template>

<script setup lang="ts">

const router = useRouter()
const selectedCity: any = ref();
const cities: any = ref([]);
const baseUrl: string = 'https://api.myquran.com/v2'

async function fetchData(filter: any) {
  let query = ''
  if (filter) {
    query = filter.query
  }
  const response = await useLazyFetch(`${baseUrl}/sholat/kota/cari/${query}`)
  console.log('ieu re', response);
  cities.value = response.data.value.data
}

const gotoRealTime = (e: any) => {
  console.log('ena', e);
    router.push({
      path: '/clock',
        query: {
            cityid: e.id
        },
    })
}
</script>