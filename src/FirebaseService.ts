// firebaseService.ts
import { md5 } from "js-md5";
import { Identity } from "./App";
import { db } from "./FirebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";


/*
* create a function called checkDBWriter that receives a string called seedPhrase returns a boolean
* that checks if the seedPhrase is in the database and returns true if it is and false if it is not
* this validation gets the value from the firestore document called seedPhrase
* @param {string} seedPhrase - The seed phrase to check in the database.
* @returns {boolean} - Returns true if the seed phrase is in the database, false otherwise.
*/
export async function checkDBWriter(seedPhrase: string): Promise<boolean> {
  const seedPhraseRef = doc(db, "seedPhrases", "phrases");
  try {
    const docSnap = await getDoc(seedPhraseRef);
    if (!docSnap.exists()) {
      console.log("The data base is not initialized yet.");
      return false;
    }
    const data = docSnap.data();
    if (data && !data.admin) {
      console.log("No user roles were defined.");
      return false;
    }
    return data.admin === seedPhrase;
  } catch (error) {
    console.error("Error reading document:", error);
    return false;
  }
}

export function stringToMD5(input: string): string {
  const hash = md5(input);
  return hash;
}

export async function saveIdentityToFirestore(identity: Identity) {
  if (!identity.id) throw new Error("Identity ID is required");
  if (!checkDBWriter(stringToMD5(identity.seedPhrase))) throw new Error("Seed Phrase is required");
  const identityRef = doc(db, "documentos", identity.id);
  //use set doc to save all the fields of the identity object except the seedPhrase
  await setDoc(identityRef, {
    id: identity.id,
    name: identity.name,
    tipo: identity.tipo,
    privateKey: identity.privateKey,
    photo: identity.photo,
    dir: identity.dir,
    // Exclude seedPhrase from being saved directly to Firestore for security reasons
  });
}
