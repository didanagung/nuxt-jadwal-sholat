<template>
  <section class="flex justify-center items-center h-screen">
    <div>
      <RealTimeClock/>
      <div v-if="statusGetData == true && isMobile == false" class="card mt-5">
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
          <div>
            <Button label="<-" variant="link" @click="backToDashboard()"/>
          </div>
      </div>
      <div v-else-if="statusGetData == true && isMobile == true" class="card mt-5">
          <div class="p-2 shadow-md flex justify-center items-center rounded-lg mt-2">
            <div class="text-center">
              <h3 class="text-xl font-bold">{{ dataJadwalSholat[0].imsak }}</h3>
              <p class="font-semibold font-mono">Imsak</p>
            </div>
          </div>
          <div class="p-2 shadow-md flex justify-center items-center rounded-lg mt-2">
            <div class="text-center">
              <h3 class="text-xl font-bold">{{ dataJadwalSholat[0].subuh }}</h3>
              <p class="font-semibold font-mono">Subuh</p>
            </div>
          </div>
          <div class="p-2 shadow-md flex justify-center items-center rounded-lg mt-2">
            <div class="text-center">
              <h3 class="text-xl font-bold">{{ dataJadwalSholat[0].terbit }}</h3>
              <p class="font-semibold font-mono">Terbit</p>
            </div>
          </div>
          <div class="p-2 shadow-md flex justify-center items-center rounded-lg mt-2">
            <div class="text-center">
              <h3 class="text-xl font-bold">{{ dataJadwalSholat[0].dhuha }}</h3>
              <p class="font-semibold font-mono">Dhuha</p>
            </div>
          </div>
          <div class="p-2 shadow-md flex justify-center items-center rounded-lg mt-2">
            <div class="text-center">
              <h3 class="text-xl font-bold">{{ dataJadwalSholat[0].dzuhur }}</h3>
              <p class="font-semibold font-mono">Dzuhur</p>
            </div>
          </div>
          <div class="p-2 shadow-md flex justify-center items-center rounded-lg mt-2">
            <div class="text-center">
              <h3 class="text-xl font-bold">{{ dataJadwalSholat[0].ashar }}</h3>
              <p class="font-semibold font-mono">Ashar</p>
            </div>
          </div>
          <div class="p-2 shadow-md flex justify-center items-center rounded-lg mt-2">
            <div class="text-center">
              <h3 class="text-xl font-bold">{{ dataJadwalSholat[0].maghrib }}</h3>
              <p class="font-semibold font-mono">Maghrib</p>
            </div>
          </div>
          <div class="p-2 shadow-md flex justify-center items-center rounded-lg mt-2">
            <div class="text-center">
              <h3 class="text-xl font-bold">{{ dataJadwalSholat[0].isya }}</h3>
              <p class="font-semibold font-mono">Isya</p>
            </div>
          </div>
          <div>
            <Button label="<-" variant="link" @click="backToDashboard()"/>
          </div>
      </div>
      <div v-else>
        <p>Loading...</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import dayjs from 'dayjs';
import Button from 'primevue/button';

const route = useRoute()
const router = useRouter()
const today = ref(dayjs().format('YYYY-MM-DD'))
const baseUrl = 'https://api.myquran.com/v2'
const statusGetData = ref()
const dataJadwalSholat = ref([])
const isMobile = ref(false);
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

const backToDashboard = () => {
  localStorage.removeItem('lokasi');
  router.push({
    path: '/',
  })
}

const checkDeviceSize = () => {
    isMobile.value = window.matchMedia("(max-width: 768px)").matches;
    console.log('cikan jadi naon', isMobile.value);
  };

// Mengambil data saat komponen dimuat
onMounted(() => {
  fetchJadwalSholat(cityId, today.value);
  checkDeviceSize()
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