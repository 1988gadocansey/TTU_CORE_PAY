import React, {useState} from "react";
import { Layout, Menu, Breadcrumb } from 'antd';
import Copyright from "./Copyright";
import NavBar from "./NavBar";
import 'antd/dist/antd.css';
import './layout.css';
import { Col, Row, Typography, Button } from 'antd';
import PoweroffOutlined from '@ant-design/icons/lib/icons/PoweroffOutlined'
import AppLogo from "./AppLogo";
import Breadcrumbs from "./Breadcrumbs";


const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const { Text } = Typography
const handleLogout = () => {
 return alert("logout....")
}
 class Main extends React.Component {
    state = {
        collapsed: false,
    };

    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({ collapsed });
    };

    render() {
        const { collapsed } = this.state;
        return (


            <Layout style={{ minHeight: '100vh' }}>

                 <NavBar/>
                <Layout className="site-layout" >

                    <Header className="site-layout-background" style={{ padding: 0 }} >
                        <div style={{float:"right",marginRight:"50px"}}>user account..</div>
                    </Header>
                    <Content style={{ margin: '0 16px' }}>
                         <Breadcrumbs/>
                        <div   style={{ padding: 24, minHeight: 360 }}>
                            {this.props.children}
                        </div>

                    </Content>
                     <Copyright/>
                </Layout>
            </Layout>
        );
    }
}


export default Main
