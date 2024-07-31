import React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import { IconButton } from '@mui/material';
import { useState, useContext } from 'react';
import edgeContext from '../assets/context/EdgeContext';


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
        '& .MuiMenuItem-root': {
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

export default function DropdownButtonEdge() {
    const [anchorEl, setAnchorEl] = useState(null);
    const [weight, setWeight] = useState(0);
    const [source, setSource] = useState("");
    const [target, setTarget] = useState("");

    const context = useContext(edgeContext);
    const {edge, addEdge} = context;

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
        console.log("weight: ",weight," source: ",source," target: ",target);
    };

    const handleWeightChange = (e)=>{
        setWeight(e.target.value);
    }
    const handleSourceChange = (e)=>{
        setSource(e.target.value);
    }
    const handleTargetChange = (e)=>{
        setTarget(e.target.value);
    }


    const handleSave = ()=>{
        const id = source + target;
        addEdge(id, source, target);
        handleClose();
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
                Add Edge
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
                <MenuItem  disableRipple>
                    <label htmlFor="source" className=' w-16'>Source:</label>
                    <input type="text" id='surce' className='w-16 p-1 bg-gray-200' value={source} onChange={handleSourceChange}/>
                </MenuItem>
                <Divider sx={{ my: 0.5 }} />

                <MenuItem  disableRipple>
                    <label htmlFor="target" className=' w-16'>Target:</label>
                    <input type="text" id='target' className='w-16 p-1 bg-gray-200' value={target} onChange={handleTargetChange}/>
                </MenuItem>

                <Divider sx={{ my: 0.5 }} />

                <MenuItem  disableRipple>
                    <label htmlFor="weight" className=' w-16'>Weight:</label>
                    <input type="number" id='weight' className='w-16 p-1 bg-gray-200' onChange={handleWeightChange} value={weight}/>
                </MenuItem>

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
