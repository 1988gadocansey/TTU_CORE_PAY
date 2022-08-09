import React, {useEffect, useState} from "react";
import {Col, Typography, Table} from "antd";
import {useDispatch, useSelector} from "react-redux";
import LoadingIndicator from "../common/LoadingIndicator";
import API from "../util/api";
const Transactions =()=>{
    const {Paragraph} = Typography;
    const [loading, setLoading] = useState(false);
    const records= useSelector((state) => state.transactions.data);
    const dispatch = useDispatch();
    const [user, setUser] = useState([]);
    const [transactions, setTransactions] =useState([]);
    useEffect(() => {
        API.get('/user/me').then((response) => {
            setUser(response.data);
        });
    }, [])

    useEffect(() => {
        API.get('/payments/' + user.email).then((response) => {
            setTransactions(response.data);
        });
    }, [])

    if (loading) {
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
            key: "status",
            title: "Status",
            dataIndex: "status",
        },
    ]

    return(
        <div>
            <div className="ant-col ant-col-24">
                <div className="ant-card">
                    <div className="ant-card-body">
                        <center><Paragraph><b>Transactions</b></Paragraph></center>
                        <div className="table">
                            <Table   dataSource={transactions} columns={columns} pagination={true} />

                        </div>


                    </div>
                </div>
            </div>
        </div>
    )
}
export default Transactions
