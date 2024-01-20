<template>
    <ion-page>
        <ion-content :fullscreen="true">
            <div class="min-h-screen relative bg-base-300">
                <div class="fixed bg-base-300 top-0 left-0 w-full p-4 rounded-b-2xl flex items-center gap-x-2 z-10">
                    <div class="w-full flex items-center gap-x-2 text-base-content">
                        <Icon role="button" @click="$router.replace('/dashboard')" icon="akar-icons:arrow-left" class="text-xl text-base-content"/>
                        <h2 class="uppercase font-maisonneue font-bold">Profile</h2>
                    </div>
                    <img @click="$router.replace('/profile')" role="button" src="/images/avatar.png" alt="Avatar Hayago" class="w-12">
                </div>
                <div class="px-4 pt-24 text-base-content">
                   <div class="flex justify-center">
                        <div class="text-center">
                            <img role="button" src="/images/avatar.png" alt="Avatar Hayago" class="w-24 inline-block">
                            <h3 class="font-maisonneue font-bold mt-4">{{ user.name }}</h3>
                            <div>{{ user.email }}</div>
                        </div>
                   </div>
                   <button @click="onLogout()" class="btn bg-red-500 w-full text-white mt-12">Logout</button>
                </div>
            </div>
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue'
import { onMounted, ref, Ref } from 'vue'
import { getDatabase, ref as dbRef, set, get } from 'firebase/database'
import { useRouter } from 'vue-router';

const user: any = ref({})
const database = getDatabase()
const router = useRouter()

onMounted(() => {
    const uid = sessionStorage.getItem("uid")
    if(uid != null || uid != undefined) {
        get(dbRef(database, 'users/'+uid))
        .then((snapshot) => {
            if(snapshot.exists()) {
                user.value = snapshot.val()
            } else {
                onLogout()
            }
        })
    }
})

function onLogout() {
    sessionStorage.removeItem('uid')
    sessionStorage.removeItem('user')
    router.replace('/')
}

</script>