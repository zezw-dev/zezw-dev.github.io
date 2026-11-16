const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const tasksCount = document.getElementById('tasksCount');
const clearCompletedBtn = document.getElementById('clearCompleted');
const filterBtns = document.querySelectorAll('.filter-btn');

// استرجاع المهام المحفوظة من ذاكرة المتصفح
let tasks = JSON.parse(localStorage.getItem('zezw_tasks')) || [];
let currentFilter = 'all';

// دالة حفظ المهام في ذاكرة الهاتف الدائمة
function saveTasks() {
    localStorage.setItem('zezw_tasks', JSON.stringify(tasks));
}

// دالة عرض المهام على الشاشة حسب الفلتر المختار
function renderTasks() {
    taskList.innerHTML = '';

    const filteredTasks = tasks.filter(task => {
        if (currentFilter === 'pending') return !task.completed;
        if (currentFilter === 'completed') return task.completed;
        return true;
    });

    filteredTasks.forEach(task => {
        const li = document.createElement('li');
        li.className = `task-item ${task.completed ? 'completed' : ''}`;

        li.innerHTML = `
            <span class="task-text" onclick="toggleTask(${task.id})">
                ${task.completed ? '✅' : '⬜'} ${task.text}
            </span>
            <button class="delete-btn" onclick="deleteTask(${task.id})">حذف</button>
        `;

        taskList.appendChild(li);
    });

    const pendingCount = tasks.filter(t => !t.completed).length;
    tasksCount.textContent = `${pendingCount} مهام متبقية`;
}

// إضافة مهمة جديدة
function addTask() {
    const text = taskInput.value.trim();
    if (text === '') return;

    const newTask = {
        id: Date.now(),
        text: text,
        completed: false
    };

    tasks.unshift(newTask);
    taskInput.value = '';
    saveTasks();
    renderTasks();
}

// تغيير حالة المهمة (مكتملة / قيد التنفيذ)
window.toggleTask = function(id) {
    tasks = tasks.map(task => 
        task.id === id ? { ...task, completed: !task.completed } : task
    );
    saveTasks();
    renderTasks();
};

// حذف مهمة محددة
window.deleteTask = function(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    renderTasks();
};

// مسح جميع المهام المكتملة دفعة واحدة
clearCompletedBtn.addEventListener('click', () => {
    tasks = tasks.filter(task => !task.completed);
    saveTasks();
    renderTasks();
});

// تشغيل أزرار الفلترة
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.filter;
        renderTasks();
    });
});

// الأحداث عند الضغط على زر الإضافة أو زر Enter
addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
});

// التشغيل الأولي عند فتح التطبيق
renderTasks();
