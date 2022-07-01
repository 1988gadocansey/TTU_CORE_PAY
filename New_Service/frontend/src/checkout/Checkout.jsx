import React, {useEffect, useState} from "react";
import {
    Row,
    Col,
    Form,
    Input,
    Select,
    DatePicker,
    InputNumber,
    message,
    Breadcrumb,
    List,
    Button,
    Tooltip,
    Space, Typography, Alert, Divider, Radio, Rate, Spin
} from 'antd'
import {useDispatch, useSelector} from "react-redux";
import {getProducts, getSingle} from "../actions/products/ProductActions";
import {clearPage} from "../actions/checkouts/CheckoutActions";
import {useHistory, useParams} from "react-router-dom/cjs/react-router-dom";
import {getUser} from "../actions/users/UserActions";
import {useLocation} from "react-router-dom";
import {Content} from "antd/es/layout/layout";
import {Option} from "antd/es/mentions";
import LoadingIndicator from "../common/LoadingIndicator";
import {FaCcMastercard, FaCcVisa} from "react-icons/all";

const Checkout = () => {
    const [amount,setAmount]=useState()
    const [paymentOption,setPaymentOption]=useState()
    const dispatch = useDispatch()
    const location = useLocation();
    const [form] = Form.useForm()
    const {productId} = useParams()
    const {Paragraph} = Typography;
    const products = useSelector((state) => state.products.records);
    const students = useSelector((state) => state.users.data);
    useEffect(
              getSingle(productId, dispatch)
        , [productId]
    )
    const amountChange =(e)=> {
         setAmount(e.target.value);
    }
    const PayOptionChange = (e) =>{
        setPaymentOption(e.target.value)
    }
    // it is equal to yourData
    /*const handleDelete = (id) => {
        dispatch(deleteElection(id)).then(() => {
            notification.success({
                message: 'Success',
                description: 'Election Deleted'
            })
        }).catch((error) => {
            notification.warning({
                message: 'Warning',
                description: error.response.data
            })
        })
    }*/
    const onSave= async () =>{
        message.success('Processing payment...')
      /* return( <Spin tip="Loading...">
            <Alert
                message="Alert message title"
                description="Further details about the context of this alert."
                type="info"
            />
        </Spin>)*/
    }
    const onFinish = async (values) => {
        values.id = id
        let newValue = {}
        if (values.dateOfBirth) {
            newValue = {...values, dateOfBirth: values.dateOfBirth.format('YYYY-MM-DD')}
        } else {
            newValue = {...values}
        }
        await dispatch(getProducts(newValue)).then((res) => {
            message.success('Data Saved')
            setLoading(false)
        }).catch((e) => {
            console.log(e)
            message.warning('Could not save data! Make sure required fields have value')
        })
        setLoading(false)
    }
    const validateMessages = {
        required: '${label} is required!',
        types: {
            email: '${label} is not a valid email!',
            number: '${label} is not a valid number!',
        },
        number: {
            range: '${label} must be between ${min} and ${max}',
        },
    };
    const layout = {
        labelCol: {
            span: 8,
        },
        wrapperCol: {
            span: 16,
        },
    };
    if(Object.keys(products).length === 0 ){
        return (
            <LoadingIndicator/>
        )
    }else{
        return (
            <>
                <div className="ant-card-body">
                    <Breadcrumb>
                        <Breadcrumb.Item>Checkout Page</Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <a href="/pay">Back</a>
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <center><h5>Checkout</h5>
                    <Paragraph> Make sure every info on this page is accurate.Transactions are not reversible..</Paragraph>
                </center>


                <Row>
                    <Col xs={{span: 5, offset: 1}} lg={{span: 12, offset: 2}}>
                        <div className="ant-card">
                            <div className="ant-card-body">
                                <Form
                                    name="complex-form"
                                    onFinish={onFinish}
                                    labelCol={{
                                        span: 8,
                                    }}
                                    wrapperCol={{
                                        span: 16,
                                    }}
                                >

                                    <Form.Item
                                        label="Index Number"
                                        style={{
                                            marginBottom: 0,
                                        }}

                                    >
                                        <Form.Item
                                            name="indexno"
                                            rules={[
                                                {
                                                    required: true,
                                                },
                                            ]}
                                            initialValue={students.name}
                                            style={{
                                                display: 'inline-block',
                                                width: 'calc(50% - 8px)',
                                            }}
                                        >
                                            <Input
                                                disabled={true}

                                            />
                                        </Form.Item>
                                        <Form.Item
                                            name="amount"
                                            onChange={amountChange}
                                            rules={[
                                                {
                                                    required: true,
                                                },
                                            ]}
                                            style={{
                                                display: 'inline-block',
                                                width: 'calc(50% - 8px)',
                                                margin: '0 8px',
                                            }}
                                        >

                                            <InputNumber placeholder="Amount"/>
                                        </Form.Item>
                                    </Form.Item>

                                    <Form.Item name="radio-group" label="Pay using Momo">
                                        <Radio.Group onChange={PayOptionChange}>
                                            <Radio value="mtn">MTN</Radio>
                                            <Radio value="airteltigo">AirtelTigo </Radio>
                                            <Radio value="vodafone">VodaCash</Radio>
                                        </Radio.Group>
                                    </Form.Item>





                                </Form>
                            </div>
                        </div>
                    </Col>
                    <Col md={{span: 11, offset: 1}} lg={{span: 6, offset: 1}}>
                        <div className="ant-card">
                            <div className="ant-card-body">
                                <h4>Your Cart</h4>
                                <Row>
                                    <Alert
                                        message= <Paragraph><b>Payment for: {products.name}</b></Paragraph>
                                    description={products.instructions}
                                    type="info"
                                    showIcon
                                    />
                                    <Divider orientation="left"></Divider>
                                    <Paragraph><b>Amount due: GHS{amount}</b></Paragraph>
                                    <Divider orientation="left"></Divider>
                                    <Form.Item label=" " colon={false}>
                                        <Button disabled={!amount||!paymentOption} onClick={onSave} type="primary" htmlType="submit">
                                            Pay
                                        </Button>
                                    </Form.Item>

                                </Row>

                            </div>
                        </div>
                    </Col>

                </Row>
            </>
        )
    }


}
export default Checkout
