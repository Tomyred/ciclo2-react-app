import React, { useState } from "react";
import Table from "../../components/Table/Table";
import "./TodoList.css";
import uniqid from "uniqid";

const cabecera = ["Tarea", "Prioridad", "Acciones"];

const ToDoList = () => {
    const [tareas, setTareas] = useState([]);

    const [nuevaTarea, setNuevaTarea] = useState({});

    const handleInputChange = e => {
        setNuevaTarea({ ...nuevaTarea, [e.target.name]: e.target.value });

        console.log(nuevaTarea);
    };

    const handleClick = () => {
        if (nuevaTarea.taskName && nuevaTarea.taskName.length > 4) {
            if (nuevaTarea.priority) {
                setTareas([...tareas, { ...nuevaTarea, id: uniqid() }]);
            } else {
                alert("Debe asignarle una prioridad a la tarea");
            }
        } else {
            alert("Debe tener mas de 4 caracteres");
        }
    };

    const handleDelete = id => {
        const newArray = tareas.filter(tarea => {
            return tarea.id !== id;
        });

        setTareas(newArray);
    };

    const handleEdit = id => {
        const findedTask = tareas.find(task => {
            return task.id === id;
        });

        console.log(findedTask);
    };

    const setPriorityColor = priority => {
        const parsedPriority = Number(priority);

        if (parsedPriority <= 2) {
            return "green";
        } else if (parsedPriority === 3) {
            return "yellow";
        } else if (parsedPriority === 4) {
            return "orange";
        } else {
            return "red";
        }
    };

    return (
        <div className="todoList__container">
            <span> Nombre de la tarea </span>
            <br />
            <input
                type="text"
                name="taskName"
                onChange={handleInputChange}
                placeholder="Tarea"
            />
            <br />
            <span> Importancia </span>
            <br />
            <input
                className="range__input"
                name="priority"
                onChange={handleInputChange}
                type="range"
                min="1"
                max="5"
            />
            <button onClick={handleClick}> Agregar tarea </button>
            <table>
                <thead>
                    <tr>
                        {cabecera.map((text, index) => {
                            return <th key={index}> {text} </th>;
                        })}
                    </tr>
                </thead>
                <tbody>
                    {tareas.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td> {item.taskName} </td>
                                <td
                                    style={{
                                        background: setPriorityColor(
                                            item.priority
                                        ),
                                    }}
                                >
                                    {item.priority}
                                </td>
                                <td
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <span
                                        onClick={() => handleDelete(item.id)}
                                        className="material-icons pointer"
                                    >
                                        delete
                                    </span>
                                    <span
                                        onClick={() => handleEdit(item.id)}
                                        className="material-icons pointer"
                                    >
                                        edit
                                    </span>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default ToDoList;
