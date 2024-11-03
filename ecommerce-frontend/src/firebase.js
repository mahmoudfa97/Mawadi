
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, getRedirectResult, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAEBnzrhKzo61wNwJmi3NHJk7pzbldF2ng",
  authDomain: "mawadi-ec01d.firebaseapp.com",
  projectId: "mawadi-ec01d",
  storageBucket: "mawadi-ec01d.appspot.com",
  messagingSenderId: "554330973324",
  appId: "1:554330973324:web:3a8588f6a4317e93f647a9",
  measurementId: "G-45W2150E4S",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  promp: "select_account",
});
export const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = () => signInWithGoogleRedirect(auth, provider);
export const RedirectResults = () =>
  getRedirectResult(auth)
    .then((res) => {
      createUserDocFromAuth(res?.user);
    })
    .catch((error) => {
      console.error(error);
    });


export const db = getFirestore();
export const createUserDocFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, { displayName, email, createdAt });
    } catch (err) {
      console.log("error creating the user", err);
    }
  }
  return userDocRef;
};
