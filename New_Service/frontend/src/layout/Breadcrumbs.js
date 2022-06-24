import React, {Component} from "react";
import {Breadcrumb} from 'antd';
export class Breadcrumbs extends Component {
    static displayName = Breadcrumbs.name;

    render() {
        return (
            <Breadcrumb style={{margin: '16px 0'}}>
                {this.props.children}
            </Breadcrumb>

        );
    }
}

export default Breadcrumbs
