import React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';

import Divider from '@mui/material/Divider';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useState, useContext } from 'react';
import canvasContext from '../assets/context/CanvasContext';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';

const StyledMenu = styled((props) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 120,
        color:
            theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0',
        },
        '& .Muidiv-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            '&:active': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity,
                ),
            },
        },
    },
}));

export default function SelectStartNode() {
    const [anchorEl, setAnchorEl] = useState(null);
    const context = useContext(canvasContext);
    const {startNode, changeStartNode} = context;
    const [inputNode, setInputNode] = useState('');

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    
    const handleChangeInputNode = (e)=>{
        e.preventDefault();
        setInputNode(e.target.value);
    }
    const handleSave = ()=>{
        handleClose();
        console.log("label: ", inputNode);
        changeStartNode(inputNode);
    }


    return (
        <div className='px-4'>
            <Button
                id="demo-customized-button"
                aria-controls={open ? 'demo-customized-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                variant="contained"
                disableElevation
                onClick={handleClick}
                endIcon={<KeyboardArrowDownIcon />}
            >
                Select Start Node
            </Button>
            <StyledMenu
                id="demo-customized-menu"
                MenuListProps={{
                    'aria-labelledby': 'demo-customized-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <div  className='p-1'>
                    <label htmlFor="node-value" className=' w-16 mr-2'>Label:</label>
                    <input type="text" id='surce' className=' p-1 bg-gray-200 rounded-lg w-16' value={inputNode} onChange={handleChangeInputNode}/>
                </div> 
                <Divider sx={{ my: 0.5 }} />
                <div className='flex flex-row justify-around items-center'>
                <IconButton aria-label='cancel' color="error" size='small' onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                    <IconButton aria-label='cancel' color="success" size='small' onClick={handleSave}>
                        <DoneIcon />
                    </IconButton>
                   
                </div>
            </StyledMenu>
        </div>
    );
}