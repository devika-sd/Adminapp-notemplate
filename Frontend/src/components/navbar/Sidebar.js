import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { SidebarData } from './SidebarData';
import SubMenu from './SubMenu';
import { IconContext } from 'react-icons/lib';
import {connect} from 'react-redux';

const Nav = styled.div`
  background: #131a22;
  height: 100px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const NavIcon = styled(Link)`
  margin-left: 2rem;
  font-size: 2rem;
  height: 10px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const SidebarNav = styled.nav`
  background: #131a22;
  width: 250px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: ${({ sidebar }) => (sidebar ? '0' : '-100%')};
  transition: 150ms;
  z-index: 10;
`;

const SidebarWrap = styled.div`
  width: 100%;
  padding-top : 50px;
  overflow-x: hidden;
  overflow-y: auto;
  text-align:justify;
`;



const Sidebar = (props) => {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <Nav style={{width:"100%",height:"70px"}}>
          <NavIcon to='#'>
          <div className='navbar'>
          <Link to='#' className='menu-bars'>
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
          </div>
          </NavIcon>
          <h4 style={{color:"white",float:"right",width:"100%",textAlign:'right',marginRight:"35px"}}><Link to="/login" style={{color:"white"}}>login</Link></h4>
        </Nav>
        <SidebarNav sidebar={sidebar}>
          <SidebarWrap>
            <NavIcon to='#'>
              <AiIcons.AiOutlineClose onClick={showSidebar} />

            </NavIcon>
            {SidebarData.map((item, index) => {
                if(item.title==="Profile")
                {
                  item.path="/userprofile/"+props.currentUser
                }
              return <SubMenu item={item} key={index} />;
            })}
          </SidebarWrap>
        </SidebarNav>
      </IconContext.Provider>
    </>
  );
};

const mapStateToProps  =(state)=>{
  return { 
    currentUser:state.userReducer.currentUser,
  }
}


export default connect(mapStateToProps, null)(Sidebar);