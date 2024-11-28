import { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRotate } from '@fortawesome/free-solid-svg-icons'
import { api_link } from './data/settings';

function TaskManager({ userId }) {
    const [taskText, setTaskText] = useState('');
    const [tasks, setTasks] = useState([]);
    const [isLoading,  setIsLoading] = useState(false);

    useEffect(() => {
        fetchTasks();
    }, [userId]);

    // Функція для завантаження завдань
    const fetchTasks = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(api_link + `get_tasks.php?user_id=${userId}`);
            setTasks(response.data);
            setIsLoading(false);
        } catch (error) {
            console.error('Помилка при завантаженні завдань:', error);
            setIsLoading(false);
        }
    };

    // Функція для додавання нового завдання
    const addTask = () => {
        // 1. Додаємо нове завдання до стану
        const newTask = { id: Date.now(), task_text: taskText }; // Можемо тимчасово використати унікальний id
        setTasks([...tasks, newTask]);

        // 2. Відправляємо запит на сервер для збереження
        axios.post(api_link + 'add_task.php', {
            user_id: userId,
            task_text: taskText,
        })
        .then((response) => {
            if (response.data.success) {
                // Оновлюємо стан, якщо сервер повернув новий список або успішно додав завдання
                //fetchTasks(); // Завантажуємо оновлені завдання (якщо це необхідно)
            } else {
                console.error('Помилка при додаванні завдання:', response.data.message);
            }
        })
        .catch((error) => {
            console.error('Помилка запиту на сервер:', error);
        });

        // Очищаємо поле введення
        setTaskText('');
    };

    // Функція для видалення завдання
    const deleteTask = (taskId) => {
        // 1. Видаляємо завдання з інтерфейсу (тимчасово)
        const updatedTasks = tasks.filter(task => task.id !== taskId);
        setTasks(updatedTasks);

        // 2. Відправляємо запит на сервер для видалення
        axios.post(api_link + 'delete_task.php', {
            user_id: userId,
            task_id: taskId
        })
        .then((response) => {
            if (response.data.success) {
                // Можна оновити завдання з сервера, якщо це необхідно
                fetchTasks();
            } else {
                console.error('Помилка при видаленні завдання:', response.data.message);
            }
        })
        .catch((error) => {
            console.error('Помилка запиту на сервер при видаленні:', error);
        });
    };

    return (
        <div className='container'>
            <div className="add-task-panel alert alert-dismissible alert-light">
                <input
                    type="text"
                    value={taskText}
                    onChange={(e) => setTaskText(e.target.value)}
                    placeholder="Нове завдання"
                    className="form-control"
                />
                <button className="btn btn-outline-primary" onClick={addTask}>Додати завдання</button>
            </div>

            <div className={isLoading ? 'rotate-img rotate-forever' : 'hidden'}>
                <FontAwesomeIcon icon={faRotate} />
            </div>

            <div className='tasks'>
                {tasks.map((task) => (
                    <div key={task.id} className="alert alert-dismissible alert-light">
                        {task.task_text}
                        <button type="button" className="btn-close" onClick={() => deleteTask(task.id)}></button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TaskManager;
