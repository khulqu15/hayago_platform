<template>
    <ion-page>
        <ion-content :fullscreen="true">
            <div class="min-h-screen relative bg-base-300">
                <div class="fixed bg-base-300 top-0 left-0 w-full p-4 rounded-b-2xl flex items-center gap-x-2 z-10">
                    <div class="w-full flex items-center gap-x-2 text-base-content">
                        <Icon icon="mingcute:search-line" class="text-xl"/>
                        <input type="text" class="bg-base-300 w-full p-1" placeholder="Cari menu, data, artikel">
                    </div>
                    <img @click="$router.replace('/profile')" role="button" src="/images/avatar.png" alt="Avatar Hayago" class="w-12">
                </div>
                <div class="w-full max-h-[40vh] bg-blue-600 relative overflow-hidden">
                    <img src="/images/bg-home.png" class="w-full h-full object-cover object-center" alt="">
                </div>
                <div class="px-4 text-base-content">
                    <div class="relative -top-6 p-4 bg-base-200 rounded-2xl flex justify-between gap-x-2">
                        <div class="flex items-center gap-x-3">
                            <img src="/images/dev.png" alt="Developer Image" class="w-10 rounded-xl">
                            <div>
                                <h4 class="font-maisonneue text-sm font-bold">Request New Project</h4>
                                <p class="text-xs">Hayago Research Team</p> 
                            </div>
                        </div>
                        <a href="https://wa.me/62895396004952" target="_BLANK" class="p-2 bg-blue-600 rounded-xl text-white">
                            <Icon icon="mingcute:whatsapp-fill" class="text-xl"/>
                        </a>
                    </div>
                    <div class="grid md:grid-cols-4 grid-cols-3 gap-2">
                        <div v-for="(item, index) in menu" :key="index" @click="$router.replace('/menu/'+item.key)" class="border border-base-100 p-4 rounded-xl flex items-center justify-center">
                            <div class="text-center">
                                <img :src="item.imageUrl" :alt="item.imageUrl" class="w-14 mb-3">
                                <h5 class="text-sm font-maisonneue font-semibold">{{ item.title }}</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue'
import { onMounted, ref, Ref } from 'vue'
import { getDatabase, ref as dbRef, set, get } from 'firebase/database'
import { getStorage, ref as storageRef, getDownloadURL } from 'firebase/storage'

const menu: Ref<any> = ref({})
const database = getDatabase()
const storage = getStorage()

onMounted(async () => {
    get(dbRef(database, 'menu/'))
    .then(async (snapshot) => {
        const data = snapshot.val()
        const menuData = await Promise.all(Object.keys(data).map(async (key) => {
            const item = data[key]
            item.imageUrl = await fetchMenuImage(item.image)
            return {key, ...item}
        }))
        menu.value = menuData
        console.log(menu.value)
    })
})

async function fetchMenuImage(filename: string) {
    const imageRef = storageRef(storage, 'icon/'+filename)
    try {
        const url = await getDownloadURL(imageRef)
        return url
    } catch (error) {
        console.log(error)
        return '/images/logo.png'
    }
}

</script>