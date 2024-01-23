<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div class="relative min-h-screen overflow-hidden bg-base-100">
        <div class="relative p-4">
          <div class="flex justify-between">
            <Icon role="button" @click="$router.replace('/')" icon="akar-icons:arrow-left" class="text-2xl text-base-content" />
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
                    <input type="radio" name="radio-2" class="radio radio-primary" />
                  </div>
                  <div class="flex justify-between items-center border-1 border-b py-3 border-base-300">
                    <span class="font-bold">日本</span>
                    <input type="radio" name="radio-2" class="radio radio-primary" />
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
            <h1 class="font-maisonneue font-bold text-md">Selamat datang di Hayago!</h1>
            <p class="text-sm">Gunakan mission planner dalam beberapa langkah mudah</p>
            <form @submit.prevent="onSubmit()">
              <div class="form-control mt-4">
                <label for="email" class="text-sm mb-2">Email <span class="text-red-500">*</span></label>
                <div class="flex items-center gap-x-3">
                  <Icon icon="basil:envelope-solid" class="text-xl" />
                  <input v-model="email" type="email" placeholder="contoh@domain.com" required class="input w-full" />
                  <Icon v-if="email.length > 0" @click="email = ''" icon="uis:times-circle" class="text-2xl" />
                </div>
              </div>
              <div v-if="next" class="form-control mt-2">
                <label for="email" class="text-sm mb-2">Password <span class="text-red-500">*</span></label>
                <div class="flex items-center gap-x-3">
                  <Icon @click="showPassword = !showPassword" icon="tabler:eye-filled" class="text-xl" />
                  <input v-model="password" :type="showPassword ? 'text' : 'password'" placeholder="Secret password" required class="input w-full" />
                  <Icon v-if="password.length > 0" @click="password = ''" icon="uis:times-circle" class="text-2xl" />
                </div>
              </div>
              <div class="mt-2">
                <button type="submit" class="btn font-maisonneue bg-blue-600 text-white rounded-2xl w-full">{{ next ? "Login" : "Lanjut" }}</button>
              </div>
            </form>
            <div class="mt-2">
              <button @click="$router.replace('/register')" class="btn font-maisonneue text-white rounded-2xl w-full">Register</button>
            </div>
            <button @click="$router.replace('/reset')" class="btn rounded-xl mt-3 bg-base-100 border">Lupa atau ada kendala ?</button>
            <div class="my-4 flex items-center justify-center">
              <img src="/images/logo.png" class="w-10" alt="Hayago logo" />
            </div>
          </div>
        </div>
        <notifications :key="key" :type="notification.type" :message="notification.message" :is-visible="notification.visibility">
          <button @click="notification.visibility = !notification.visibility" class="btn btn-sm btn-circle btn-ghost text-white">✕</button>
        </notifications>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from "@ionic/vue";
import { onMounted, ref, Ref } from "vue";
import { getAuth, fetchSignInMethodsForEmail, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { getDatabase, ref as dbRef, set } from "firebase/database";
import { useRouter } from "vue-router";
import Notifications from "@/components/Notifications.vue";

const auth = getAuth();
const database = getDatabase();
const key = ref(Date.now());
const notification = ref({
  message: "",
  type: "warning",
  visibility: false,
});
const router = useRouter();
const email: Ref<string> = ref("khusnul.ninno15@gmail.com");
const next: Ref<boolean> = ref(false);
const password: Ref<string> = ref("12345678");
const showPassword: Ref<boolean> = ref(false);

onMounted(() => {
  const uid = sessionStorage.getItem("uid");
  if (uid != null || uid != undefined) router.replace("/dashboard");
});

async function onSubmit() {
  if (!next.value) next.value = true;
  else {
    loginUser();
  }
}

async function loginUser() {
  try {
    console.log("Login");
    const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value);
    const user = userCredential.user;
    sessionStorage.setItem("uid", user.uid);
    setNotification("Login Berhasil", "success", true);
    await set(dbRef(database, "users/" + user.uid + "/status"), "active");
    router.replace("/pin");
  } catch (error) {
    setNotification("Login Gagal", "error", true);
    console.log(error);
  }
}

// async function registerUser() {
//   try {
//     console.log("Register");
//     const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value);
//     const user = userCredential.user;
//     sessionStorage.setItem("uid", user.uid);
//     await sendEmailVerification(user);
//     await set(dbRef(database, "users/" + user.uid), {
//       email: user.email,
//       uid: user.uid,
//       status: "active",
//     });
//     router.replace("/register");
//   } catch (error) {
//     loginUser();
//   }
// }

function setNotification(msg: string, type: string, visibility: boolean) {
  notification.value = {
    message: msg,
    type: type,
    visibility: visibility,
  };
  key.value = Date.now();
}
</script>
