import React, {useEffect, useState} from "react";
import {Col, Typography, Table} from "antd";
import {useDispatch, useSelector} from "react-redux";
import LoadingIndicator from "../common/LoadingIndicator";
import {getTransactions} from "../actions/transactions/TransactionsActions";
import { data } from "../util/Data";
const Transactions =()=>{
    const {Paragraph} = Typography;
    const [loading, setLoading] = useState(false);
    const transactions= useSelector((state) => state.transactions.data);
    const dispatch = useDispatch();
    useEffect(() => {
        const data = async () => {
            setLoading(true);
            await dispatch(getTransactions("0718000624",dispatch));
            setLoading(false);
        };
        data();
    }, [dispatch]);
    if (loading) { // checking for empty url here.
        return <LoadingIndicator/>
    }

   const columns = [
        {
            key: "name",
            title: "Name",
            dataIndex: "name",
        },
        {
            key: "indexno",
            title: "IndexNo",
            dataIndex: "indexno",
        },
        {
            key: "paymentRemarks",
            title: "Payment Type",
            dataIndex: "paymentRemarks",
        },
        {
            key: "amount",
            title: "Amount(GHS)",
            dataIndex: "amount",
        },
        {
            key: "transactionDate",
            title: "Date",
            dataIndex: "transactionDate",
        },
        {
            key: "transactionId",
            title: "Status",
            dataIndex: "transactionId",
        },
    ]

    return(
        <div>
            <div className="ant-col ant-col-24">
                <div className="ant-card">
                    <div className="ant-card-body">
                        <center><Paragraph><b>Transactions</b></Paragraph></center>
                        <div className="table">
                            <Table dataSource={transactions} columns={columns} pagination={true} />

                        </div>


                    </div>
                </div>
            </div>
        </div>
    )
}
export default Transactions
