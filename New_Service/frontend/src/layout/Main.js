import React, {useState} from "react";
import { Layout, Menu, Breadcrumb } from 'antd';
import Copyright from "./Copyright";
import NavBar from "./NavBar";
import 'antd/dist/antd.css';
import './layout.css';
import { Col, Row, Typography, Button } from 'antd';
import AppLogo from "./AppLogo";
import Breadcrumbs from "./Breadcrumbs";
import {connect} from "react-redux";
import {getUser} from "../actions/users/UserActions";
import {NavLink, withRouter} from "react-router-dom";
import {ACCESS_TOKEN} from "../constants";
import Alert from "react-s-alert";
import {PoweroffOutlined} from "@ant-design/icons";


const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const { Text } = Typography
const handleLogout = () => {
 return alert("logout....")
}
 class Main extends React.Component {
     constructor(props) {
         super(props);
         this.handleLogout = this.handleLogout.bind(this);
     }
    state = {
        collapsed: false,
        username: ''
    };

    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({ collapsed });
    };
     componentDidMount() {
        this.setState({username:"Gadoo"})

     }
   handleLogout=()=>{
       localStorage.removeItem(ACCESS_TOKEN);
       localStorage.removeItem("email");
       this.setState({
           authenticated: false,
           currentUser: null
       });
       //Alert.success("You're safely logged out!");
       //this.history.push('/')
       this.props.history.push('/');

   }
     render() {
        const { collapsed } = this.state;
        return (
            <Layout style={{ minHeight: '100vh' }}>

                 <NavBar  authenticated={this.state.authenticated}
                          currentUser={this.state.currentUser}/>
                <Layout className="site-layout" >

                    <Header className="site-layout-background" style={{ padding: 0 }} >

                        { this.props.authenticated ? (
                            <div style={{float:"right",marginRight:"50px"}}>
                                <span>Hi  {this.props.currentUser.name}! </span>
                                <span style={{marginLeft:10}}><PoweroffOutlined style={{ fontSize: '20px', color: '#08c' }} onClick={this.handleLogout}/></span>
                            </div>

                        ): (
                            <></>

                        )}
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



/*const mapStateToProps = (state) => ({
    user: state.users.data
})

const mapDispatchToProps = (dispatch) => ({
    data: (payload) => dispatch(getUser(payload)),
})*/
export default  withRouter (Main);

