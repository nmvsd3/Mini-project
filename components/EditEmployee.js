import React, { useState } from 'react';
import axios from 'axios';

function EditEmployee({ employee, onEmployeeUpdated }) {
    const [name, setName] = useState(employee.name);
    const [department, setDepartment] = useState(employee.department);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:8080/api/employees/${employee.id}`, {
                name,
                department,
            });
            onEmployeeUpdated(response.data);
        } catch (error) {
            console.error("Error updating employee:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="edit-employee-form">
            <h3>Edit Employee</h3>
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Department"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                required
            />
            <button type="submit">Update Employee</button>
        </form>
    );
}

export default EditEmployee;
