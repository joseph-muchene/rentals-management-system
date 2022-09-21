import express from "express";
const app = express();

import { collection, getDocs, doc, setDoc } from "firebase/firestore";
import { db } from "./config.js";
// update each document on due
// current date
function getDueDate(date) {
  // check due payment for date 2/3/4

  const currentDate = new Date();
  const month = currentDate.getMonth() + 1;
  const day = currentDate.getDate();
  const year = currentDate.getFullYear();

  const formated = `${month}/${day}/${year}`;

  console.log("current date", formated);
  // check if the date is equal to current date
  // check if the month is equal to the next month
  // year will be the same year
  console.log("Date of entry", date);
  let dateOfPayment;
  let paymentStatus;
  function getNextMonth() {
    // format-- year-month-date
    const fDate = new String(date).split("-");

    const day = fDate[2];
    const month = fDate[1];
    const year = fDate[0];

    dateOfPayment = `${new String(Number(month) + 1)}/${day}/${year}`;
    console.log("Date of payment", dateOfPayment);

    if (formated === dateOfPayment) {
      paymentStatus = "payment is due";
    } else {
      paymentStatus = "";
    }
  }
  getNextMonth();
  return paymentStatus;
}

getDueDate();

// get collection and do the magic
async function getCollection() {
  const querySnapshot = await getDocs(collection(db, "clients"));
  querySnapshot.forEach((docData) => {
    // doc.data() is never undefined for query doc snapshots
    console.log("status info", getDueDate(docData.data().dateOccuppied));

    const userRef = doc(db, "clients", docData.id);
    setDoc(
      userRef,
      { status: getDueDate(docData.data().dateOccuppied) },
      { merge: true }
    );

    console.log(docData.id);
  });
}
getCollection();
app.get("/", (req, res) => {
  return res.sendFile(__dirname + "/public/index.html");
});

app.get("/login", (req, res) => {
  return res.sendFile(__dirname + "/public/login.html");
});

app.get("/register", (req, res) => {
  return res.sendFile(__dirname + "/public/register.html");
});

app.get("/manage", (req, res) => {
  return res.sendFile(__dirname + "/public/manage.html");
});
app.get("/login.js", (req, res) => {
  return res.sendFile(__dirname + "/public/js/login.js");
});
app.get("/manage.js", (req, res) => {
  return res.sendFile(__dirname + "/public/js/manage.js");
});
app.get("/main.js", (req, res) => {
  return res.sendFile(__dirname + "/public/js/main.js");
});

app.get("/home.js", (req, res) => {
  return res.sendFile(__dirname + "/public/js/home.js");
});

app.get("/config.js", (req, res) => {
  return res.sendFile(__dirname + "/public/js/config.js");
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
