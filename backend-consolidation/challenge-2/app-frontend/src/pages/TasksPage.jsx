import Navbar from '../components/Navbar.jsx';
import TaskCard from '../components/TaskCard.jsx';
import { useEffect, useState } from 'react';

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
                            : <TaskCard task= {tasks} number={tasks.length+1}/>
            }
        </>
    );
}

export default TasksPage;