// firebaseService.ts
import { Identity } from "./App";
import { db } from "./FirebaseConfig";
import { doc, setDoc } from "firebase/firestore";

export async function saveIdentityToFirestore(identity: Identity) {
  if (!identity.identityId) throw new Error("Identity ID is required");
  const identityRef = doc(db, "documentos", identity.identityId);
  await setDoc(identityRef, identity);
}
