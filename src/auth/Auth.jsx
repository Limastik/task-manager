import { useState } from 'react';
import axios from 'axios';
import TaskManager from '../TaskManager'; // Підключаємо TaskManager
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRotate } from '@fortawesome/free-solid-svg-icons'
import { api_link } from '../data/settings';

function Auth() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Стан для перевірки чи користувач залогінений
    const [userId, setUserId] = useState(null); // Зберігаємо ID користувача після логіну

    const [isLoginVisible, setIsLoginVisible] = useState(false);
    const [isLoading,  setIsLoading] = useState(false);

    const toggleLoginVisiblity = () => {
        setIsLoginVisible(!isLoginVisible);
    };

    // Функція для реєстрації користувача
    const register = async () => {
        try {
            setIsLoading(true);
            const response = await axios.post(api_link + 'register.php', {
                username,
                email,
                password
            });
            setIsLoading(false);
            if (response.data.message === "Користувач успішно зареєстрований") {
                console.log('Реєстрація успішна! Тепер увійдіть.');
                toggleLoginVisiblity();
            }
        } catch (error) {
            console.error('Помилка реєстрації:', error);
        }
    };

    // Функція для логіну
    const login = async () => {
        try {
            setIsLoading(true);
            const response = await axios.post(api_link + 'login.php', {
                email,
                password
            });
            setIsLoading(false);
            if (response.data.success) {
                console.log(response.data);
                setUserId(response.data.user_id); // Зберігаємо ID користувача
                setIsLoggedIn(true); // Ставимо користувача як залогіненого
                console.log("Успішний вхід")
            } else {
                alert('Неправильний логін або пароль');
            }
        } catch (error) {
            console.error('Помилка логіну:', error);
        }
    };

    // Якщо користувач залогінений, відображаємо TaskManager

    
    if (isLoggedIn) {
        return <TaskManager userId={userId} />; // Передаємо userId в компонент TaskManager
    }

    // Форма реєстрації та логіну
    return (
        <div className="container auth-container">
            <div className="auth-bg card bg-light mb-3">
            <div className={isLoginVisible ? '' : 'hidden'}>
            <h2>Реєстрація</h2>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Ім'я користувача"
                    className='form-control'
                />
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className='form-control'
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Пароль"
                    className='form-control'
                />
    
            <button onClick={register} className="btn btn-outline-primary">Зареєструватись</button>
            <button onClick={toggleLoginVisiblity} className="btn btn-outline-secondary">Логін</button>
            <div className={isLoading ? 'rotate-img rotate-forever' : 'hidden'}>
                <FontAwesomeIcon icon={faRotate} />
            </div>
            </div>

            

            <div className={!isLoginVisible ? '' : 'hidden'}>
            <h2>Логін</h2>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className='form-control'
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Пароль"
                className='form-control'
            />

            <button onClick={login} className="btn btn-outline-primary">Увійти</button> 
            <button onClick={toggleLoginVisiblity} className="btn btn-outline-secondary">Реєстрація</button>
            <div className={isLoading ? 'rotate-img rotate-forever' : 'hidden'}>
                <FontAwesomeIcon icon={faRotate} />
            </div>
            </div>

        </div>
    </div>
    );
}

export default Auth;
