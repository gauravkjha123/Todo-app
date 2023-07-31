let deleteArr = [];
let category = ["Persnol", "Work", "Cleaning", "School", "Other"];

function createCategorysList(category) {
  let container = document.getElementsByClassName("categoryList")[0];
  let CategoryText = document.getElementById("CategoryText");
  let categoryInput = document.getElementById("categoryInput");
  let ul = document.createElement("ul");
  ul.id = "category";
  for (let index = 0; index < category.length; index++) {
    let li = document.createElement("li");
    li.innerHTML = category[index];
    ul.append(li);
    li.addEventListener("click", function (event) {
      categorysDetailsContainer.style.backgroundColor = "white";
      categoryInput.value = event.target.innerHTML;
      CategoryText.innerHTML = event.target.innerHTML;
      container.style.display = "none";
      showCategory.innerHTML = `<i class="fas fa-caret-down"></i>`;
      isshowCategory = false;
      event.stopPropagation();
    });
  }
  container.append(ul);
  let showCategory = document.getElementById("showCategory");
  let categorysDetailsContainer =
    document.getElementsByClassName("categorys-details")[0];
  let isshowCategory = false;
  categorysDetailsContainer.addEventListener("click", function name() {
    if (!isshowCategory) {
      categorysDetailsContainer.style.backgroundColor = "#d3d3d3";
      container.style.display = "block";
      isshowCategory = true;
      showCategory.innerHTML = `<i class="fas fa-caret-up"></i>`;
    } else {
      categorysDetailsContainer.style.backgroundColor = "white";
      container.style.display = "none";
      isshowCategory = false;
      showCategory.innerHTML = `<i class="fas fa-caret-down"></i>`;
    }
  });
}

function createCalender() {
  let categoryAndDate = this.document.getElementsByClassName("date-details")[0];
  let showDate = document.getElementsByClassName("showDate")[0];
  let dateInput = document.getElementById("dateInput");
  categoryAndDate.addEventListener("mouseenter", function name() {
    showDate.style.display = "block";
  });
  categoryAndDate.addEventListener("mouseleave", function name() {
    showDate.style.display = "none";
  });
  categoryAndDate.addEventListener("click", function () {
    categoryAndDate.style.backgroundColor = "#d3d3d3";
    let flatpickrInstance = flatpickr(categoryAndDate, {
      onChange: function (selectedDates, dateStr) {
        categoryAndDate.style.backgroundColor = "white";
        let dateText = document.getElementById("dateText");
        dateInput.value =dateStr;
        dateText.innerHTML = dateStr;
      },
      onClose: function () {
        categoryAndDate.style.backgroundColor = "white";
      },
    });
    flatpickrInstance.open();
  });
}

function showError(errorMsg, isError = false) {
  let container = document.createElement("div");
  let msgContainer = document.createElement("div");

  msgContainer.innerHTML = errorMsg;
  container.classList.add("errorContainer");

  if (isError) {
    container.style.backgroundColor = "red";
  } else {
    container.style.backgroundColor = "green";
  }

  container.appendChild(msgContainer);
  document.body.appendChild(container);

  setTimeout(() => {
    container.classList.add("fade");
  }, 2000);
  setTimeout(() => {
    document.getElementsByClassName("errorContainer")[0].remove();
  }, 4500);
}

async function deleteList() {
  await fetch("http://localhost:3000/delete", {
    method: "POST",
    body: JSON.stringify({
      ids: deleteArr,
      name: "gaurav",
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  location.reload();
}

function addItemFordelete(event) {
    if (event.target.checked) {
      deleteArr.push(event.target.value);
    } else {
      let ind = deleteArr.indexOf(event.target.value);
      if (ind !== -1) {
        deleteArr.splice(ind, 1);
      }
    };
}

function addFocusFunctionality() {
  let descriptionDetailsContrainer = document.getElementsByClassName(
    "description-details"
  )[0];
  document
    .getElementById("taskName")
    .addEventListener("focus", function (event) {
      event.target.style.backgroundColor = "#d3d3d3";
      event.target.style.color = "black";
      descriptionDetailsContrainer.style.backgroundColor = "#d3d3d3";
    });
  document
    .getElementById("taskName")
    .addEventListener("blur", function (event) {
      event.target.style.backgroundColor = "white";
      event.target.style.color = "gray";
      descriptionDetailsContrainer.style.backgroundColor = "white";
    });
}

addEventListener("load", function () {
  createCalender();
  addFocusFunctionality();
  createCategorysList(category);
  let deleteBtn = document.getElementById("delete");
  deleteBtn.addEventListener("click", deleteList);
});
