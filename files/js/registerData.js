const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const phoneNumber = document.getElementById("phoneNumber");
const country = document.getElementById("country");
const email = document.getElementById("email");
const userName = document.getElementById("userName");
const password = document.getElementById("password");
const button = document.querySelector("#subTinsedit");

const sendSignUpEmail = async () => {
  const data = {
    email: email.value,
  };
  fetch("https://my-guy-efabackend.onrender.com/api/signupemailsand", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then(async (response) => {
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Registration failed");
      }
      return result;
    })
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
      firstName: firstName.value,
      lastName: lastName.value,
      phoneNumber: phoneNumber.value,
      country: country.value,
      email: email.value,
      userName: userName.value,
      password: password.value,
    };

    console.log(data);
    button.innerHTML = "Loading...";

    fetch("https://my-guy-efa-back-end-beryl.vercel.app/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(async (response) => {
        const result = await response.json();
        if (!response.ok) {
          throw new Error(result.message || "Registration failed");
        }
        return result;
      })
      .then((response) => {
        if (response.success === false) {
          window.alert(response.message || "Registration failed");
          button.innerHTML = "Sign in";
          return;
        }

        localStorage.setItem("userId", JSON.stringify(response.data));
        sendSignUpEmail();
        console.log(response);
        const id = JSON.parse(localStorage.getItem("userId"));
        console.log("Local User Id", id);
        window.location.href = "https://thebitpaycoin-dashboard.vercel.app/#/";
      })
      .catch((error) => {
        console.log(error);
        window.alert(error.message || "Unable to register. Please try again.");
        button.innerHTML = "Sign in";
      });
  };
