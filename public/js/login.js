// login user
document.getElementById("loginBtn").onclick = function () {
  const password = document.getElementById("password").value;
  const email = document.getElementById("email").value;

  if (email === "" || password === "") {
    return alert("All fields should not be empty");
  }
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCred) => {
      window.location.href = "/manage";
    })
    .catch((ex) => {
      throw new Error(ex);
    });
};
