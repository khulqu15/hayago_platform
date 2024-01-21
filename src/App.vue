<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { onMounted } from 'vue';
onMounted(() => {
  const localTheme = localStorage.getItem('theme')
  if(localTheme != null || localTheme != undefined) document.querySelector('html')?.setAttribute('data-theme', localTheme)
  else document.querySelector('html')?.setAttribute('data-theme', 'dark')
})
</script>
