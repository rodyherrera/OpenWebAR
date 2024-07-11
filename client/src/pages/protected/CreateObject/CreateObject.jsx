import React, { useState } from 'react';
import { createObject } from '@services/object/operations';
import { useDispatch } from 'react-redux';

const CreateObject = () => {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [files, setFiles] = useState([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess(false);

        if (name.length < 4 || name.length > 32) {
            setError('Name must be between 4 and 32 characters');
            return;
        }

        if (description.length < 4 || description.length > 255) {
            setError('Description must be between 4 and 255 characters');
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        files.forEach((file) => {
            formData.append('files', file);
        });
        dispatch(createObject(formData));
    };

    return (
        <main id='Create-Object-Main'>
            <h1>Create New Object</h1>
            {error && <p className="error">{error}</p>}
            {success && <p className="success">Object created successfully!</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        minLength={4}
                        maxLength={32}
                    />
                </div>
                <div>
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        minLength={4}
                        maxLength={255}
                    />
                </div>
                <div>
                    <label htmlFor="files">Upload Samples:</label>
                    <input
                        type="file"
                        id="files"
                        multiple
                        onChange={(e) => setFiles(Array.from(e.target.files))}
                    />
                </div>
                <button type="submit">Create Object</button>
            </form>
        </main>
    );
};

export default CreateObject;