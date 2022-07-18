import React from "react";

const Table = props => {
    const mapPropData = data => {
        data.map(item => {
            for (let key in item) {
            }
        });
    };

    return (
        <table>
            <thead>
                <tr>
                    {props.header.map(text => {
                        return <th> {text} </th>;
                    })}
                </tr>
            </thead>
            <tbody>
                {props.data.map(item => {
                    console.log(item);
                })}
            </tbody>
        </table>
    );
};

export default Table;
