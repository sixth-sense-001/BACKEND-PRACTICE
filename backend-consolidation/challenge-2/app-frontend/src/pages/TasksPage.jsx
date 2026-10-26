import Navbar from '../components/Navbar.jsx';
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
                        : <p>Tasks loaded: {tasks.length}</p>
            }
        </>
    );
}

export default TasksPage;