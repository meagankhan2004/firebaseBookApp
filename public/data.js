import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, query, where } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";
import firebaseConfig from './firebaseConfig.js';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function getBooks() {
  let response = await fetch('./books.json');
  let books = await response.json();
  return books;
}

async function getReviews(isbn, callback) {
  const q = query(collection(db, "reviews"), where("isbn", "==", isbn));
  const querySnapshot = await getDocs(q);
  let reviews = [];
  querySnapshot.forEach((doc) => {
    reviews.push({ id: doc.id, ...doc.data() });
  });
  callback(reviews);
}

async function createReview(auth, isbn, text) {
  await addDoc(collection(db, "reviews"), {
    isbn: isbn,
    text: text,
    author: auth.currentUser.uid,
    createdAt: new Date().toISOString()
  });
}

async function deleteReview(id) {
  await deleteDoc(doc(db, "reviews", id));
}

export { getBooks, getReviews, createReview, deleteReview };
