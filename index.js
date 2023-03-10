const ServerResponse = document.getElementById("server-up");

const dashboard = document.getElementById("dashboard");
const dashboardSpan = document.getElementById("welcome-span");

const loginContainer = document.getElementById("login-container");
const loginFormDOM = document.getElementById("login-form");
const loginUsernameInputDOM = document.getElementById("login-username");
const loginPasswordInputDOM = document.getElementById("login-password");
const loginFormAlertDOM = document.getElementById("login-alert");

const editItemContainer = document.getElementById("edit-item-container");
const editItemFormDOM = document.getElementById("edit-item-form");
const editItemNameInputDOM = document.getElementById("edit-item-name");
const editItemCategoryInputDOM = document.getElementById("edit-item-category");
const editItemPriceInputDOM = document.getElementById("edit-item-price");
const editItemDescInputDOM = document.getElementById("edit-item-description");
const editItemFormAlertDOM = document.getElementById("edit-item-alert");

const addItemContainer = document.getElementById("add-item-container");
const addItemFormDOM = document.getElementById("add-item-form");
const addItemNameInputDOM = document.getElementById("add-item-name");
const addItemCategoryInputDOM = document.getElementById("add-item-category");
const addItemPriceInputDOM = document.getElementById("add-item-price");
const addItemDescInputDOM = document.getElementById("add-item-description");
const addItemFormAlertDOM = document.getElementById("add-item-alert");

const editUserContainer = document.getElementById("edit-user-container");
const editUserFormDOM = document.getElementById("edit-user-form");
const editUserUsernameInputDOM = document.getElementById("edit-user-username");
const editUserPasswordInputDOM = document.getElementById("edit-user-password");
const editUserAdminInputDOM = document.getElementById("edit-user-admin-role");
const editUserEditorInputDOM = document.getElementById("edit-user-editor-role");
const editUserFormAlertDOM = document.getElementById("edit-user-alert");
const pwdCheck = document.getElementById("password-checkbox");

const addUserContainer = document.getElementById("add-user-container");
const addUserFormDOM = document.getElementById("add-user-form");
const addUserUsernameInputDOM = document.getElementById("add-user-username");
const addUserPasswordInputDOM = document.getElementById("add-user-password");
const addUserAdminInputDOM = document.getElementById("add-user-admin-role");
const addUserEditorInputDOM = document.getElementById("add-user-editor-role");
const addUserFormAlertDOM = document.getElementById("add-user-alert");

const allItemsSection = document.getElementById("all-items-section");
const allItemsLoading = document.getElementById("all-items-loading-text");
const allItemsContainer = document.getElementById("all-items-container");

const allUsersSection = document.getElementById("all-users-section");
const allUsersLoading = document.getElementById("all-users-loading-text");
const allUsersContainer = document.getElementById("all-users-container");

const url = "https://moonlight-znjk.onrender.com";
let accessToken;
let TARGET_ITEM_ID;
let TARGET_USER_USERNAME;
ServerResponse.style.display = "flex";

//============= login form =============
loginFormDOM.addEventListener("submit", (e) => {
  e.preventDefault();
  const username = loginUsernameInputDOM.value;
  const password = loginPasswordInputDOM.value;
  loginFormAlertDOM.innerHTML = ``;
  fetch(`${url}/auth`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
    credentials: "include",
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        errorResponse(response, loginFormAlertDOM);
      }
    })
    .then((data) => {
      accessToken = data.accessToken;
    })
    .then(() => {
      dashboardSpan.innerHTML = `${loginUsernameInputDOM.value}`;
      loginUsernameInputDOM.value = "";
      loginPasswordInputDOM.value = "";
      changeDisplay(dashboard);
    })
    .catch((error) => console.error(error));
});

