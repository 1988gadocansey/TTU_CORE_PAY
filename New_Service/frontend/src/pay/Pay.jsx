import React, {useEffect, useState} from "react";
import {Row, Col, Form, Input, Select, DatePicker, InputNumber, message} from 'antd'
import {useDispatch, useSelector} from "react-redux";
import {getProducts} from "../actions/products/ProductActions";
import {useHistory, useParams} from "react-router-dom/cjs/react-router-dom";
import {getUser} from "../actions/users/UserActions";

const Pay = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [loading, setLoading] = useState()
    const [form] = Form.useForm()
    //const {id} = useParams()

    const [paymentType, setPaymentType] = useState()

    const products = useSelector((state) => state.products.data);
    useEffect(getProducts(dispatch), [])
    const productObject = Array.from(products)
    const productOptions = productObject.map((data) =>
        <Select.Option key={data.code}>{data.name} </Select.Option>
    );

    const saveData = (values) => {
        form.validateFields().then(async (values) => {
            // Use values here
            console.log(form.getFieldsValue())
        });
    }

    const onChange = (values) => {
        const productId=values
        setLoading(true)
          /*  history.push({
                pathname: '/checkout',
                state: { params: values },
                data:values
            });*/
      //  history.push(`/checkout/${values}/productId`)

        history.push(`/checkout/${productId}`)
        setPaymentType(values)

    }


    return (
        <div>

            <div className="ant-col ant-col-24">
                <div className="ant-card">
                    <div className="ant-card-body">
                        <Form form={form} layout="horizontal" initialValues={{}} onFinish={saveData}>

                            <Col span={8} xs={24} sm={8} md={8}>
                                <Form.Item name="products" label="Select Payment type"
                                           rules={[{required: true, message: 'Required'}]}>
                                    <Select onChange={onChange} placeholder="Select payment type" allowClear showSearch>
                                        {productOptions}
                                    </Select>
                                </Form.Item>
                            </Col>

                        </Form>
                    </div>
                </div>
            </div>
        </div>


    )
}
export default Pay
