import {useEffect, useState} from 'react';
import auth, {FirebaseAuthTypes} from "@react-native-firebase/auth";
import Purchases from "react-native-purchases";

export function useFirebaseUser(): [FirebaseAuthTypes.User | null, boolean] {

    const [isInitialized, setInitialized] = useState(false);
    const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

    useEffect(() => {
        auth().onAuthStateChanged(async (currentUser) => {
            if (currentUser) {
                await Purchases.logIn(currentUser.uid);
            } else {
                void Purchases.logOut()
            }
            setUser(currentUser)
            setInitialized(true)
        })
    }, []);

    return [user, isInitialized];
}