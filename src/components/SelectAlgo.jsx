import React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';

import Divider from '@mui/material/Divider';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useState, useContext } from 'react';
import canvasContext from '../assets/context/CanvasContext';
import Checkbox from '@mui/material/Checkbox';


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

export default function SelectAlgo() {
    const [anchorEl, setAnchorEl] = useState(null);
    const context = useContext(canvasContext);
    const {algo, setAlgo} = context;
    const dfs = 'dfs';
    const bfs = 'bfs';
    const dijkstra = 'dijkstra';
    const bellmanford = 'bellmanford';

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSelectAlgo = (label)=>{
        setTimeout(() => {
            handleClose();
        }, 200);
        console.log("label: ", label);
        setAlgo(label);
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
                Select Algorithm
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
                <div><Checkbox onClick={()=>handleSelectAlgo(dfs)}/>DFS</div>
                <Divider sx={{ my: 0.5 }} />
                <div><Checkbox onClick={()=>handleSelectAlgo(bfs)}/>BFS</div>
                <Divider sx={{ my: 0.5 }} />
                <div><Checkbox onClick={()=>handleSelectAlgo(dijkstra)}/>Dijkstras</div>
                <Divider sx={{ my: 0.5 }} />
                <div><Checkbox onClick={()=>handleSelectAlgo(bellmanford)}/>Bellmanford</div>
            </StyledMenu>
        </div>
    );
}