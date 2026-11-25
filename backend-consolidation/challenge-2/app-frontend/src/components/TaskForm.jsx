import { useState, useEffect } from 'react';
import '../styles/TaskForm.css';

const TaskForm = ({ onCreateTask }) => {

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        priority: 'medium'
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        console.log(formData);
    }, [formData]);


    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
        console.log(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccessMessage('');
        setErrorMessage('');
        setIsSubmitting(true);
        try {
            await onCreateTask(formData);
            setSuccessMessage('Task successfully created!');
            handleResponseMessage();
            setFormData({
                title: '',
                description: '',
                priority: 'medium'
            });
        } catch (error) {
            console.log(error);
            setErrorMessage(error.message);
        } finally {
            setIsSubmitting(false);
        }
        setFormData({
            title: '',
            description: '',
            priority: 'medium'
        });
    }

    function handleResponseMessage () {
        setTimeout(() => {
            document.querySelector('.response-message').classList.add('remove-message');
        },1000);
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
                <hr className="task-form-header-line" />
                <div className="task-form-title">
                    <p>Title</p>
                    <input
                        type="text" size={50}
                        placeholder="    e.g. Learn React "
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="task-form-description">
                    <p>Description</p>
                    <textarea
                        type="text"
                        size={50}
                        rows={4}
                        placeholder="    Add more details..."
                        name="description"
                        onChange={handleChange}
                        required
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
                <button
                    type="submit"
                    className="create-task-button"
                    disabled={isSubmitting}
                >
                    {
                        isSubmitting
                            ? "Creating task..."
                            : "+ Create Task"
                    }
                </button>
                {
                    successMessage && (
                        <p className="response-message">{successMessage}</p>
                    )
                }
                {
                    errorMessage && (
                        <p className="response-message">{errorMessage}</p>
                    )
                }
            </form>
        </>
    );
}

export default TaskForm;