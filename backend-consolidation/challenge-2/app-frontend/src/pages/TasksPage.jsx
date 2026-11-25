import Navbar from '../components/Navbar.jsx';
import TaskCard from '../components/TaskCard.jsx';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import TaskForm from '../components/TaskForm.jsx';

const TasksPage = () => {
    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    useEffect(() => {
        async function fetchData() {
            try {
                let response = await fetch('/api/tasks');
                if (!response.ok) {
                    throw new Error(`Request failed: ${response.status}`);
                }
                const data = await response.json();
                setTasks(data);
                console.log(data);
            } catch (error) {
                console.log(`An error occured! \n ${error}`);
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        }
        fetchData();
    }, []);
     async function createTask(newTaskData) {
        try {
            const response = await fetch('/api/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...newTaskData,
                    userId: 1
                })
            });
            
            if (!response.ok) {
                throw new Error(`Request failed: ${response.status}`);
            }

            const data = await fetch('/api/tasks');
            if(!data.ok) {
                throw new Error(`Task was successfully created but refreshing the page failed.`);
            }
            const newTasks = await data.json();
            setTasks(newTasks);
        } catch (error) {
            console.log(`Ooops! An error occured! \n ${error}`);
            setError(error.message);
            throw error;
        }

    }

    return (
        <>
            <Navbar />
            {
                isLoading
                    ? <p>Loading tasks...</p>
                    : error.length > 0
                        ? <p>{error}</p>
                        : tasks.length === 0
                            ? <p>No tasks available, please create a task.</p>
                            : tasks.map((task, index) => <TaskCard key={task.id} task={task} number={index + 1} />)
            }
            {/*Link to test the task form */}
            <Link to="/taskform">Task form</Link>
            <TaskForm onCreateTask={createTask}/>
        </>
    );
}

export default TasksPage;