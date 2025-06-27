// 🔁 Generate unique student/admin ID
async function generateUniqueUserId(role) {
  const counterRef = db.collection("counters").doc(role); // 'student' or 'admin'

  return await db.runTransaction(async (transaction) => {
    const doc = await transaction.get(counterRef);
    let newCount = 1;

    if (doc.exists) {
      newCount = doc.data().count + 1;
    }

    const padded = String(newCount).padStart(6, '0');
    const newId = (role === "admin" ? "ADM-" : "STD-") + padded;

    transaction.set(counterRef, { count: newCount });

    return newId;
  });
}
firebase.auth().createUserWithEmailAndPassword(email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    return db.collection("users").doc(user.uid).set({
      name: studentName,
      studentId: studentId,
      email: email,
      role: "student"
    });
  })
  .then(() => {
    // Redirect or show success
  })
  .catch((error) => {
    console.error(error.message);
  });
// firebase-config.js
const firebaseConfig = {
    apiKey: "AIzaSyCmY01W7nrK_SnKCGM4sblWna03KbLDEwU",
    authDomain: "uniserve-d990a.firebaseapp.com",
    projectId: "uniserve-d990a",
    storageBucket: "uniserve-d990a.appspot.com",
    messagingSenderId: "417274438534",
    appId: "1:417274438534:web:c7ff020cd9d8d19fd30207"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
const rtdb = firebase.database();
firebase.auth().onAuthStateChanged(async (user) => {
  if (user) {
    const doc = await firebase.firestore().collection("users").doc(user.email).get();
    if (doc.exists) {
      const data = doc.data();
      document.getElementById("studentName").value = `${data.first_name} ${data.last_name}`;
      document.getElementById("studentId").value = data.student_id;
    }
  }
});