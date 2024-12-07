<template>
  <div class="text-center text-9xl font-bold">
    <p>{{ currentTime }}</p>
  </div>
</template>

<script setup>
// import { ref, onMounted, onUnmounted } from "vue";
import dayjs from "dayjs";

// State untuk waktu saat ini
const currentTime = ref(dayjs().format("HH:mm:ss"));

// Fungsi untuk memperbarui waktu
const updateClock = () => {
  currentTime.value = dayjs().format("HH:mm:ss");
};

let clockInterval;

// Lifecycle hooks
onMounted(() => {
  clockInterval = setInterval(updateClock, 1000); // Update setiap detik
});

onUnmounted(() => {
  clearInterval(clockInterval); // Bersihkan interval saat komponen dihancurkan
});
</script>

<style scoped>
/* p {
  font-size: 1.5rem;
  font-weight: bold;
} */
</style>
