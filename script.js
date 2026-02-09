let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let currentFilter = 'all';
const taskInput = document.getElementById('taskInput');
const dueDateInput = document.getElementById('dueDate');
const prioritySelect = document.getElementById('priority');
const taskList = document.getElementById('taskList');
const statsDiv = document.getElementById('stats');
// Save tasks
function saveTasks() {
localStorage.setItem('tasks', JSON.stringify(tasks));
}
// Add task
document.getElementById('addBtn').addEventListener('click', () => {
if (taskInput.value.trim() === '') return alert('Enter a task');
tasks.push({
text: taskInput.value,
priority: prioritySelect.value,
dueDate: dueDateInput.value,
completed: false
});
saveTasks();
taskInput.value = '';
dueDateInput.value = '';
renderTasks();
});
// Filters
document.querySelectorAll('.filters button').forEach(btn => {
btn.addEventListener('click', () => {
currentFilter = btn.dataset.filter;
renderTasks();
});
});
// Toggle completion
function toggleTask(index) {
tasks[index].completed = !tasks[index].completed;
saveTasks();
renderTasks();
}
// Edit task
function editTask(index) {
const newText = prompt('Edit task', tasks[index].text);
if (newText !== null && newText.trim() !== '') {
tasks[index].text = newText;
saveTasks();
renderTasks();
}
}
// Delete task
function deleteTask(index) {
if (confirm('Delete this task?')) {
tasks.splice(index, 1);
saveTasks();
renderTasks();
}
}
// Stats
function updateStats() {
const total = tasks.length;
const completed = tasks.filter(t => t.completed).length;
const pending = total - completed;
statsDiv.innerText = `Total: ${total} | Completed: ${completed} | Pending: ${pending}`;
}
// Render
function renderTasks() {
taskList.innerHTML = '';
tasks.forEach((task, index) => {
if (currentFilter === 'completed' && !task.completed) return;
if (currentFilter === 'pending' && task.completed) return;
if (['high','medium','low'].includes(currentFilter) && task.priority !== currentFilter) return;
const li = document.createElement('li');
li.className = `${task.priority} ${task.completed ? 'completed' : ''}`;
li.innerHTML = `
<div class="task-header">
<span onclick="toggleTask(${index})">${task.text}</span>
<div class="task-actions">
<button onclick="editTask(${index})">✏️</button>
<button onclick="deleteTask(${index})">❌</button>
</div>
</div>
<small>Due: ${task.dueDate || 'Not set'}</small>
`;
taskList.appendChild(li);
});
updateStats();
}
renderTasks();