import { useContext, useEffect, useState } from 'react';
import HeaderLogo from '../assets/img/Fafco-Portal-Logo.jpg'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Avatar, Backdrop, Box, CircularProgress, Divider, IconButton, ListItemIcon, Menu, MenuItem, Tooltip, Typography } from '@mui/material';
import Logout from '@mui/icons-material/Logout';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { logOutUser, resetReducer } from "../redux/slices/LogoutSlice"
import { MyContext } from '../context/ContextProvider';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const navbarLinks = [
  {
    name: 'HOME',
    link: '/',
  },
  {
    name: 'REGISTRATION LOOKUP',
    link: '/registrationLookup',
  },
  {
    name: ' CREATE REGISTRATION',
    link: '/addressValidation',
  },
  // {
  //   name: ' UPDATE ACCOUNT',
  //   link: '/updateInfo',
  // },
]

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  let token = Cookies.get('token');
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const Navigation = useNavigate();
  const name = Cookies.get("name");
  const loginSliceData = useSelector((state) => state.LoginSlice?.data?.success);
  const logOutState = useSelector((state) => state.logOutSlice?.data?.success);
  const logOutLoding = useSelector((state) => state.logOutSlice?.isLoading);
  const { updateName,setUpdateName } = useContext(MyContext);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // const handleLogout = () => {
  //   setAnchorEl(null);
  //   dispatch(logOutUser(token))
  // }

  const handleLogout = async () => {
    setAnchorEl(null);
  
    try {
      await dispatch(logOutUser(token)).unwrap();
      toast.success("Logged out successfully!");
    } catch (error) {
      toast.success("Logged out successfully!");
    }
  };

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    token = Cookies.get('token');
    if (logOutState == true) {
      Cookies.remove('token')
      Cookies.remove('id')
      Cookies.remove('name')
      Cookies.remove('role')
      localStorage.removeItem('idd')
      Navigation('/login')
      dispatch(resetReducer());
    }
    if(updateName){
      setUpdateName(false)
    }
   
  }, [loginSliceData, logOutState,updateName])

  return (
    <div className=" bg-white px-7 py-1 shadow-md ">
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={logOutLoding}>
        <CircularProgress color="inherit" />
        
      </Backdrop>

      <nav >
        <div className="max-w-8xl mx-auto sm:px-6 lg:px-8 ">
          <div className="flex items-center justify-between h-16 ">
            <div className="flex-shrink-0 w-44 cursor-pointer">
              <Link to={`${token ? "/" : "/login"}`}>
                <img src={HeaderLogo} alt="logo" />
              </Link>
            </div>


            {token &&
              <div className="hidden xl:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  {navbarLinks.map((item, i) => (
                    <NavLink key={i} to={item.link}
                      className={({ isActive }) => { return `${isActive ? "border-b-4 rounded-none border-blue-500 text-blue-500 " : ""}  hover:text-blue-500 px-5 py-2 rounded-md text-md linkEffect font-medium` }}
                    >
                      {item.name}
                    </NavLink>
                  ))}
                </div>
              </div>
            }


            {token &&
              <div className='hidden xl:block'>
                <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center', gap: '5px' }}>
                  <Typography>Welcome, </Typography>
                  <Typography sx={{ fontWeight: 'bold' }}>
                    {name ? name : "User name not found"}
                  </Typography>
                  <Tooltip title="Account settings">
                    <IconButton
                      onClick={handleClick}
                      size="small"
                      // sx={{ ml: 2 }}
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
                  <MenuItem
                    onClick={() => {
                      handleClose();
                    }}
                  >
                    <Link to="/profile" className="flex items-center">
                      <Avatar />
                      <span className="ml-2">Profile</span>
                    </Link>
                  </MenuItem>
                  {/* <MenuItem onClick={handleClose}>
                    <Avatar /> My account
                  </MenuItem> */}
                  {/* <Divider /> */}
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
                  <MenuIcon sx={{ display: isOpen ? 'none' : 'block' }} />
                  <CloseIcon sx={{ display: isOpen ? 'block' : 'none' }} />
                </button>
              </div>
            }
          </div>
        </div>



        {token &&
          <div className={`${isOpen ? 'block ' : 'hidden'} xl:hidden`}>
            <div className="  pt-2 space-y-1 pb-2 sm:px-3">
              <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center', gap: '5px' }}>
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
                <Typography>Welcome,</Typography>
                <Typography>{name}</Typography>
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
                <MenuItem
                  onClick={() => {
                    handleClose();
                  }}
                >
                  <Link to="/profile" className="flex items-center">
                    <Avatar />
                    <span className="ml-2">Profile</span>
                  </Link>
                </MenuItem>
                {/* <MenuItem onClick={handleClose}>
                  <Avatar /> My account
                </MenuItem> */}
                {/* <Divider /> */}
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
              {navbarLinks.map((item, i) => (
                <NavLink key={i} to={item.link}
                  onClick={() => setIsOpen(!isOpen)}
                  className={({ isActive }) => { return `${isActive ? "border-b-4 rounded-none border-blue-500 text-blue-500 " : ""}  hover:text-blue-500 px-5 py-2 rounded-md text-md linkEffect font-medium block w-fit` }}
                >
                  {item.name}
                </NavLink>
              ))}
            </div>
          
          </div> 
        }
      </nav>
      <ToastContainer />
    </div>
  )
}

export default Header;
