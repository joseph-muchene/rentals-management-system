let db = firebase.firestore();

document.getElementById("searchBtn").onclick = (e) => {
  e.preventDefault();
  const val = document.getElementById("search").value;

  if (val.length > 0) {
    document.getElementById("propertyData").innerHTML = null;
    // get properties
    db.collection("properties")
      .where("propertyName", "==", val)
      .get()
      .then((querySnapshot) => {
        let content = "";
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          // console.log(doc.id, " => ", doc.data());
          console.log(doc.data());
          content += "<div class=col-sm mb-4>";
          content +=
            "<h1 class=text-center>" + doc.data().propertyName + "</h1>";
          content += "<div class=card style=width: 18rem>";
          content += `<img src=${
            doc.data().propertyPhoto
              ? doc.data().propertyPhoto
              : "https://cf.bstatic.com/xdata/images/hotel/max1024x768/318461498.jpg?k=6e0c5f10dada0e171e6359e83a4435206b659c2f3fd1aa44610fbdab8b1f19ed&o=&hp=1"
          } class=card-img-top a lt=... />`;
          content += "<div class=card-body>";
          content += "<p class=card-text>" + doc.data().description + "</p>";
          content += "</div>";
          content += "</div>";
          content += "</div>";
        });
        $("#propertyData").append(content);
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  }
};

// get properties
db.collection("properties")
  .get()
  .then((querySnapshot) => {
    let content = "";
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, " => ", doc.data());
      console.log(doc.data());
      content += "<div class=col-md-4 mb-4>";
      content += "<h1 class=text-center>" + doc.data().propertyName + "</h1>";
      content += "<div class=card style=width: 18rem>";
      content += `<img src=${
        doc.data().propertyPhoto
          ? doc.data().propertyPhoto
          : "https://cf.bstatic.com/xdata/images/hotel/max1024x768/318461498.jpg?k=6e0c5f10dada0e171e6359e83a4435206b659c2f3fd1aa44610fbdab8b1f19ed&o=&hp=1"
      } class=img-fluid style="height:60vh" a lt=... />`;
      content += "<div class=card-body>";
      content += "<p class=card-text>" + doc.data().description + "</p>";
      content += "</div>";
      content += "</div>";
      content += "</div>";
    });
    $("#propertyData").append(content);
  })
  .catch((error) => {
    console.log("Error getting documents: ", error);
  });

document.getElementById("startedBtn").onclick = () => {
  console.log("hell");
  if (firebase.auth().currentUser) {
    window.location.href = "/manage";
  } else {
    window.location.href = "/register";
  }
};
