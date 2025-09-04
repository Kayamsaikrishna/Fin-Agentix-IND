import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  Divider,
  Box,
  Typography,
} from '@mui/material';
import {
  Home,
  FileText,
  Users,
  CreditCard,
  FileCheck,
  PieChart,
  Settings,
  ChevronDown,
  ChevronRight,
  Building2,
  IndianRupee,
  UserCheck,
  ClipboardList,
  Building,
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  drawerWidth?: number;
}

interface MenuItem {
  title: string;
  path?: string;
  icon: React.ReactNode;
  children?: MenuItem[];
}

const menuItems: MenuItem[] = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: <Home size={20} />,
  },
  {
    title: 'Loan Management',
    icon: <IndianRupee size={20} />,
    children: [
      {
        title: 'Applications',
        path: '/loans/applications',
        icon: <FileText size={20} />,
      },
      {
        title: 'Disbursements',
        path: '/loans/disbursements',
        icon: <CreditCard size={20} />,
      },
      {
        title: 'Collections',
        path: '/loans/collections',
        icon: <Building2 size={20} />,
      },
    ],
  },
  {
    title: 'Customer Management',
    icon: <Users size={20} />,
    children: [
      {
        title: 'KYC Verification',
        path: '/customers/kyc',
        icon: <UserCheck size={20} />,
      },
      {
        title: 'Profile Management',
        path: '/customers/profiles',
        icon: <ClipboardList size={20} />,
      },
    ],
  },
  {
    title: 'Partner Management',
    icon: <Building size={20} />,
    children: [
      {
        title: 'Onboarding',
        path: '/partners/onboarding',
        icon: <FileCheck size={20} />,
      },
      {
        title: 'Performance',
        path: '/partners/performance',
        icon: <PieChart size={20} />,
      },
    ],
  },
  {
    title: 'Settings',
    path: '/settings',
    icon: <Settings size={20} />,
  },
];

const Sidebar: React.FC<SidebarProps> = ({
  open,
  onClose,
  drawerWidth = 280,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [expandedItems, setExpandedItems] = React.useState<string[]>([]);

  const handleItemClick = (item: MenuItem) => {
    if (item.children) {
      setExpandedItems((prev) =>
        prev.includes(item.title)
          ? prev.filter((i) => i !== item.title)
          : [...prev, item.title]
      );
    } else if (item.path) {
      navigate(item.path);
      if (window.innerWidth < 1024) {
        onClose();
      }
    }
  };

  const renderMenuItem = (item: MenuItem, depth = 0) => {
    const isExpanded = expandedItems.includes(item.title);
    const isSelected = item.path === location.pathname;
    const hasChildren = Boolean(item.children?.length);

    return (
      <React.Fragment key={item.title}>
        <ListItem
          button
          onClick={() => handleItemClick(item)}
          sx={{
            pl: depth * 2 + 2,
            py: 1,
          }}
          className={`${
            isSelected
              ? 'bg-blue-50 text-blue-600'
              : 'text-gray-700 hover:bg-gray-50'
          }`}
        >
          <ListItemIcon
            className={`${isSelected ? 'text-blue-600' : 'text-gray-600'}`}
          >
            {item.icon}
          </ListItemIcon>
          <ListItemText
            primary={item.title}
            primaryTypographyProps={{
              className: 'font-medium',
            }}
          />
          {hasChildren && (
            <Box className="text-gray-400">
              {isExpanded ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
            </Box>
          )}
        </ListItem>
        {hasChildren && (
          <Collapse in={isExpanded} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {item.children?.map((child) => renderMenuItem(child, depth + 1))}
            </List>
          </Collapse>
        )}
      </React.Fragment>
    );
  };

  return (
    <Drawer
      variant="temporary"
      anchor="left"
      open={open}
      onClose={onClose}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
      className="lg:hidden"
    >
      <Box className="p-4">
        <Typography variant="h6" className="font-bold text-gray-800">
          Fin-Agentix India
        </Typography>
      </Box>
      <Divider />
      <List className="py-2">
        {menuItems.map((item) => renderMenuItem(item))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
