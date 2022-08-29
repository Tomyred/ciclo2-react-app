import React, { useEffect, useState } from "react";
import "./TodoList.css";
import uniqid from "uniqid";
import { Button } from "@mui/material";

const cabecera = ["Tarea", "Prioridad", "Acciones"];

const ToDoList = () => {
    const [tareas, setTareas] = useState([]);
    const [editing, setEditing] = useState(false);
    const [nuevaTarea, setNuevaTarea] = useState({
        taskName: "",
        priority: "1",
    });
    const [crazyTime, setCrazyTime] = useState(false);

    function foo() {
        console.log("hola");
    }

    useEffect(foo, [crazyTime]);

    const handleInputChange = e => {
        setNuevaTarea({ ...nuevaTarea, [e.target.name]: e.target.value });
    };

    const numEx = () => {
        const numeros = [2, 13, 6, 8, 15, 65];

        const nuevoArray = numeros.map(numero => {
            if (numero < 10) {
                return "Es menor a 10";
            } else {
                return numero;
            }
        });

        console.log(nuevoArray);
    };

    const handleClick = () => {
        if (editing === true) {
            const newArray = tareas.map(tarea => {
                if (tarea.id === nuevaTarea.id) {
                    return nuevaTarea;
                } else {
                    return tarea;
                }
            });

            setTareas(newArray);
            setEditing(false);
        } else {
            if (nuevaTarea.taskName && nuevaTarea.taskName.length > 4) {
                if (nuevaTarea.priority) {
                    setTareas([...tareas, { ...nuevaTarea, id: uniqid() }]);
                } else {
                    alert("Debe asignarle una prioridad a la tarea");
                }
            } else {
                alert("Debe tener mas de 4 caracteres");
            }
        }
    };

    const handleDelete = id => {
        const newArray = tareas.filter(tarea => {
            return tarea.id !== id;
        });

        setTareas(newArray);
    };

    const setEdit = tarea => {
        setEditing(true);
        setNuevaTarea(tarea);
    };

    const handleCancel = () => {
        setEditing(false);
        setNuevaTarea({ taskName: "", priority: "1" });
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

    const startCrazyButton = () => {
        setInterval(() => {
            setCrazyTime(!crazyTime);
        }, 1000);
    };

    return (
        <div className="todoList__container">
            <h1>Aplicacion CRUD</h1>
            <Button
                onClick={startCrazyButton}
                variant="contained"
                color={crazyTime ? "error" : "secondary"}
            >
                Crazy button!!
            </Button>
            <br />
            <br />
            <span> Nombre de la tarea </span>
            <br />
            <input
                type="text"
                name="taskName"
                onChange={handleInputChange}
                placeholder="Tarea"
                value={nuevaTarea.taskName}
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
                value={nuevaTarea.priority}
            />
            <Button
                color={editing === true ? "secondary" : "success"}
                variant="contained"
                onClick={handleClick}
            >
                {editing === true ? "Editar tarea" : "Agregar tarea"}
            </Button>

            {editing === true ? (
                <Button variant="outlined" color="error" onClick={handleCancel}>
                    Cancelar
                </Button>
            ) : (
                <></>
            )}

            <table>
                <thead>
                    <tr>
                        {cabecera.map((text, index) => {
                            return <th key={index}> {text} </th>;
                        })}
                    </tr>
                </thead>
                <tbody>
                    {tareas.map((tarea, index) => {
                        return (
                            <tr key={index}>
                                <td> {tarea.taskName} </td>
                                <td
                                    style={{
                                        background: setPriorityColor(
                                            tarea.priority
                                        ),
                                    }}
                                >
                                    {tarea.priority}
                                </td>
                                <td
                                    style={{
                                        display: "flex",
                                        aligntareas: "center",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <span
                                        onClick={() => handleDelete(tarea.id)}
                                        className="material-icons pointer"
                                    >
                                        delete
                                    </span>
                                    <span
                                        onClick={() => setEdit(tarea)}
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