//============= edit item form =============
editItemFormDOM.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = editItemNameInputDOM.value;
  const category = editItemCategoryInputDOM.value;
  const price = editItemPriceInputDOM.value;
  const description = editItemDescInputDOM.value;
  editItemFormAlertDOM.innerHTML = ``;
  fetch(`${url}/data/${TARGET_ITEM_ID}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    },
    body: JSON.stringify({
      name: name,
      category: category,
      price: price,
      description: description,
    }),
    credentials: "include",
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        errorResponse(response, editItemFormAlertDOM);
      }
    })
    .then(() => {
      editItemNameInputDOM.value = "";
      editItemCategoryInputDOM.value = "";
      editItemPriceInputDOM.value = "";
      editItemDescInputDOM.value = "";
      changeDisplay(allItemsSection);
      showAllItems();
    })
    .catch((error) => {
      console.error(error);
    });
});

//============= add new item form =============
addItemFormDOM.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = addItemNameInputDOM.value;
  const category = addItemCategoryInputDOM.value;
  const price = addItemPriceInputDOM.value;
  const description = addItemDescInputDOM.value;
  addItemFormAlertDOM.innerHTML = ``;
  fetch(`${url}/data`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    },
    body: JSON.stringify({
      name: name,
      category: category,
      price: price,
      description: description,
    }),
    credentials: "include",
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        errorResponse(response, addItemFormAlertDOM);
      }
    })
    .then(() => {
      addItemNameInputDOM.value = "";
      addItemCategoryInputDOM.value = "";
      addItemPriceInputDOM.value = "";
      addItemDescInputDOM.value = "";
      changeDisplay(allItemsSection);
      showAllItems();
    })
    .catch((error) => {
      console.error(error);
    });
});

//============= edit user form =============
editUserFormDOM.addEventListener("submit", (e) => {
  e.preventDefault();
  const username = editUserUsernameInputDOM.value;
  const password = editUserPasswordInputDOM.value;
  const response = {
    username: username,
    password: password,
    roles: { user: 1984 },
  };
  password == "" || !password ? delete response.password : null;
  editUserAdminInputDOM.checked ? (response.roles.admin = 5150) : null;
  editUserEditorInputDOM.checked ? (response.roles.editor = 2001) : null;
  editUserFormAlertDOM.innerHTML = ``;
  fetch(`${url}/users/${TARGET_USER_USERNAME}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    },
    body: JSON.stringify(response),
    credentials: "include",
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        errorResponse(response, editUserFormAlertDOM);
      }
    })
    .then(() => {
      editUserUsernameInputDOM.value = "";
      editUserPasswordInputDOM.value = "";
      editUserAdminInputDOM.checked = false;
      editUserEditorInputDOM.checked = false;
      changeDisplay(allUsersSection);
      showAllUsers();
    })
    .catch((error) => {
      console.error(error);
    });
});

