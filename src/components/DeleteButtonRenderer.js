import React, { useRef } from 'react';
import Button from '@material-ui/core/Button';

const DeleteButtonRenderer = (props) => {
    const buttonRef = useRef(null);

    const handleDeleteClick = () => {
        props.deleteCar(props.data._links.self.href);
    };

    return (
        <Button ref={buttonRef} size='small' color='secondary' onClick={handleDeleteClick}>
            Delete
        </Button>
    );
}

export default DeleteButtonRenderer;