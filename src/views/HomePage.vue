<template>
    <ion-page>
        <ion-content :fullscreen="true">
            <div class="relative min-h-screen overflow-hidden bg-base-100">
                <img src="/images/bg-home.png" alt="bg home" class="w-full h-full object-cover object-center absolute top-12 opacity-40">
                <div class="absolute left-0 -bottom-2 p-4 text-base-content bg-gradient-to-t from-base-100 pt-24">
                    <h1 class="font-maisonneue font-bold text-md">Selamat datang di Hayago!</h1>
                    <p class="text-sm">Gunakan mission planner dalam beberapa langkah mudah</p>
                    <div class="mt-2">
                        <button @click="signInGoogle()" class="btn font-maisonneue bg-blue-600 text-white rounded-2xl w-full">
                            <Icon icon="basil:google-solid" class="text-xl" />
                            Login dengan Google
                        </button>
                    </div>
                    <div class="divider text-sm">atau</div>
                    <div class="mt-2">
                        <button @click="$router.replace('/login')" class="btn text-white rounded-2xl w-full font-maisonneue">Lanjut dengan Email</button>
                    </div>
                    <div class="my-4 flex items-center justify-center">
                        <img src="/images/logo.png" class="w-10" alt="Hayago logo">
                    </div>
                </div>
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
                </div>
            </div>
        </ion-content>
    </ion-page>
</template>


<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue'
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { getDatabase, ref as dbRef, get, set } from "firebase/database"
import { useRouter } from 'vue-router';

const auth = getAuth()
const database = getDatabase()
const router = useRouter()

function signInGoogle() {
    const provider = new GoogleAuthProvider()
    signInWithPopup(auth, provider)
    .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result)
        const token = credential?.accessToken
        const user = result.user
        sessionStorage.setItem('user', JSON.stringify(user))
        sessionStorage.setItem('uid', user.uid)
        sessionStorage.setItem('access_token', token!)
        get(dbRef(database, 'users/'+user.uid)).then((snapshot) => {
            console.log(snapshot.val())
            if(snapshot.val() != null) router.replace('/pin')
            else {
                set(dbRef(database, 'users/'+user.uid), {
                    status: 'active',
                    email: user.email,
                    uid: user.uid
                })
                router.replace('/register')
            }
        })
    })
    .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        const credential = GoogleAuthProvider.credentialFromError(error)
        console.log("error code : ")
        console.log(errorCode)
        console.log("error code : ")
        console.log(errorMessage)
        console.log("credential : ")
        console.log(credential)
    })
}
</script>
