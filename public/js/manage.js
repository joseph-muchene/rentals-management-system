document.getElementById("clientBtn").onclick = function () {
  const roomNumber = document.getElementById("roomNumber").value;
  const rentedTo = document.getElementById("rentedTo").value;
  const rentAmount = document.getElementById("rentAmount").value;
  const dateOccuppied = document.getElementById("dateOccuppied").value;
  const numberOfBodies = document.getElementById("numberOfBodies").value;

  if (
    roomNumber === "" ||
    rentedTo === "" ||
    rentAmount === "" ||
    dateOccuppied === "" ||
    numberOfBodies === ""
  ) {
    return alert("All fields should not be empty");
  }

  firebase.auth().onAuthStateChanged((userCred) => {
    firebase
      .firestore()
      .collection("clients")
      .add({
        roomNumber,
        rentedTo,
        rentAmount,
        dateOccuppied,
        numberOfBodies,
        owner: userCred.email,
        status: "paid",
      })
      .then(() => {
        window.location.reload();
      });
  });
};

firebase.auth().onAuthStateChanged((userCred) => {
  // initialize firestore
  const db = firebase.firestore();
  // get clients from collection
  db.collection("clients")
    .where("owner", "==", userCred.email)
    .get()
    .then((querySnapshot) => {
      let content = "";
      querySnapshot.forEach((doc) => {
        //populate client data to table
        content += "<tr>";
        content += " <th>" + doc.data().roomNumber + "</th>";
        content += "  <td>" + doc.data().rentedTo + "</td>";
        content += "<td>" + doc.data().rentAmount + "</td>";
        content += "<td >" + doc.data().dateOccuppied + "</td>";
        content += "<td>" + doc.data().numberOfBodies + "</td>";
        content +=
          `<td style=${
            doc.data().status === "paid" ? "color:green" : "color:red"
          } >` +
          doc.data().status +
          "</td>";
        content += "</tr>";
      });

      $("#tableData").append(content);
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });
});

// logout
document.getElementById("logout").onclick = () => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      window.location.href = "/";
    })
    .catch((error) => {
      // An error happened.
    });
};

// redirect if not available
firebase.auth().onAuthStateChanged((userCred) => {
  if (!userCred) {
    window.location.href = "/register";
  }
});
