import { getDatabase, ref, set, onValue } from "firebase/database";

export function writeUserData(id, email, favorites) {
  const db = getDatabase();
  set(ref(db, "users/" + id), {
    email: email,
    favorites,
  });
}

export function readUserData(id, callback) {
  const db = getDatabase();
  const emailRef = ref(db, "users/" + id);

  onValue(emailRef, (snapshot) => {
    const data = snapshot.val();
    callback(data);
  });
}
