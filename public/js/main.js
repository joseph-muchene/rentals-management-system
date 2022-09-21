document.getElementById("registerBtn").onclick = function (e) {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const password = document.getElementById("password").value;
  const description = document.getElementById("description").value;
  const propertyName = document.getElementById("propertyName").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const email = document.getElementById("email").value;

  if (
    name === "" ||
    password === "" ||
    description === "" ||
    email === "" ||
    confirmPassword === "" ||
    propertyName === ""
  ) {
    return alert("All fields should not be empty");
  }
  console.log(password, confirmPassword);
  if (password !== confirmPassword) {
    return console.log("password does not match");
  }

  try {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCred) => {
        if (userCred) {
          console.log(userCred);
          const db = firebase.firestore();
          const propertyData = db.collection("properties").doc();

          propertyData
            .set({
              Owner: name,
              description,
              propertyPhoto: JSON.parse(localStorage.getItem("photo")),
              propertyName,
              email,
            })
            .then(() => {
              localStorage.clear();
              console.log("added successfully");
              window.location.href = "/login";
            })
            .catch((err) => console.log(err.message));
        }
      });
  } catch (ex) {
    throw new Error(ex);
  }
};

document.getElementById("upload").onclick = function (e) {
  e.preventDefault();
  uploadImage();
};

function uploadImage() {
  //getting the image file from input
  let profileImage = document.getElementById("file").files[0];

  //creating a storage reference
  let storageRef = firebase.storage().ref();

  //creating child (just naming the image location and image name)
  let uploadTask = storageRef
    .child("Profile/")
    .child(Math.random() + profileImage.name)
    .put(profileImage);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      //trying to estimate the % of image uploaded
      let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      let wholeNumber = Math.round(progress);

      //showing the progress on html
      document.getElementById("progressbar").innerText =
        wholeNumber + "%. Uploading";

      //progressbar
      document.getElementById("progressbar").style.width = wholeNumber + "%";

      if (progress === 100) {
        //showing the progress on html
        document.getElementById("progressbar").innerText =
          "successfully uploaded";
      }
    },
    (error) => {
      //if we encounter an error, here is where we will do the logic
      console.log(error);
    },
    () => {
      //handle successful uploads

      //here we ar getting the image's url afte upload
      uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
        localStorage.setItem("photo", JSON.stringify(downloadURL));
      });
    }
  );
}
