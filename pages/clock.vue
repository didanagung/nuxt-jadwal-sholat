<template>
  <section class="flex justify-center items-center h-screen">
    <div>
      <RealTimeClock/>
      <div v-if="statusGetData == true" class="card mt-5">
          <DataTable :value="dataJadwalSholat" showGridlines tableStyle="min-width: 50rem">
              <Column field="imsak" header="Imsak"></Column>
              <Column field="subuh" header="Subuh"></Column>
              <Column field="terbit" header="Terbit"></Column>
              <Column field="dhuha" header="Dhuha"></Column>
              <Column field="dzuhur" header="Dzuhur"></Column>
              <Column field="ashar" header="Ashar"></Column>
              <Column field="maghrib" header="Maghrib"></Column>
              <Column field="isya" header="Isya"></Column>
          </DataTable>
      </div>
      <div v-else>
        <p>Loading...</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import dayjs from 'dayjs';

const route = useRoute()
const today = ref(dayjs().format('YYYY-MM-DD'))
const baseUrl = 'https://api.myquran.com/v2'
const statusGetData = ref()
const dataJadwalSholat = ref([])
let cityId = route.query.cityid

const fetchJadwalSholat = async (id, day) => {
  try {
    const response = await fetch(`${baseUrl}/sholat/jadwal/${id}/${day}`);
    const data = await response.json();
    const jadwalna = data.data.jadwal;
    dataJadwalSholat.value.push(jadwalna);
    statusGetData.value = data.status
    
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

// Mengambil data saat komponen dimuat
onMounted(() => {
  fetchJadwalSholat(cityId, today.value);
});

// const { data: fetchedData, error, status } = useFetch(`${baseUrl}/sholat/jadwal/${cityId}/${today.value}`);
// const jadwalSholat = ref([]);
// console.log('naon', fetchedData.value.status);

// // Once data is fetched, assign it to jadwalSholat
// watchEffect(() => {
//   if (fetchedData.value) {
//     jadwalSholat.value = fetchedData.value.data.jadwal;
//     statusGetData.value = fetchedData.value.status;
//   }
// });


// async function fetchJadwalSholat(id, day) {
  // const {status, data} = await useLazyFetch(`${baseUrl}/sholat/jadwal/${id}/${day}`)
  // const {status, data} = await useLazyFetch(`${baseUrl}/sholat/jadwal/${cityId}/${today.value}`)
  // console.log('datana', data);
  //   if (data.value != null) {
  //     statusGetData.value = status.value
  //     dataJadwalSholat.value = data.value.data.jadwal
  //   }
    
    // dataJadwalSholat.value = JSON.stringify(data.value.data.jadwal)
    // console.log('dfdfssdfs', dataJadwalSholat);
    
// } 

// if (cityId != '' && cityId != undefined && cityId != null) {
//   onMounted(async() => {
//       await fetchJadwalSholat(cityId, today.value)
//   });
// }
</script>