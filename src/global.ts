import { App } from "vue";
import { getAuth, fetchSignInMethodsForEmail } from 'firebase/auth';

export default {
    install: (app: App): void => {
        app.config.globalProperties.$chekEmailRegistered = (email: string): any => {
            const auth = getAuth()
            return fetchSignInMethodsForEmail(auth, email)
            .then((signInMethods) => {
                return signInMethods.length > 0
            })
            .catch((error) => {
                console.error(error);
                return false;
            });
        }
    }
}