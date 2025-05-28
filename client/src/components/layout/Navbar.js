// Enhanced Navbar Component
// client/src/components/layout/Navbar.js

import React from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  IconButton, 
  Avatar, 
  Menu, 
  MenuItem,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  useTheme
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  ShoppingCart as ShoppingCartIcon,
  People as PeopleIcon,
  BarChart as AnalyticsIcon,
  Settings as SettingsIcon,
  ExitToApp as LogoutIcon
} from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';

const drawerWidth = 240;

const Navbar = () => {
  const theme = useTheme();
  const location = useLocation();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
    { text: 'Products', icon: <ShoppingCartIcon />, path: '/products' },
    { text: 'Customers', icon: <PeopleIcon />, path: '/customers' },
    { text: 'Analytics', icon: <AnalyticsIcon />, path: '/analytics' },
    { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
  ];

  // Styles that replace makeStyles
  const appBarStyles = {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    boxShadow: theme.shadows[1],
  };

  const menuButtonStyles = {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('lg')]: {
      display: 'none',
    },
  };

  const titleStyles = {
    flexGrow: 1,
    fontWeight: 700,
    fontSize: '1.25rem',
  };

  const avatarStyles = {
    width: theme.spacing(4),
    height: theme.spacing(4),
    backgroundColor: theme.palette.primary.main,
  };

  const drawerPaperStyles = {
    width: drawerWidth,
    borderRight: 'none',
  };

  const activeItemStyles = {
    backgroundColor: theme.palette.action.selected,
    '&:hover': {
      backgroundColor: theme.palette.action.selected,
    },
  };

  const listItemIconStyles = {
    minWidth: 40,
  };

  const drawer = (
    <div>
      {/* Toolbar spacer */}
      <Box sx={theme.mixins.toolbar} />
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            component={Link}
            to={item.path}
            sx={location.pathname === item.path ? activeItemStyles : null}
          >
            <ListItemIcon sx={listItemIconStyles}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem button>
          <ListItemIcon sx={listItemIconStyles}>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={appBarStyles}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerToggle}
            sx={menuButtonStyles}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={titleStyles}>
            E-commerce Analytics
          </Typography>
          <div>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenuOpen}
              color="inherit"
            >
              <Avatar sx={avatarStyles}>AD</Avatar>
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
              <MenuItem onClick={handleMenuClose}>My account</MenuItem>
              <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>

      {/* Mobile drawer */}
      <Box
        component="nav"
        sx={{ display: { lg: 'none', xs: 'block' } }}
        aria-label="mobile navigation drawer"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            '& .MuiDrawer-paper': drawerPaperStyles,
          }}
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Desktop drawer */}
      <Box
        component="nav"
        sx={{ display: { xs: 'none', md: 'block' } }}
        aria-label="desktop navigation drawer"
      >
        <Drawer
          variant="permanent"
          open
          sx={{
            '& .MuiDrawer-paper': drawerPaperStyles,
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
};

export default Navbar;
