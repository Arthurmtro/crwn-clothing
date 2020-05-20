import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
    apiKey: "AIzaSyBwDAznskWOxL9fIh2HR2waMbo_T0pZxUQ",
    authDomain: "crwn-db-5a465.firebaseapp.com",
    databaseURL: "https://crwn-db-5a465.firebaseio.com",
    projectId: "crwn-db-5a465",
    storageBucket: "crwn-db-5a465.appspot.com",
    messagingSenderId: "81643056093",
    appId: "1:81643056093:web:058953bddcbf1d13eb2434",
    measurementId: "G-YRCNYCDM12"
}

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return

    const userRef = firestore.doc(`users/${userAuth.uid}`)

    const snapShot = await userRef.get()
    
    if(!snapShot.exists) {
        const { displayName, email } = userAuth
        const createdAt = new Date()

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('Error creating user', error.message)
            
        }
    }

    return userRef
}

firebase.initializeApp(config)


export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({ prompt: 'select_account' })
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase