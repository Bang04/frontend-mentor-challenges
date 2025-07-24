import { initializeApp } from "firebase/app"
import { collection, getDocs, getFirestore } from "firebase/firestore";

const firebaseConfig = {

}


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function getCities(db:any) {
    const citiesCol = collection(db, 'cities');
    const citySnapshot = await getDocs(citiesCol);
    const cityList = citySnapshot.docs.map(doc=>doc.data());
    return cityList;    
}