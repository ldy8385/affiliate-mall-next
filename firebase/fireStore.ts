import {getFirestore} from "firebase/firestore/lite";
import {app} from "./firebaseClient";

const fireStore = getFirestore(app)
export default fireStore