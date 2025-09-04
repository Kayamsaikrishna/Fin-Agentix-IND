import React from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Avatar,
  Menu,
  MenuItem,
  Badge,
  Tooltip,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Bell,
  Settings,
  HelpCircle,
  LogOut,
  User,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import LanguageSelector from '../indian/LanguageSelector';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [notificationAnchorEl, setNotificationAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotificationMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setNotificationAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationMenuClose = () => {
    setNotificationAnchorEl(null);
  };

  const handleLogout = () => {
    import React from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Avatar,
  Menu,
  MenuItem,
  Badge,
  Tooltip,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Bell,
  Settings,
  HelpCircle,
  LogOut,
  User,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import LanguageSelector from '../indian/LanguageSelector';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [notificationAnchorEl, setNotificationAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotificationMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setNotificationAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationMenuClose = () => {
    setNotificationAnchorEl(null);
  };

  const handleLogout = () => {
    // TODO: Implement logout logic through auth context
    handleMenuClose();
    navigate('/login');
  };

  return (
    <AppBar 
      position="sticky" 
      color="default" 
      elevation={1}
      className="bg-white"
    >
      <Toolbar className="px-4">
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={onMenuClick}
          className="mr-4"
        >
          <MenuIcon />
        </IconButton>

        <Typography variant="h6" className="flex-grow font-semibold text-gray-800">
          Fin-Agentix India
        </Typography>

        <div className="flex items-center gap-4">
          <LanguageSelector />

          <Tooltip title="Help">
            <IconButton 
              color="inherit"
              onClick={() => navigate('/help')}
              className="text-gray-600 hover:text-gray-800"
            >
              <HelpCircle size={20} />
            </IconButton>
          </Tooltip>

          <Tooltip title="Notifications">
            <IconButton
              color="inherit"
              onClick={handleNotificationMenuOpen}
              className="text-gray-600 hover:text-gray-800"
            >
              <Badge badgeContent={3} color="error">
                <Bell size={20} />
              </Badge>
            </IconButton>
          </Tooltip>

          <Menu
            anchorEl={notificationAnchorEl}
            open={Boolean(notificationAnchorEl)}
            onClose={handleNotificationMenuClose}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem onClick={handleNotificationMenuClose}>
              New loan application status
            </MenuItem>
            <MenuItem onClick={handleNotificationMenuClose}>
              KYC verification pending
            </MenuItem>
            <MenuItem onClick={handleNotificationMenuClose}>
              Document verification complete
            </MenuItem>
          </Menu>

          <Tooltip title="Profile">
            <IconButton
              edge="end"
              color="inherit"
              onClick={handleProfileMenuOpen}
              className="text-gray-600 hover:text-gray-800"
            >
              <Avatar
                sx={{ width: 32, height: 32 }}
                alt="User Profile"
                src="/path-to-profile-image.jpg"
              />
            </IconButton>
          </Tooltip>
        </div>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem onClick={() => {
            handleMenuClose();
            navigate('/profile');
          }}>
            <User size={18} className="mr-2" />
            Profile
          </MenuItem>
          <MenuItem onClick={() => {
            handleMenuClose();
            navigate('/settings');
          }}>
            <Settings size={18} className="mr-2" />
            Settings
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            <LogOut size={18} className="mr-2" />
            Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
    handleMenuClose();
    navigate('/login');
  };

  return (
    <AppBar position="sticky" color="default" elevation={1}>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={onMenuClick}
        >
          <MenuIcon />
        </IconButton>

        <Typography variant="h6" className="flex-grow ml-4">
          Fin-Agentix India
        </Typography>

        <div className="flex items-center gap-2">
          <LanguageSelector />

          <Tooltip title="Help">
            <IconButton color="inherit" onClick={() => navigate('/help')}>
              <HelpCircle size={20} />
            </IconButton>
          </Tooltip>

          <Tooltip title="Notifications">
            <IconButton
              color="inherit"
              onClick={handleNotificationMenuOpen}
            >
              <Badge badgeContent={3} color="error">
                <Bell size={20} />
              </Badge>
            </IconButton>
          </Tooltip>

          <Menu
            anchorEl={notificationAnchorEl}
            open={Boolean(notificationAnchorEl)}
            onClose={handleNotificationMenuClose}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem onClick={handleNotificationMenuClose}>
              New loan application status
            </MenuItem>
            <MenuItem onClick={handleNotificationMenuClose}>
              KYC verification pending
            </MenuItem>
            <MenuItem onClick={handleNotificationMenuClose}>
              Document verification complete
            </MenuItem>
          </Menu>

          <Tooltip title="Profile">
            <IconButton
              edge="end"
              color="inherit"
              onClick={handleProfileMenuOpen}
            >
              <Avatar
                sx={{ width: 32, height: 32 }}
                alt="User Profile"
                src="/path-to-profile-image.jpg"
              />
            </IconButton>
          </Tooltip>
        </div>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem onClick={() => {
            handleMenuClose();
            navigate('/profile');
          }}>
            <User size={18} className="mr-2" />
            Profile
          </MenuItem>
          <MenuItem onClick={() => {
            handleMenuClose();
            navigate('/settings');
          }}>
            <Settings size={18} className="mr-2" />
            Settings
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            <LogOut size={18} className="mr-2" />
            Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
