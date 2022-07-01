import React, {useState} from "react";
import {Layout, Menu, Breadcrumb, Row} from 'antd';
import {
    FileOutlined, HomeOutlined, PoweroffOutlined, UserOutlined
} from '@ant-design/icons';
import {isMobile} from 'react-device-detect'
import {Link, NavLink} from "react-router-dom";
import logo from './../logos.png'
import {ACCESS_TOKEN} from "../constants";
import Alert from "react-s-alert"; // relative path to image

const handleLogout = () => {
    return alert("logout....")
}


const NavBar = (props) => {
    const {Sider} = Layout;
    const {SubMenu} = Menu;
    const [authenticated, setAuthenticated] = useState()
    const [currentUser, setCurrentUser] = useState()
    const handleLogout =()=> {
        localStorage.removeItem(ACCESS_TOKEN);
        setAuthenticated(false)
        setCurrentUser(null)
        Alert.success("You're safely logged out!");
    }

    const [open, setOpen] = useState(true)

    const toggle = () => {
        setOpen(!open)
    }
    return (

        <Sider className={'sideBar'} collapsible collapsed={open} onCollapse={toggle}
               breakpoint="lg" collapsedWidth={isMobile ? 0 : 80}>
            {/* <Sider className={'sideBar'} collapsible collapsed={open} onCollapse={toggle}
                   breakpoint="lg" collapsedWidth={isMobile ? 0 : 80}
                   style={isMobile ? {height: '100vh', zIndex: 1, position: 'fixed', left: 0} : {
                       height: '100vh',
                       left: 0,
                       position: 'fixed',
                       backgroundColor: '#152b86',
                       color: '#fff'
                   }}
            >*/}

            <div className="logo"/>
            {/*<div align={'center'} style={{marginTop: 20, marginBottom: 10}}>
                <Avatar size={40} style={{backgroundColor: '#2900ff'}}>
                    GO
                </Avatar>

                <div className={`sideProfile ${open === true ? 'hideProfile' : ''}`}>
                    <Title level={5} className={'sideProfileText'}>Gad Ocansey</Title>
                </div>
            </div>*/}
            <div className="ttu-color ant">
                <Row justify="space-around">
                   <center>
                       <img src={logo} alt="Logo"
                                 style={{width: '170px', height:'auto',marginLeft:-53}} className="img-responsive"/>
                   </center>

                </Row>

            </div>
            <Menu className={'sideBarNav'} theme="dark" defaultSelectedKeys={['1']} mode="inline">
                {/*<p></p>*/}


                <Menu.Item key="1" icon={<HomeOutlined style={{ fontSize: '22px', color: '#08c' }}/>}>

                    <Link to={'/dashboard'}>
                        Home
                    </Link>
                </Menu.Item>

                <Menu.Item key="2" icon={<UserOutlined  style={{ fontSize: '22px', color: '#08c' }}/>}>
                    <Link to={'/profile'}>
                        Profile
                    </Link>
                </Menu.Item>

                <Menu.Item key="3" icon={<FileOutlined style={{ fontSize: '22px', color: '#08c' }}/>}>
                    <Link to={'/pay'}>
                        Pay fees
                    </Link>
                </Menu.Item>
                <Menu.Item key="4" icon={<FileOutlined style={{ fontSize: '22px', color: '#08c' }} /> }>
                    <Link to={'/transactions'}>
                       My Payments
                    </Link>
                </Menu.Item>

            </Menu>
        </Sider>
    )


}
export default NavBar
