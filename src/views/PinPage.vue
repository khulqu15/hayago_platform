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
                        <div>
                            <h1 class="font-maisonneue font-bold text-md">Masukkan Pin Kamu</h1>
                            <p class="text-sm">Sebelum memasuki Hayago, Masukan pin dulu.</p>
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
                            <button @click="$router.replace('/register')" class="btn rounded-xl mt-3 bg-base-100 border">Lupa atau ada kendala ?</button>
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
import { getDatabase, ref as dbRef, set, get } from 'firebase/database'

const database = getDatabase()

const router = useRouter()
const user: Ref<any> = ref('')
const digit1: Ref<string> = ref('')
const digit2: Ref<string> = ref('')
const digit3: Ref<string> = ref('')
const digit4: Ref<string> = ref('')
const digit5: Ref<string> = ref('')
const digit6: Ref<string> = ref('')
const pinOrigin: Ref<string> = ref('')
const showPassword: Ref<boolean> = ref(false)

onMounted(() => {
    const uid = sessionStorage.getItem("uid")
    if(uid == undefined || uid == null) router.replace('/login')
    else user.value = uid
    console.log(user.value)
    const nextInput = document.getElementById(`digit1`)
    nextInput?.focus()
    get(dbRef(database, 'users/'+user.value+'/pin')).then((snapshot) => {
        if(snapshot.exists()) {
            pinOrigin.value = snapshot.val()
            console.log(pinOrigin.value)
        }
    })
})

const nextStep = (nextInputId: any) => {
  if (nextInputId <= 6) {
    const nextInput = document.getElementById(`digit${nextInputId}`);
    nextInput?.focus();
  } else {
    const pin = digit1.value + digit2.value + digit3.value + digit4.value + digit5.value + digit6.value
    if(pin == pinOrigin.value) {
        router.replace('/dashboard')
    } else {
        console.log("Salahh")
    }
  }
};
</script>