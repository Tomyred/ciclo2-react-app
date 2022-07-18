import React, { useState } from "react";
import Table from "../../components/Table/Table";
import "./TodoList.css";
import uniqid from "uniqid";

// const foo = {
//     taskName: "Hacer la cama",
//     priority: 1,
// }

// foo["priority"]
//     ===
// foo.priority

const cabecera = ["Tarea", "Prioridad", "Acciones"];

const ToDoList = () => {
    const [tareas, setTareas] = useState([]);

    const [nuevaTarea, setNuevaTarea] = useState({});

    const handleInputChange = e => {
        setNuevaTarea({ ...nuevaTarea, [e.target.name]: e.target.value });
    };

    const handleClick = () => {
        setTareas([...tareas, { ...nuevaTarea, id: uniqid() }]);
    };

    const handleDelete = id => {
        const newArray = tareas.filter(tarea => {
            return tarea.id !== id;
        });

        setTareas(newArray);
    };

    // const handleEdit = item => {};

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
                                        class="material-icons pointer"
                                    >
                                        delete
                                    </span>
                                    <span class="material-icons pointer">
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
