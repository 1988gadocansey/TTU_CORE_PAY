import React, {Component} from 'react';
import './Profile.css';
import {Content} from "antd/es/layout/layout";
import {Avatar, Row} from "antd";

class Profile extends Component {
    constructor(props) {
        super(props);
        localStorage.setItem('email', this.props.currentUser.email);

        console.log(props);
    }

    render() {
        return (
            <>


                <Content>
                    <div className="ant-col ant-col-24">
                        <div className="ant-card">
                                 <Row justify="center" align="middle">
                                    {
                                        this.props.currentUser.imageUrl ? (

                                            <Avatar size={100}  src={this.props.currentUser.imageUrl}  alt={this.props.currentUser.name}/>

                                        ) : (
                                            <div className="text-avatar">
                                                <span>{this.props.currentUser.name && this.props.currentUser.name[0]}</span>
                                            </div>
                                        )
                                    }

                                <div className="">
                                    <h5>{this.props.currentUser.name}</h5>
                                    <p className="profile-email">{this.props.currentUser.email}</p>

                                </div>
                                 </Row>
                            </div>
                        </div>

                </Content>


            </>
        );
    }
}

export default Profile
