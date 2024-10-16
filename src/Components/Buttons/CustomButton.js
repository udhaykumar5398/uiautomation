// CustomButton.js
import React from 'react';
import { Button } from '@mui/material';

const CustomButton = ({ onClick, children, variant = 'contained', color = 'primary', ...props }) => {
    return (
        <Button onClick={onClick} variant={variant} color={color} {...props}>
            {children}
        </Button>
    );
};

export default CustomButton;