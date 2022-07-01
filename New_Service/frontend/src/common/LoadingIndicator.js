import React from 'react';
import {Spin} from "antd";

export default function LoadingIndicator(props) {
    return (

   <center> <Spin tip="Loading...">
       {/* <Alert
            message="Alert message title"
            description="Further details about the context of this alert."
            type="info"
        />*/}
    </Spin></center>
    );
}
