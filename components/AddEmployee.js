import React, { useState } from 'react';
import axios from 'axios';

function AddEmployee({ onEmployeeAdded }) {
    const [name, setName] = useState('');
    const [department, setDepartment] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/employees', {
                name,
                department,
            });
            onEmployeeAdded(response.data);
            setName('');
            setDepartment('');
        } catch (error) {
            console.error("Error adding employee:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="add-employee-form">
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
            <button type="submit">Add Employee</button>
        </form>
    );
}

export default AddEmployee;
