import React, {useState} from "react";
import {Layout, Menu, Breadcrumb, Row} from 'antd';
import {
    FileOutlined, HomeOutlined,
} from '@ant-design/icons';
import {isMobile} from 'react-device-detect'
import {Link} from "react-router-dom";
import logo from './../ttu.png' // relative path to image

const handleLogout = () => {
    return alert("logout....")
}


const NavBar = () => {
    const {Sider} = Layout;
    const {SubMenu} = Menu;


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
                <Row justify="space-around" align="middle">
                    <center><img src={logo} alt="Logo"
                                 style={{width: '100px', display: 'inline'}} className="img-responsive"/>
                        <h6 className='titles'> TTU | Online Pay</h6>

                    </center>
                </Row>

            </div>
            <Menu className={'sideBarNav'} theme="dark" defaultSelectedKeys={['1']} mode="inline">
                {/*<p></p>*/}


                <Menu.Item key="1" icon={<HomeOutlined/>}>

                    <Link to={'/Home'}>
                        Home
                    </Link>
                </Menu.Item>
                <Menu.Item key="2" icon={
                    <svg viewBox="64 64 896 896" focusable="false" data-icon="user" width="1em" height="1em"
                         fill="currentColor" aria-hidden="true">
                        <path
                            d="M858.5 763.6a374 374 0 00-80.6-119.5 375.63 375.63 0 00-119.5-80.6c-.4-.2-.8-.3-1.2-.5C719.5 518 760 444.7 760 362c0-137-111-248-248-248S264 225 264 362c0 82.7 40.5 156 102.8 201.1-.4.2-.8.3-1.2.5-44.8 18.9-85 46-119.5 80.6a375.63 375.63 0 00-80.6 119.5A371.7 371.7 0 00136 901.8a8 8 0 008 8.2h60c4.4 0 7.9-3.5 8-7.8 2-77.2 33-149.5 87.8-204.3 56.7-56.7 132-87.9 212.2-87.9s155.5 31.2 212.2 87.9C779 752.7 810 825 812 902.2c.1 4.4 3.6 7.8 8 7.8h60a8 8 0 008-8.2c-1-47.8-10.9-94.3-29.5-138.2zM512 534c-45.9 0-89.1-17.9-121.6-50.4S340 407.9 340 362c0-45.9 17.9-89.1 50.4-121.6S466.1 190 512 190s89.1 17.9 121.6 50.4S684 316.1 684 362c0 45.9-17.9 89.1-50.4 121.6S557.9 534 512 534z"></path>
                    </svg>}>

                    <Link to={'/PictureUpload'}>
                        Upload Photo
                    </Link>
                </Menu.Item>
                <Menu.Item key="3" icon={<FileOutlined/>}>
                    <Link to={'/Form'}>
                        Form
                    </Link>
                </Menu.Item>
                <Menu.Item key="4" icon={<FileOutlined/>}>
                    <Link to={'/Result/Upload'}>
                        Upload Result
                    </Link>
                </Menu.Item>
                <Menu.Item key="5" icon={<FileOutlined/>}>
                    <Link to={'/Preview'}>
                        Preview
                    </Link>
                </Menu.Item>


            </Menu>
        </Sider>
    )


}
export default NavBar
