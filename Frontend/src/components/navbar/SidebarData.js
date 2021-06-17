import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
//import { IconName } from "react-icons/bs";
import * as BsIcons from 'react-icons/bs';
import * as RiIcons from 'react-icons/ri';
export const SidebarData = [
  {
    title: 'Dashboard',
    path: '/Dashboard',
    icon: <AiIcons.AiFillDashboard />,
    cName: 'nav-text'
  },
  {
    title: 'Profile',
    path: '/userprofile/60c873bd5c2daf23b8b4a4e1',
    icon: <AiIcons.AiFillContacts />,
    cName: 'nav-text'
  },
  {
    title: 'Orders',
    path: '/Orders',
    icon: <FaIcons.FaCartPlus />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
        {
          title: 'Order List',
          path: '/Orders/Orders1',
          icon: <IoIcons.IoIosPaper />,
          cName: 'sub-nav'
        }
      ] 
  },
  {
    title: 'Users',
    path: '/Users',
    icon: <IoIcons.IoMdPeople />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
        {
          title: 'User List',
          path: '/userlist',
          icon: <IoIcons.IoMdPeople />,
          cName: 'sub-nav'
        },
        {
          title: 'Add User',
          path: '/adduser',
          icon: <IoIcons.IoMdPeople />,
          cName: 'sub-nav'
        }
      ] 
   },
  {
    title: 'Logout',
    path: '/Logout',
    icon: <AiIcons.AiOutlineLogout />,
    cName: 'nav-text'
  }
];