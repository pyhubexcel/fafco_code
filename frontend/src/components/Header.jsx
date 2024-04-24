import { useState } from 'react';
import HeaderLogo from '../assets/img/Fafco-Portal-Logo.jpg'
import { Link, useNavigate } from 'react-router-dom';
import { Avatar, Box, Divider, IconButton, ListItemIcon, Menu, MenuItem, Tooltip, Typography } from '@mui/material';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import cookie from 'react-cookies'

const Header = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate()
    const token = cookie.load('token')
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        setAnchorEl(null);
        cookie.remove('token')
        cookie.remove('role')
        navigate('/')
        window.top.location.reload();
    }

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };
    return (
        <div className=" px-7 py-2 shadow-xl">
            <nav className="bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
                    <div className="flex items-center justify-between h-16 ">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <div className=' w-44 '>
                                    <img src={HeaderLogo} alt="logo" />
                                </div>
                            </div>

                            {token && (
                                <div className="hidden xl:block">
                                    <div className="ml-10 flex items-baseline space-x-4">
                                        <Link href="#" className=" hover:text-blue-600 px-3 py-2 rounded-md text-md font-medium">
                                            Home
                                        </Link>
                                        <Link href="#" className=" hover:text-blue-600 px-3 py-2 rounded-md text-md font-medium">
                                            New Registration
                                        </Link>
                                        <Link href="#" className=" hover:text-blue-600 px-3 py-2 rounded-md text-md font-medium">
                                            Find Registration
                                        </Link>
                                        <Link href="#" className=" hover:text-blue-600 px-3 py-2 rounded-md text-md font-medium">
                                            Open a Claim
                                        </Link>
                                        <Link href="#" className=" hover:text-blue-600 px-3 py-2 rounded-md text-md font-medium">
                                            My Account
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>
                        {token &&
                            <div className='hidden xl:block'>
                                <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                                    {/* <Typography>abc@gmail.com</Typography> */}
                                    <Tooltip title="Account settings">
                                        <IconButton
                                            onClick={handleClick}
                                            size="small"
                                            sx={{ ml: 2 }}
                                            aria-controls={open ? 'account-menu' : undefined}
                                            aria-haspopup="true"
                                            aria-expanded={open ? 'true' : undefined}
                                        >
                                            <Avatar sx={{ width: 32, height: 32 }}></Avatar>
                                        </IconButton>
                                    </Tooltip>
                                </Box>
                                <Menu
                                    anchorEl={anchorEl}
                                    id="account-menu"
                                    open={open}
                                    onClose={handleClose}
                                    onClick={handleClose}
                                    PaperProps={{
                                        elevation: 0,
                                        sx: {
                                            overflow: 'visible',
                                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                            mt: 1.5,
                                            '& .MuiAvatar-root': {
                                                width: 32,
                                                height: 32,
                                                ml: -0.5,
                                                mr: 1,
                                            },
                                            '&::before': {
                                                content: '""',
                                                display: 'block',
                                                position: 'absolute',
                                                top: 0,
                                                right: 14,
                                                width: 10,
                                                height: 10,
                                                bgcolor: 'background.paper',
                                                transform: 'translateY(-50%) rotate(45deg)',
                                                zIndex: 0,
                                            },
                                        },
                                    }}
                                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                >
                                    <MenuItem onClick={handleClose}>
                                        <Avatar /> Profile
                                    </MenuItem>
                                    <MenuItem onClick={handleClose}>
                                        <Avatar /> My account
                                    </MenuItem>
                                    <Divider />
                                    <MenuItem onClick={handleClose}>
                                        <ListItemIcon>
                                            <Settings fontSize="small" />
                                        </ListItemIcon>
                                        Settings
                                    </MenuItem>
                                    <MenuItem onClick={handleLogout}>
                                        <ListItemIcon>
                                            <Logout fontSize="small" />
                                        </ListItemIcon>
                                        Logout
                                    </MenuItem>
                                </Menu>
                            </div>
                        }
                        {token &&
                        <div className="-mr-2 flex xl:hidden">
                            <button
                                onClick={toggleNavbar}
                                type="button"
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                aria-expanded="false"
                            >
                                <span className="sr-only">Open main menu</span>
                                <svg
                                    className={`${isOpen ? 'hidden' : 'block'} h-6 w-6`}
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                                <svg
                                    className={`${isOpen ? 'block' : 'hidden'} h-6 w-6`}
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    }
                    </div>
                </div>
                {token &&
                    <div className={`${isOpen ? 'block ' : 'hidden'} xl:hidden`}>
                        <div className="  pt-2 space-y-1 pb-2 sm:px-3">
                            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                                <Tooltip title="Account settings">
                                    <IconButton
                                        onClick={handleClick}
                                        size="small"
                                        sx={{ ml: 2 }}
                                        aria-controls={open ? 'account-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={open ? 'true' : undefined}
                                    >
                                        <Avatar sx={{ width: 32, height: 32 }}></Avatar>
                                    </IconButton>
                                </Tooltip>
                                {/* <Typography>abc@gmail.com</Typography> */}
                            </Box>
                            <Menu
                                anchorEl={anchorEl}
                                id="account-menu"
                                open={open}
                                onClose={handleClose}
                                onClick={handleClose}
                                PaperProps={{
                                    elevation: 0,
                                    sx: {
                                        overflow: 'visible',
                                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                        mt: 1.5,
                                        '& .MuiAvatar-root': {
                                            width: 32,
                                            height: 32,
                                            ml: -0.5,
                                            mr: 1,
                                        },
                                        '&::before': {
                                            content: '""',
                                            display: 'block',
                                            position: 'absolute',
                                            top: 0,
                                            right: 14,
                                            width: 10,
                                            height: 10,
                                            bgcolor: 'background.paper',
                                            transform: 'translateY(-50%) rotate(45deg)',
                                            zIndex: 0,
                                        },
                                    },
                                }}
                                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                            >
                                <MenuItem onClick={handleClose}>
                                    <Avatar /> Profile
                                </MenuItem>
                                <MenuItem onClick={handleClose}>
                                    <Avatar /> My account
                                </MenuItem>
                                <Divider />
                                <MenuItem onClick={handleClose}>
                                    <ListItemIcon>
                                        <Settings fontSize="small" />
                                    </ListItemIcon>
                                    Settings
                                </MenuItem>
                                <MenuItem onClick={handleLogout}>
                                    <ListItemIcon>
                                        <Logout fontSize="small" />
                                    </ListItemIcon>
                                    Logout
                                </MenuItem>
                            </Menu>
                        </div>
                        <Divider />
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            <Link href="#" className=" hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium">
                                Home
                            </Link>
                            <Link href="#" className=" hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium">
                                New Registration
                            </Link>
                            <Link href="#" className=" hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium">
                                Find Registration
                            </Link>
                            <Link href="#" className=" hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium">
                                Open a Claim
                            </Link>
                            <Link href="#" className=" hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium">
                                My Account
                            </Link>

                        </div>
                    </div>
                }
            </nav>

        </div>
    )
}

export default Header
