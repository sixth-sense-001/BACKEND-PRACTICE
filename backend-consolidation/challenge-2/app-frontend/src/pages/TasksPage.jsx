import Navbar from '../components/Navbar.jsx';
import { useEffect } from 'react';

const TasksPage = () => {
    useEffect(() => {
        async function fetchData() {
            try {
                let data = await fetch('https://animated-waddle-v6ww969gqq94c6wxv-5000.app.github.dev/tasks');
                console.log(JSON.parse(data));
            } catch ( error ) {
                console.log(`An error occured! \n ${error}`);
            }
        }
        fetchData();
    }, []);

    return (
        <>
            <Navbar />
            <p>This is the Tasks page</p>
        </>
    );
}

export default TasksPage;