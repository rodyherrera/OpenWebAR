import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMyObjects, deleteObject } from '@services/object/operations';
import './MyObjects.css';

const MyObjects = () => {
    const dispatch = useDispatch();
    const { isLoading, objects } = useSelector((state) => state.object);
    const [objectToDelete, setObjectToDelete] = useState(null);
    
    useEffect(() => {
        dispatch(getMyObjects());
    }, []);

    const handleDeleteClick = (objectId) => {
        setObjectToDelete(objectId);
    };

    useEffect(() => {
        if (objectToDelete) {   
            dispatch(deleteObject(objectToDelete));
            setObjectToDelete(null);
        }
    }, [objectToDelete, dispatch]);

    return (
        <main id='My-Objects-Main'>
            {isLoading ? (
                <p>Cargando...</p>
            ) : (
                objects.map(({ _id, name, description, samples }) => (
                    <div key={_id}>
                        <h3>{name}</h3>
                        <p>{description}</p>
                        <div className='Object-Samples-Container'>
                            {samples.map((url, index) => (
                                <img 
                                    key={index}
                                    className='Object-Sample'
                                    src={import.meta.env.VITE_SERVER + url}
                                    alt={`Sample ${index + 1}`}
                                />
                            ))}
                        </div>
                        <button 
                            onClick={() => handleDeleteClick(_id)}
                            disabled={objectToDelete === _id}
                        >
                            {objectToDelete === _id ? 'Eliminando...' : 'Eliminar'}
                        </button>
                    </div>
                ))
            )}
        </main>
    );
};

export default MyObjects;
