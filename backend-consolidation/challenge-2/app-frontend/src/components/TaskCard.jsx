import '../styles/taskCard.css';
const TaskCard = ({ task , number}) => {
    console.log(task);
    return (
        <div className="task-card">
            <div className="task-title-and-status">
                <p className="task-title">{task.title}</p>
                <p className="task-status">{task.status}</p>
            </div>
            <p className="task-description">{task.description}</p>
            <hr/>
            <div className="task-card-footer">
                <p className="task-priority">Priority: {task.priority}</p>
                <p>Task #{number}</p>
            </div>
        </div>

        
    );
}

export default TaskCard;