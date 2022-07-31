import React, {useEffect, useState} from "react";
import {Col, Row} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {fetchStudent} from "../actions/students/StudentActions";
import LoadingIndicator from "../common/LoadingIndicator";

const Transactions =()=>{
    const [loading, setLoading] = useState(false);
    const transactions= useSelector((state) => state.transactions.data);
    const dispatch = useDispatch();
    useEffect(() => {
        const data = async () => {
            setLoading(true);
            await dispatch(fetchStudent("0718000624",dispatch));
            setLoading(false);
        };
        data();
    }, [dispatch]);
    if (loading) { // checking for empty url here.
        return <LoadingIndicator/>
    }
    return(
        <div>
            <div className="ant-col ant-col-24">
                <div className="ant-card">
                    <div className="ant-card-body">

                        <p>Transactions</p>


                    </div>
                </div>
            </div>
        </div>
    )
}
export default Transactions
