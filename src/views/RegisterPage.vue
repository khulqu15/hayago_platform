<template>
    <ion-page>
        <ion-content :fullscreen="true">
            <div class="relative min-h-screen overflow-hidden bg-base-100">
                <div class="relative p-4">
                    <div class="flex justify-end">
                        <label for="language_modal" class="btn btn-sm font-maisonneue btn-ghost border border-base-content text-sm text-base-content rounded-xl px-4 flex items-center gap-x-3">
                            <Icon icon="akar-icons:language" />
                            <span>Bahasa Indonesia</span>
                        </label>
                        <input type="checkbox" id="language_modal" class="modal-toggle" />
                        <div class="modal modal-bottom sm:modal-middle" role="dialog">
                            <div class="modal-box text-base-content">
                                <h3 class="font-bold text-lg mb-0 font-maisonneue">Pilih Bahasamu</h3>
                                <p>Mau bahasa apa ?</p>
                                <div class="my-5 space-y-2">
                                    <div class="flex justify-between items-center border-1 border-b py-3 border-base-300">
                                        <span class="font-bold">Bahasa Indonesia</span>
                                        <input type="radio" name="radio-2" class="radio radio-primary" checked />
                                    </div>
                                    <div class="flex justify-between items-center border-1 border-b py-3 border-base-300">
                                        <span class="font-bold">English</span>
                                        <input type="radio" name="radio-2" class="radio radio-primary"/>
                                    </div>
                                    <div class="flex justify-between items-center border-1 border-b py-3 border-base-300">
                                        <span class="font-bold">日本</span>
                                        <input type="radio" name="radio-2" class="radio radio-primary"/>
                                    </div>
                                </div>
                                <div class="modal-action">
                                    <label for="language_modal" class="btn w-full bg-blue-600 text-white rounded-2xl">Simpan dan Lanjut</label>
                                </div>
                            </div>
                            <label class="modal-backdrop" for="language_modal"></label>
                        </div>
                    </div>
                    <div class="relative left-0 -bottom-2 mt-8 text-base-content bg-gradient-to-t from-base-100">
                        <div v-if="!pinContent">
                            <h1 class="font-maisonneue font-bold text-md">Isikan data akumnu!</h1>
                            <p class="text-sm">Satu langkah lebih dekat menggunakan Hayago.</p>
                            <form @submit.prevent="onSubmit()">
                                <div class="form-control mt-4">
                                    <label for="name" class="text-sm mb-2">Nama <span class="text-red-500">*</span></label>
                                    <div class="flex items-center gap-x-3">
                                        <input v-model="name" type="name" placeholder="contoh: Adell" minlength="4" required class="input w-full">
                                        <Icon v-if="name.length > 0" @click="name = ''" icon="uis:times-circle" class="text-2xl"/>
                                    </div>
                                </div>
                                <div class="form-control mt-4">
                                    <label for="birthday" class="text-sm mb-2">Tanggal lahir <span class="text-red-500">*</span></label>
                                    <div class="flex items-center gap-x-3">
                                        <input v-model="birthday" type="date" required class="input w-full">
                                        <Icon v-if="birthday.length > 0" @click="birthday = ''" icon="uis:times-circle" class="text-2xl"/>
                                    </div>
                                </div>
                                <div class="form-control mt-4">
                                    <label for="address" class="text-sm mb-2">Alamat <span class="text-red-500">*</span></label>
                                    <div class="flex items-center gap-x-3">
                                        <input v-model="address" type="text" minlength="4" placeholder="Jln A, RT 0, Rw 0, Desa B, Kota C, Provinsi D" required class="input w-full">
                                        <Icon v-if="address.length > 0" @click="address = ''" icon="uis:times-circle" class="text-2xl"/>
                                    </div>
                                </div>
                                <div class="mt-2">
                                    <button type="submit" class="btn font-maisonneue bg-blue-600 text-white rounded-2xl w-full">Lanjut</button>
                                </div>
                            </form>
                        </div>
                        <div v-else>
                            <h1 class="font-maisonneue font-bold text-md">Konfigurasi Pin Kamu</h1>
                            <p class="text-sm">Upayakan akunmu lebih aman dengan pin yang susah ditebak.</p>
                            <form>
                                <div class="flex items-center my-3 gap-x-3">
                                    <input :type="showPassword ? 'text': 'password'" maxlength="1" v-model="digit1" id="digit1" @input="nextStep(2)" class="w-full input bg-base-200 rounded-xl" required>
                                    <input :type="showPassword ? 'text': 'password'" maxlength="1" v-model="digit2" id="digit2" @input="nextStep(3)" class="w-full input bg-base-200 rounded-xl" required>
                                    <input :type="showPassword ? 'text': 'password'" maxlength="1" v-model="digit3" id="digit3" @input="nextStep(4)" class="w-full input bg-base-200 rounded-xl" required>
                                    <input :type="showPassword ? 'text': 'password'" maxlength="1" v-model="digit4" id="digit4" @input="nextStep(5)" class="w-full input bg-base-200 rounded-xl" required>
                                    <input :type="showPassword ? 'text': 'password'" maxlength="1" v-model="digit5" id="digit5" @input="nextStep(6)" class="w-full input bg-base-200 rounded-xl" required>
                                    <input :type="showPassword ? 'text': 'password'" maxlength="1" v-model="digit6" id="digit6" @input="nextStep(7)" class="w-full input bg-base-200 rounded-xl" required>
                                </div>
                                <div class="form-control">
                                    <label class="label cursor-pointer">
                                        <span class="label-text">Show Pin</span> 
                                        <input v-model="showPassword" type="checkbox" class="checkbox checkbox-primary" />
                                    </label>
                                </div>
                                <div class="mt-2">
                                    <button type="submit" class="btn font-maisonneue bg-blue-600 text-white rounded-2xl w-full">Simpan</button>
                                </div>
                            </form>
                        </div>
                        <div class="my-4 flex items-center justify-center">
                            <img src="/images/logo.png" class="w-10" alt="Hayago logo">
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
import { useRouter } from 'vue-router'
import { getDatabase, ref as dbRef, set } from 'firebase/database'

