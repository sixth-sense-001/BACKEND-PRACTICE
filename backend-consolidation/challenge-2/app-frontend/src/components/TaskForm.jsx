import { useState, useEffect } from 'react';
import '../styles/TaskForm.css';

const TaskForm = () => {

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        priority: 'medium'
    });

    useEffect (() => {
        console.log(formData);
    },[formData]);


    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
        console.log(value);
    };

    const handleSubmit = () => {
        console.log('Submitting...');
    }

    return (
        <>
            <form className="task-form" onSubmit={handleSubmit}>
                <div className="task-form-header">
                    <div className="task-form-header-plus-sign"><p>+</p></div>
                    <div>
                        <h3>Create New Task</h3>
                        <h5>Add a new task to your list</h5>
                    </div>
                </div>
                <hr className="task-form-header-line"/>
                <div className="task-form-title">
                    <p>Title</p>
                    <input
                        type="text" size={50}
                        placeholder="    e.g. Learn React "
                        name="title"
                        onChange={handleChange}
                    />
                </div>
                <div className="task-form-description">
                    <p>Description</p>
                    <input
                        type="text"
                        size={50}
                        placeholder="    Add more details..."
                        name="description"
                        onChange={handleChange}
                    />
                </div>
                <div className="task-form-priority">
                    <p>Priority</p>
                    <select 
                        name="priority"
                        value={formData.priority}
                        onChange={handleChange}
                    >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </div>
                <button className="create-task-button">+ Create Task</button>
            </form>
        </>
    );
}

export default TaskForm;