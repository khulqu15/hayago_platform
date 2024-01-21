<template>
    <ion-page>
        <ion-content :fullscreen="true">
            <div class="min-h-screen relative bg-base-300">
                <div class="fixed bg-base-300 top-0 left-0 w-full p-4 rounded-b-2xl flex items-center gap-x-2 z-10">
                    <div class="w-full flex items-center gap-x-2 text-base-content">
                        <Icon role="button" @click="$router.replace('/dashboard')" icon="akar-icons:arrow-left" class="text-xl text-base-content"/>
                        <h2 class="uppercase font-maisonneue font-bold">{{ $route.params.key }}</h2>
                    </div>
                    <img @click="$router.replace('/profile')" role="button" src="/images/avatar.png" alt="Avatar Hayago" class="w-12">
                </div>
                <div class="px-4 pt-24 text-base-content">
                    <div v-if="menu.title != null || menu.title != undefined" class="flex justify-center gap-3 items-center">
                        <img v-if="menu.imageUrl" class="w-24 h-24 object-cover object-center" :src="menu.imageUrl" alt="Image Menu">
                        <img v-else class="w-24 h-24 object-cover object-center" src="/images/logo.png" alt="Image Menu">
                        <div class="text-base-content">
                            <h3 class="font-maisonneue font-bold mb-0">{{ menu.title }}</h3>
                            <p class="text-sm">{{ menu.description }}</p>
                        </div>
                        <div v-if="menu.data != null || menu.data != undefined" class="ml-3 dropdown dropdown-end">
                            <button tabindex="0" class="btn bg-base-200 btn-sm">
                                <Icon icon="uil:ellipsis-v" />
                            </button>
                            <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                <li><a @click="convertToCSV()">Convert CSV</a></li>
                                <li><a @click="convertToExcel()">Convert Excel</a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="py-4 space-y-4" v-if="menu.data != null || menu.data != undefined">
                        <div v-for="(item, index) in menu.data" :key="index" class="space-y-3">
                            <h1 class="uppercase font-maisonneue font-bold">{{ item.key }}</h1>
                            <div v-for="(coordinate, index) in item.data" :key="index" class="w-full hover:bg-base-200 p-3 hover:shadow-xl gap-4 rounded-xl grid grid-cols-3">
                                <div>
                                    <span class="p-2 bg-blue-600 font-bold rounded-lg text-white">X</span> {{ coordinate.split(',')[0].trim() }}
                                </div>
                                <div>
                                    <span class="p-2 bg-blue-600 font-bold rounded-lg text-white">Y</span> {{ coordinate.split(',')[1].trim() }}
                                </div>
                                <div>
                                    <span class="p-2 bg-blue-600 font-bold rounded-lg text-white">Z</span> {{ coordinate.split(',')[2].trim() }}
                                </div>
                                <div>
                                    <span class="p-2 bg-blue-600 font-bold rounded-lg text-white">Roll</span> {{ coordinate.split(',')[3].trim() }}
                                </div>
                                <div>
                                    <span class="p-2 bg-blue-600 font-bold rounded-lg text-white">Pitch</span> {{ coordinate.split(',')[4].trim() }}
                                </div>
                                <div>
                                    <span class="p-2 bg-blue-600 font-bold rounded-lg text-white">Yaw</span> {{ coordinate.split(',')[5].trim() }}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-else class="text-center space-y-4">
                        <img src="/images/dev.gif" class="w-full mt-5 mix-blend-multiply"/>
                        <h2 class="font-maisonneue font-bold text-base-content text-2xl">Belum ada data</h2>
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
import { useRoute } from 'vue-router'
import * as XLSX from 'xlsx';

const menu: Ref<any> = ref({})
const route = useRoute()
const database = getDatabase()
const storage = getStorage()

onMounted(async () => {
    get(dbRef(database, 'menu/'+route.params.key))
    .then(async (snapshot) => {
        const data = snapshot.val()
        menu.value = data
        console.log(data)
        if(menu.value.data != null || menu.value.data != undefined) {
            menu.value.data = Object.keys(data.data).map(key => {
                return { 
                    key: key,
                    data: Object.values(data.data[key])
                };
            });
        }
        menu.value.imageUrl = await fetchMenuImage(menu.value.image)
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

function convertToCSV() {
    if(menu.value.data) {
        let preparedData: any[] = []
        menu.value.data.forEach((item: { data: any[]; key: any }) => {
            item.data.forEach((coordinate) => {
                preparedData.push({
                    Key: item.key,
                    Data: coordinate.replace(';', '').trim()
                })
            })
        })
        const headers = ['key', 'X', 'Y', 'Z', 'ROLL', 'PITCH', 'YAW']
        const csvContent = [headers].concat(preparedData.map(it => Object.values(it))).join('\n');
        const blob = new Blob([csvContent], {
            type: 'text/csv;charset=utf-8',
        })
        const link = document.createElement('a')
        link.href = URL.createObjectURL(blob)
        link.setAttribute('download', route.params.key+'-data.csv')
        link.click()
        document.body.removeChild(link)
    }
}

function convertToExcel() {
    if (menu.value.data) {
        let preparedData: any[] = [];

        menu.value.data.forEach((item: { data: any[]; key: any }) => {
            item.data.forEach(coordinate => {
                const [x, y, z, roll, pitch, yaw] = coordinate.split(', ').map((c: string) => c.trim());
                preparedData.push({ key: item.key, X: x, Y: y, Z: z, ROLL: roll, PITCH: pitch, YAW: yaw });
            });
        });

        const ws = XLSX.utils.json_to_sheet(preparedData);

        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Data");

        XLSX.writeFile(wb, `${route.params.key}-data.xlsx`);
    }
}

</script>