import React, { useState } from 'react';
import axios from 'axios';

function UpdateEmployee({ employee, onEmployeeUpdated, onClose }) {
    const [name, setName] = useState(employee.name);
    const [department, setDepartment] = useState(employee.department);
    const [email, setEmail] = useState(employee.email);
    const [position, setPosition] = useState(employee.position);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:8080/api/employees/${employee.id}`, {
                name,
                department,
                email,
                position,
            });
            onEmployeeUpdated(response.data);
            onClose();
        } catch (error) {
            console.error("Error updating employee:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Department"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
            />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="text"
                placeholder="Position"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
            />
            <button type="submit">Update Employee</button>
            <button type="button" onClick={onClose}>Cancel</button>
        </form>
    );
}

export default UpdateEmployee;
