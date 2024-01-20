<template>
    <ion-page>
        <ion-content :fullscreen="true">
            <div class="relative min-h-screen overflow-hidden bg-base-100">
                <div class="relative p-4">
                    <div class="flex justify-between">
                        <Icon role="button" @click="$router.replace('/login')" icon="akar-icons:arrow-left" class="text-2xl text-base-content"/>
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
                        <img src="/images/reset.png" class="w-20 mb-5"/>
                        <h1 class="font-maisonneue font-bold text-md">Ayo kembalikan akumnu!</h1>
                        <p class="text-sm">Masukkan emailmu yang terdaftar di Hayago.</p>
                        <form @submit.prevent="onSubmit()">
                            <div class="form-control mt-4">
                                <label for="email" class="text-sm mb-2">Email <span class="text-red-500">*</span></label>
                                <div class="flex items-center gap-x-3">
                                    <Icon icon="basil:envelope-solid" class="text-xl"/>
                                    <input v-model="email" type="email" placeholder="contoh@domain.com" required class="input w-full">
                                    <Icon v-if="email.length > 0" @click="email = ''" icon="uis:times-circle" class="text-2xl"/>
                                </div>
                            </div>
                            <div class="mt-2">
                                <button type="submit" class="btn font-maisonneue bg-blue-600 text-white rounded-2xl w-full">Lanjut</button>
                            </div>
                        </form>
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
import { ref, Ref } from 'vue'

const email: Ref<string> = ref('')
const next: Ref<boolean> = ref(false)
const password: Ref<string> = ref('')
const showPassword: Ref<boolean> = ref(false)

function onSubmit() {
    if(!next.value) {
        next.value = true
    }
}
</script>