import axios from "axios";
import React, { useState } from "react";
import LoadingScreen from "../LoadingScreen/LoadingScreen";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const getUsers = async () => {
        try {
            setLoading(true);
            setError(false);

            setTimeout(async () => {
                const res = await axios.get(
                    "https://jsonplacehdolder.typicode.com/users"
                );
                if (res.status === 200) {
                    setLoading(false);
                    setUsers(res.data);
                } else {
                    setError(true);
                }
            }, 2000);
        } catch (error) {
            setError(true);
            console.log(error);
        }
    };

    if (loading) {
        return <LoadingScreen />;
    }

    return (
        <div>
            <h2> Lista de usuarios </h2>
            <button onClick={getUsers}> Obtener datos </button>
            <table>
                <thead>
                    <tr>
                        <th>id</th>
                        <th> Username </th>
                        <th>Mail</th>
                    </tr>
                </thead>
                <tbody>
                    {error === true
                        ? "Ha ocurrido un error al bucar los datgos"
                        : users.map(user => {
                              return (
                                  <tr>
                                      <td> {user.id} </td>
                                      <td> {user.username} </td>
                                      <td> {user.email} </td>
                                  </tr>
                              );
                          })}
                </tbody>
            </table>
        </div>
    );
};

export default Users;
