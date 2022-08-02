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
import {checkOut, clearPage} from "../actions/checkouts/CheckoutActions";
import {useHistory, useParams} from "react-router-dom/cjs/react-router-dom";
import {getUser} from "../actions/users/UserActions";
import {useLocation} from "react-router-dom";
import {Content} from "antd/es/layout/layout";
import {Option} from "antd/es/mentions";
import LoadingIndicator from "../common/LoadingIndicator";
import {FaCcMastercard, FaCcVisa} from "react-icons/all";
import {fetchStudent, getStudent, getStudentData} from "../actions/students/StudentActions";

const Checkout = () => {
    const [amount, setAmount] = useState()
    const [paymentOption, setPaymentOption] = useState()
    const dispatch = useDispatch()
    const location = useLocation();
    const [form] = Form.useForm()
    const {productId} = useParams()
    const {Paragraph} = Typography;
    const [loading, setLoading] = useState(false);
    const products = useSelector((state) => state.products.records);
    const user= useSelector((state) => state.users.data);
    const student = useSelector((state) => state.student.data);


    useEffect(() => {
        const data = async () => {
           // setLoading(true);
            await dispatch(getUser(dispatch));
           // setLoading(false);
        };
        data();
    }, [dispatch]);



    useEffect(
        getSingle(productId, dispatch)
        , [productId]
    )
    useEffect(() => {
        const data = async () => {
            setLoading(true);
            await dispatch(fetchStudent("0718000624@ttu.edu.gh",dispatch));
            setLoading(false);
        };
        data();
    }, [dispatch]);

    // Case 1
   /* useEffect(() => {
        getStudentData("0718000624@ttu.edu.gh",dispatch) // printed only once when component is mounted
    }, [])*/




    //console.log("student data is " + student.EMAIL)
    const amountChange = (e) => {
        setAmount(e.target.value);
    }
    const PayOptionChange = (e) => {
        setPaymentOption(e.target.value)
    }
    if (loading) { // checking for empty url here.
        return <LoadingIndicator/>
    }
    const saveData = () => {
        // Use values here
        setLoading(true)
        submit(form.getFieldsValue()).then(() => console.log(form.getFieldsValue()))
        //alert("finish");


    }
    const submit = async (values) => {
        message.success('Processing payment...')

        await dispatch(checkOut(values)).then((res) => {
            message.success('Transaction complete log on to records.ttuportal.com to check status.')
            setLoading(false)
        }).catch((e) => {
            console.log(e)
            message.error('Could not complete transaction. Try again later.')
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
    const generateUUID = () => {
        let
            d = new Date().getTime(),
            d2 = (performance && performance.now && (performance.now() * 1000)) || 0;
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
            let r = Math.random() * 16;
            if (d > 0) {
                r = (d + r) % 16 | 0;
                d = Math.floor(d / 16);
            } else {
                r = (d2 + r) % 16 | 0;
                d2 = Math.floor(d2 / 16);
            }
            return (c == 'x' ? r : (r & 0x7 | 0x8)).toString(16);
        });
    };
    const layout = {
        labelCol: {
            span: 8,
        },
        wrapperCol: {
            span: 16,
        },
    };
    if (Object.keys(products).length === 0) {
        return (
            <LoadingIndicator/>
        )
    } else {
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
                    <Paragraph> Make sure every info on this page is accurate.Transactions are not
                        reversible..</Paragraph>
                </center>


                <Row>

                    <Col xs={{span: 5, offset: 1}} lg={{span: 12, offset: 2}}>
                        <div className="ant-card">
                            <div className="ant-card-body">
                                <Form
                                    form={form}
                                    name="complex-form"
                                    onFinish={saveData}
                                    labelCol={{
                                        span: 8,
                                    }}
                                    wrapperCol={{
                                        span: 16,
                                    }}
                                >

                                    <Form.Item name={'indexno'} initialValue={student.INDEXNO} hidden={true}>
                                        <Input type="text"/>
                                    </Form.Item>

                                    <Form.Item name={'level'} initialValue={student.LEVEL} hidden={true}>
                                        <Input type="text"/>
                                    </Form.Item>
                                    <Form.Item name={'name'} initialValue={student.NAME} hidden={true}>
                                        <Input type="text"/>
                                    </Form.Item>

                                    <Form.Item name={'email'} initialValue={student.EMAIL} hidden={true}>
                                        <Input type="text"/>
                                    </Form.Item>
                                    <Form.Item name={'bank'} initialValue={'Prudential'} hidden={true}>
                                        <Input type="text"/>
                                    </Form.Item>
                                    <Form.Item name={'academicYear'} initialValue={'2022/2023'} hidden={true}>
                                        <Input type="text"/>
                                    </Form.Item>

                                    <Form.Item name={'status'} initialValue={'true'} hidden={true}>
                                        <Input type="text"/>
                                    </Form.Item>
                                    <Form.Item name={'transactionId'} initialValue={generateUUID()} hidden={true}>
                                        <Input type="text"/>
                                    </Form.Item>
                                    <Form.Item name={'bankDate'} initialValue={'2022-08-30'} hidden={true}>
                                        <Input type="text"/>
                                    </Form.Item>
                                    <Form.Item name={'users'} initialValue={'3'} hidden={true}>
                                        <Input type="text"/>
                                    </Form.Item>
                                    <Form.Item name={'product'} initialValue={products.code} hidden={true}>
                                        <Input type="text"/>
                                    </Form.Item>

                                    <Form.Item name={'paymentRemarks'} initialValue={products.name} hidden={true}>
                                        <Input type="text"/>
                                    </Form.Item>

                                    <Form.Item
                                        label="Momo No"

                                        style={{
                                            marginBottom: 0,
                                        }}

                                    >
                                        <Form.Item
                                            name="phone"
                                            rules={[
                                                {
                                                    pattern: /^(?:\d*)$/,
                                                    message: "Value should contain just number",
                                                },
                                                {
                                                    pattern: /^[\d]{0,50}$/,
                                                    message: "Value should be less than 10 character",
                                                },
                                            ]}
                                            validateTrigger="onBlur"
                                            initialValue={student.TELEPHONENO}
                                            style={{
                                                display: 'inline-block',
                                                width: 'calc(50% - 8px)',
                                            }}
                                        >
                                            <Input/>
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

                                    <Form.Item name="walletType" label="Pay using Momo">
                                        <Radio.Group onChange={PayOptionChange}>
                                            <Radio value="MTN">MTN</Radio>
                                            <Radio value="AIRTELTIGO">AirtelTigo </Radio>
                                            <Radio value="VODAFONE">VodaCash</Radio>
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
                                        message=<Paragraph><b>Payment for: {products.name}</b></Paragraph>
                                    description={products.instructions}
                                    type="info"
                                    showIcon
                                    />
                                    <Divider orientation="left"></Divider>
                                    <Paragraph><b>Amount due: GHS{amount}</b></Paragraph>
                                    <Divider orientation="left"></Divider>
                                    <Form.Item label=" " colon={false}>
                                        <Button disabled={!amount || !paymentOption} onClick={saveData} type="primary"
                                                htmlType="submit">
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