//============= add new user form =============
addUserFormDOM.addEventListener("submit", (e) => {
  e.preventDefault();
  const username = addUserUsernameInputDOM.value;
  const password = addUserPasswordInputDOM.value;
  const roles = { user: 1984 };
  addUserAdminInputDOM.checked ? (roles.admin = 5150) : null;
  addUserEditorInputDOM.checked ? (roles.editor = 2001) : null;
  addUserFormAlertDOM.innerHTML = ``;
  fetch(`${url}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    },
    body: JSON.stringify({ username, password, roles }),
    credentials: "include",
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        errorResponse(response, addUserFormAlertDOM);
      }
    })
    .then(() => {
      addUserUsernameInputDOM.value = "";
      addUserPasswordInputDOM.value = "";
      addUserAdminInputDOM.checked = false;
      addUserEditorInputDOM.checked = false;
      changeDisplay(allUsersSection);
      showAllUsers();
    })
    .catch((error) => {
      console.error(error);
    });
});

//password event listener for edit user
pwdCheck.addEventListener("change", () => {
  if (pwdCheck.checked) {
    editUserPasswordInputDOM.removeAttribute("disabled", "");
  } else {
    editUserPasswordInputDOM.setAttribute("disabled", "");
  }
});

// operation functions
function deleteItem() {
  fetch(`${url}/data/${TARGET_ITEM_ID}`, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(response.statusText);
      }
    })
    .then(() => {
      showAllItems();
    })
    .catch((error) => console.error(error));
}
function deleteUser() {
  fetch(`${url}/users/${TARGET_USER_USERNAME}`, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(response.statusText);
      }
    })
    .then(() => {
      showAllUsers();
    })
    .catch((error) => console.error(error));
}
function showItem() {
  changeDisplay(editItemContainer);
  fetch(`${url}/data/${TARGET_ITEM_ID}`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        errorResponse(response, editItemFormAlertDOM);
      }
    })
    .then((data) => {
      editItemNameInputDOM.value = data.item.name;
      editItemCategoryInputDOM.value = data.item.category;
      editItemPriceInputDOM.value = data.item.price;
      editItemDescInputDOM.value = data.item.description;
    })
    .catch((error) => console.error(error));
}
function showUser() {
  changeDisplay(editUserContainer);
  fetch(`${url}/users/${TARGET_USER_USERNAME}`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        errorResponse(response, editUserFormAlertDOM);
      }
    })
    .then((data) => {
      editUserUsernameInputDOM.value = data.user.username;
      editUserAdminInputDOM.checked = data.user.roles.admin ? true : false;
      editUserEditorInputDOM.checked = data.user.roles.editor ? true : false;
    })
    .catch((error) => console.error(error));
}
function showAllItems() {
  changeDisplay(allItemsSection);
  allItemsLoading.innerHTML = `Loading...`;
  allItemsLoading.style.display = "block";
  fetch(`${url}/data`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        errorResponse(response, allItemsLoading);
      }
    })
    .then((data) => {
      allItemsLoading.innerHTML = "";
      allItemsLoading.style.display = "none";
      const items = data.items;
      const allItems = items
        .map((item) => {
          return `<div class="single-item">
                  <h5>${item.name}</h5>
                  <div class="item-links">
                    <button type="button" class="edit-link" onclick="setItemTarget('${item._id}'),showItem()"> 
                      <i class="fas fa-edit"></i>
                    </button>
                    <button type="button" class="delete-btn" onclick="setItemTarget('${item._id}'),deleteItem()">
                      <i class="fas fa-trash"></i>
                    </button>
                  </div>
                </div>`;
        })
        .join("");
      allItemsContainer.innerHTML = allItems;
    })
    .catch((error) => {
      console.error(error);
    });
}
function showAllUsers() {
  changeDisplay(allUsersSection);
  allUsersLoading.innerHTML = `Loading...`;
  allUsersLoading.style.display = "block";
  fetch(`${url}/users`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        errorResponse(response, allUsersLoading);
      }
    })
    .then((data) => {
      allUsersLoading.innerHTML = "";
      allUsersLoading.style.display = "none";
      allUsersContainer.innerHTML = "";
      const users = data.users;
      users.forEach((user) => {
        const admin = user.roles.admin ? "A" : "";
        const editor = user.roles.editor ? "E" : "";
        const addContent = `<div class="single-item">
                              <h5>${user.username} <span>=> Role ${admin} ${editor}</span></h5>
                              <div class="item-links">
                                <button type="button" class="edit-link" onclick="setUserTarget('${user.username}'),showUser()"> 
                                  <i class="fas fa-edit"></i>
                                </button>
                                <button type="button" class="delete-btn" onclick="setUserTarget('${user.username}'),deleteUser()">
                                  <i class="fas fa-trash"></i>
                                </button>
                              </div>
                            </div>`;
        allUsersContainer.innerHTML += addContent;
      });
    })
    .catch((error) => {
      console.error(error);
    });
}

// global functions
function newAlert(target, message) {
  target.innerHTML = message;
  setTimeout(() => {
    target.innerHTML = "";
  }, 3000);
}
function setItemTarget(id) {
  TARGET_ITEM_ID = id;
}
function setUserTarget(username) {
  TARGET_USER_USERNAME = username;
}
function changeDisplay(target) {
  ServerResponse.style.display = "none";
  dashboard.style.display = "none";
  loginContainer.style.display = "none";
  addItemContainer.style.display = "none";
  editItemContainer.style.display = "none";
  addUserContainer.style.display = "none";
  editUserContainer.style.display = "none";
  allItemsSection.style.display = "none";
  allUsersSection.style.display = "none";
  target.style.display = "flex";
}
function logOut() {
  fetch(`${url}/logout`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + accessToken,
    },
    credentials: "include",
  })
    .then((response) => {
      if (response.status === 204) {
        accessToken = "";
        changeDisplay(loginContainer);
        const inputs = document.querySelectorAll("input");
        inputs.forEach((input) => {
          input.value = "";
          if (input.type == "checkbox") {
            input.checked = "false";
          }
        });
        allUsersContainer.innerHTML = "";
        allItemsContainer.innerHTML = "";
        return;
      } else {
        throw new Error(response.statusText);
      }
    })
    .catch((error) => console.error(error));
}

// for footer
let date = new Date().getFullYear();
let copy = document.getElementById("copy");
copy.innerHTML = `&copy; ${date}`;

//wait for server scale up
function ScaleUp() {
  fetch(`${url}/data`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  })
    .then((response) => response.json())
    .then(() => {
      changeDisplay(loginContainer);
    })
    .catch((error) => {
      ServerResponse.innerHTML = `<h1 style="color:red">An unexpected error occurred</h1><h2 style="color:red">try again later</h2>`;
      console.error(error);
    });
}
ScaleUp();

function errorResponse(response, target) {
  if (response.status === 400) {
    newAlert(target, `Username and password are required`);
    throw new Error(response.statusText);
  } else if (response.status === 401) {
    newAlert(target, "Unauthorized");
    throw new Error(response.statusText);
  } else if (response.status === 403) {
    newAlert(target, "Forbidden");
    throw new Error(response.statusText);
  } else if (response.status === 409) {
    newAlert(target, "username already exists");
    throw new Error(response.statusText);
  } else {
    newAlert(target, `An unexpected error occurred`);
    throw new Error(response.statusText);
  }
}
