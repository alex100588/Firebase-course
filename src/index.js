import {initializeApp } from 'firebase/app'
import {
    getFirestore, collection, onSnapshot, addDoc, deleteDoc, doc,
    query, where,
    orderBy, serverTimestamp,
    getDoc, updateDoc
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDgaIKzthfUBquCUSVEyDa8YYT_L7709jA",
    authDomain: "fir-9-dojo-668f8.firebaseapp.com",
    projectId: "fir-9-dojo-668f8",
    storageBucket: "fir-9-dojo-668f8.appspot.com",
    messagingSenderId: "314166565831",
    appId: "1:314166565831:web:ed4635d6958c7649c2d7e2"
  };

//   initialize firebase app
initializeApp(firebaseConfig)

//   initialize services
const db = getFirestore()

// collection ref
const colRef = collection(db, 'books')

// queries
const q = query(colRef, orderBy('createdAt'))

// get the collection data
// getDocs(colRef)
//     .then((snapshot)=>{
//     // console.log(snapshot.docs)
//     let books = []
//     snapshot.docs.forEach((doc)=>{
//         books.push({...doc.data(), id: doc.id})
//     })
//     console.log(books);
// })
// .catch((err)=>console.log(err.message))



// real time collection data
onSnapshot(q, (snapshot)=>{
    let books = []
    snapshot.docs.forEach((doc)=>{
        books.push({...doc.data(), id: doc.id})
    })
    console.log(books);
})

// adding documents
const addBookForm = document.querySelector('.add')
addBookForm.addEventListener('submit', (e) => {
  e.preventDefault()

  addDoc(colRef, {
    title: addBookForm.title.value,
    author: addBookForm.author.value,
    createdAt: serverTimestamp()
  })
  .then(() => {
    addBookForm.reset()
  })
})

// delete documents
const deleteBookForm = document.querySelector('.delete')
deleteBookForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const docRef = doc(db, 'books', deleteBookForm.id.value)

  deleteDoc(docRef)
    .then(() => {
      deleteBookForm.reset()
    })
})


// getting a single document
const docRef = doc(db, 'books', 'pl60vyPrs1hHRSrfRm3D')
getDoc(docRef)
    .then((doc)=>{
        console.log(doc.data(), doc.id);
    })


// updating a document
const updateForm = document.querySelector('.update')
updateForm.addEventListener('submit', (e) => {
  e.preventDefault()

  let docRef = doc(db, 'books', updateForm.id.value)

  updateDoc(docRef, {
    title: 'updated title'
  })
  .then(() => {
    updateForm.reset()
  })
})

onSnapshot(docRef, (doc) => {
    console.log(doc.data(), doc.id);
})
