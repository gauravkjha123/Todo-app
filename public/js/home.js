let deleteArr = [];
function createCategorysList(res) {
  let container = document.getElementsByClassName("categoryList")[0];
  let CategoryText = document.getElementById("CategoryText");
  let ul = document.createElement("ul");
  ul.id = "category";
  for (let index = 0; index < res.length; index++) {
    let li = document.createElement("li");
    li.innerHTML = res[index].name;
    li.setAttribute("categoryId", `${res[index].id}`);
    ul.append(li);
    li.addEventListener("click", function (event) {
      categorysDetailsContainer.style.backgroundColor = "white";
      CategoryText.innerHTML = event.target.innerHTML;
      CategoryText.setAttribute("categoryId", `${res[index].id}`);
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
let arr = [{ id: 1, name: "Persnol", color: "green" }];
let arr2 = [
  {
    id: 1,
    name: "task1",
    createdAt: "12 jul 2013",
    category: {
      name: "work",
      color: "pink",
    },
  },
  {
    id: 2,
    name: "task2",
    createdAt: "12 jul 2013",
    category: {
      name: "persnol",
      color: "red",
    },
  },
  {
    id: 3,
    name: "task3",
    createdAt: "12 jul 2013",
  },
];

function createTaskList(res) {
  let taskListContainer = document.getElementById("taskList");
  for (let index = 0; index < res.length; index++) {
    let container = document.createElement("div");
    let taskContainer = document.createElement("div");
    let checkBoxContainer = document.createElement("div");
    let checkBox = document.createElement("input");
    let taskDetailsContainer = document.createElement("div");
    let taskName = document.createElement("p");
    let dateContainer = document.createElement("div");
    let calenderIconContainer = document.createElement("div");
    let dateText = document.createElement("p");
    let categoryShowbtn = document.createElement("div");

    checkBox.type = "checkBox";

    container.classList.add("flex");
    container.classList.add("upper-border");
    container.classList.add("taskListContainer");
    taskContainer.classList.add("flex");
    dateContainer.classList.add("flex");
    dateContainer.classList.add("dateContainer");
    categoryShowbtn.classList.add("categoryShowbtn");
    taskContainer.classList.add("taskContainer");
    checkBoxContainer.classList.add("checkBoxContainer");
    taskDetailsContainer.classList.add("taskDetailsContainer");

    if (res[index]?.category) {
      categoryShowbtn.innerHTML = res[index].category?.name;
      categoryShowbtn.style.backgroundColor = res[index]?.category?.color;
    }

    taskName.innerHTML = res[index].name;
    dateText.innerHTML = res[index].createdAt;
    calenderIconContainer.innerHTML = `<i class="far fa-calendar-minus"></i>`;

    checkBoxContainer.append(checkBox);
    dateContainer.append(calenderIconContainer, dateText);
    taskDetailsContainer.append(taskName, dateContainer);
    taskContainer.append(checkBoxContainer, taskDetailsContainer);
    container.append(taskContainer, categoryShowbtn);
    taskListContainer.appendChild(container);

    checkBox.addEventListener("change", function (event) {
      if (event.target.checked) {
        deleteArr.push(res[index].id);
      } else {
        let ind = deleteArr.indexOf(res[index].id);
        if (ind !== -1) {
          deleteArr.splice(ind, 1);
        }
      }
    });
  }
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

async function createList() {
  let taskName = document.getElementById("taskName").value;
  let category = document
    .getElementById("CategoryText")
    .getAttribute("categoryId");
  let dueDate = document.getElementById("dateText").innerHTML;

  if (!taskName) {
    showError("Please write task name",true);
    return;
  }
  if (!category) {
    showError("Please Select category",true);
    return;
  }
  if (dueDate === "dd/mm//yyyy") {
    dueDate = "";
  }

  let data = {
    name: taskName,
    date: dueDate,
    category: category,
  };
  await fetch("http://localhost:3000/create", {
    method: "POST",
    data: JSON.stringify(data),
  });
}

async function deleteList() {
    await fetch("http://localhost:3000/delete", {
        method: "POST",
        data: JSON.stringify({ids:deleteArr}),
      });
}

function createCalender() {
  let categoryAndDate = this.document.getElementsByClassName("date-details")[0];
  let showDate = document.getElementsByClassName("showDate")[0];
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
        dateText.innerHTML = new Date(dateStr).toLocaleString().slice(0, -10);
      },
      onClose: function () {
        categoryAndDate.style.backgroundColor = "white";
      },
    });
    flatpickrInstance.open();
  });
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
  let addBtn = document.getElementById("add");
  let deleteBtn = document.getElementById("delete");
  addBtn.addEventListener("click", createList);
  deleteBtn.addEventListener("click", createList);
});

async function getCategorys() {
  let res = await fetch("http://localhost:3000/category");
  let categorys = await res.json();
  categorys = arr;
  if (categorys && categorys.length > 0) {
    createCategorysList(categorys);
  }
  await getList();
}

async function getList() {
  let res = await fetch("http://localhost:3000");
  let list = await res.json();
  if (list && list.length > 0) {
    createTaskList(list);
  }
}
getCategorys();