const database = getDatabase()

const name: Ref<string> = ref('')
const birthday: Ref<string> = ref('')
const address: Ref<string> = ref('')
const password: Ref<string> = ref('')
const showPassword: Ref<boolean> = ref(false)
const router = useRouter()
const user: Ref<any> = ref('')
const pinContent: Ref<boolean> = ref(false)
const digit1: Ref<string> = ref('')
const digit2: Ref<string> = ref('')
const digit3: Ref<string> = ref('')
const digit4: Ref<string> = ref('')
const digit5: Ref<string> = ref('')
const digit6: Ref<string> = ref('')

onMounted(() => {
    const uid = sessionStorage.getItem("uid")
    if(uid == undefined || uid == null) router.replace('/login')
    else user.value = uid
    console.log(user.value)
    const nextInput = document.getElementById(`digit1`)
    nextInput?.focus()
    const userSession = JSON.parse(sessionStorage.getItem("user")!)
    console.log(userSession)
    if(userSession != null || userSession != undefined) {
        name.value = userSession.displayName
    }
})


async function onSubmit() {
    await set(dbRef(database, 'users/'+user.value+'/name'), name.value)
    await set(dbRef(database, 'users/'+user.value+'/birthday'), birthday.value)
    await set(dbRef(database, 'users/'+user.value+'/address'), address.value)
    pinContent.value = true
}

const nextStep = (nextInputId: any) => {
  if (nextInputId <= 6) {
    const nextInput = document.getElementById(`digit${nextInputId}`);
    nextInput?.focus();
  } else {
    const pin = digit1.value + digit2.value + digit3.value + digit4.value + digit5.value + digit6.value
    set(dbRef(database, 'users/'+user.value+'/pin'), pin)
    router.replace('/dashboard')
  }
};
</script>