const taskInput = document.querySelector("#taskInput");
const taskList = document.querySelector("#taskList");
const addButton = document.querySelector("#addBtn");
const totalCount = document.querySelector("#totalCount");
const completedCount = document.querySelector("#completedCount");

let tasks = [];

const updateUI = () => {
  taskList.innerHTML = renderTasks(tasks);
  updateFooter();
};

const handleTaskSubmit = () => {
  const text = taskInput.value.trim();

  if (text === "") return alert("Không được để trống");

  const newTask = {
    id: tasks.length + 1,
    name: text,
    completed: false,
  };

  tasks.push(newTask);

  taskInput.value = "";
  taskInput.focus();
  updateUI();
};

addButton.addEventListener("click", handleTaskSubmit);
taskInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") handleTaskSubmit();
});

const renderTasks = (tasks) => {
  if (!Array.isArray(tasks)) return "";

  return tasks
    .map((task) => {
      return `
         <div class="task-item ${task.completed ? "completed" : ""}" data-id="${task.id}">
          <input type="checkbox" class="task-checkbox " ${task.completed ? "checked" : ""}/><span class="task-text ${task.completed ? "completed" : ""}"
            >${task.name}</span
          >
          <div class="task-actions">
            <button class="btn-edit">✏️ Sửa</button
            ><button class="btn-delete">🗑️ Xóa</button>
          </div>
        </div>
    `;
    })
    .join("");
};

const updateFooter = () => {
  const total = tasks.length;
  const completed = tasks.filter((task) => task.completed).length;

  totalCount.textContent = total;
  completedCount.textContent = completed;
  if (total > 0 && completed === total) {
    statusText.textContent = "✔ Hoàn thành tất cả!";
    statusText.classList.add("show");
  } else {
    statusText.textContent = "";

    statusText.classList.remove("show");
  }
};

taskList.addEventListener("change", (e) => {
  if (!e.target.classList.contains("task-checkbox")) return;

  const taskItem = e.target.closest(".task-item");
  const id = +taskItem.dataset.id;

  const task = tasks.find((t) => t.id === id);
  if (!task) return;
  task.completed = e.target.checked;
  updateUI();
});

// Sửa
taskList.addEventListener("click", (e) => {
  if (!e.target.classList.contains("btn-edit")) return;

  const taskItem = e.target.closest(".task-item");
  const id = +taskItem.dataset.id;

  const task = tasks.find((t) => t.id === id);

  startEdit(taskItem, task);
});

const startEdit = (taskItem, task) => {
  taskItem.innerHTML = `
    <input type="text" class="edit-input" value="${task.name}" />

    <div class="task-actions">
      <button class="btn-save">💾 Lưu</button>
      <button class="btn-cancel">❌ Hủy</button>
    </div>
  `;

  const input = taskItem.querySelector(".edit-input");
  input.focus();

  const saveTask = () => {
    const newText = input.value.trim();
    if (!newText) return alert("Không được để trống");

    task.name = newText;
    updateUI();
  };

  const cancelEdit = () => {
    updateUI();
  };

  taskItem.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-save")) saveTask();
    if (e.target.classList.contains("btn-cancel")) cancelEdit();
  });

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") saveTask();
    if (e.key === "Escape") cancelEdit();
  });
};

// Xóa
taskList.addEventListener("click", (e) => {
  if (!e.target.classList.contains("btn-delete")) return;

  const taskItem = e.target.closest(".task-item");
  const id = +taskItem.dataset.id;

  if (!confirm("Cháu có chắc muốn xóa code này không")) return;

  tasks = tasks.filter((t) => t.id !== id);
  updateUI();
});
