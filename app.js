let tableBody = document.querySelector("tbody");
let form = document.querySelector(".form");
let submitBtn = document.querySelector("#submit");
let clearBtn = document.querySelector("#clearList");

let firstNameInput = document.querySelector("#firstname");
let lastNameInput = document.querySelector("#lastname");
let emailInput = document.querySelector("#email");
let phoneNumberInput = document.querySelector("#phonenumber");

let userData = JSON.parse(localStorage.getItem("userData")) || [];

let updateIndex = -1;

const loadTable = () => {
  tableBody.innerHTML = "";
  if (userData) {
    userData.forEach((user, index) => {
      let tr = document.createElement("tr");

      let tdFirstname = document.createElement("td");
      let tdLastName = document.createElement("td");
      let tdEmail = document.createElement("td");
      let tdPhone = document.createElement("td");
      let tdActions = document.createElement("td");

      let deleteButton = document.createElement("button");
      let updateButton = document.createElement("button");
      let duplicateButton = document.createElement("button");

      deleteButton.innerText = "Delete";
      updateButton.innerText = "Update";
      duplicateButton.innerText = "Duplicate";

      deleteButton.addEventListener("click", () => {
        deleteUser(index);
      });

      updateButton.addEventListener("click", () => {
        updateUser(index);
      });
      duplicateButton.addEventListener("click", () => {
        duplicateUser(index);
      });

      tdFirstname.innerText = user.firstName;
      tdLastName.innerText = user.lastName;
      tdEmail.innerText = user.email;
      tdPhone.innerText = user.phoneNumber;

      tdActions.appendChild(deleteButton);
      tdActions.appendChild(updateButton);
      tdActions.appendChild(duplicateButton);

      tableBody.append(tr);
      tr.appendChild(tdFirstname);
      tr.appendChild(tdLastName);
      tr.appendChild(tdEmail);
      tr.appendChild(tdPhone);
      tr.appendChild(tdActions);
    });
  }
};

loadTable();

form.addEventListener("submit", (event) => {
  event.preventDefault();
  let formData = new FormData(form);

  let firstName = formData.get("firstname");
  let lastName = formData.get("lastname");
  let email = formData.get("email");
  let phoneNumber = formData.get("phonenumber");

  if (!firstName) {
    alert("Enter FirstName please");
    return;
  } else if (!lastName) {
    alert("Enter LastName");
    return;
  } else if (!email) {
    alert("Enter Email please");
    return;
  } else if (!phoneNumber) {
    alert("Enter Phone Number please");
    return;
  }

  if (updateIndex >= 0) {
    userData[updateIndex] = {
      firstName,
      lastName,
      email,
      phoneNumber,
    };
    updateIndex = -1;
    submitBtn.innerHTML = "Add";
  } else {
    userData.push({
      firstName,
      lastName,
      email,
      phoneNumber,
    });
  }

  localStorage.setItem("userData", JSON.stringify(userData));
  loadTable();

  form.reset();
});

function deleteUser(index) {
  let text = "Do you want to delete that particular record??";

  if (confirm(text) == true) {
    userData.splice(index, 1);
    localStorage.setItem("userData", JSON.stringify(userData));
    loadTable();
  }
}

function duplicateUser(index) {
  let newUser = { ...userData[index] };
  userData.push(newUser);
  localStorage.setItem("userData", JSON.stringify(userData));
  loadTable();
}

function updateUser(index) {
  updateIndex = index;
  let existingUserData = { ...userData[index] };

  firstNameInput.value = existingUserData.firstName;
  lastNameInput.value = existingUserData.lastName;
  emailInput.value = existingUserData.email;
  phoneNumberInput.value = existingUserData.phoneNumber;

  submitBtn.innerHTML = "Update";
}

clearBtn.addEventListener("click", (event) => {
  userData = [];
  localStorage.setItem("userData", JSON.stringify(userData));
  loadTable();
});
