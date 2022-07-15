const { Form, Input, Button, Checkbox, Row, Col, Divider } = antd;
const FormLayout = () => {
  return(
      <>
      <div>
        <h3>Inline Form with flex columns</h3>
        <Form layout="inline">

          <Row type="flex" justify="space-between" gutter={16}>

            <Col>
              <Form.Item label="Label" colon={false}>
                <Input placeholder="Placeholder"/>
              </Form.Item>
            </Col>

            <Col>
              <Form.Item label="Label" colon={true}>
                <Checkbox.Group>
                  <Checkbox value="A">Test A</Checkbox>
                  <Checkbox value="B">Test B</Checkbox>
                  <Checkbox value="C">Test C</Checkbox>
                </Checkbox.Group>
              </Form.Item>
            </Col>

            <Col>
              <Form.Item>
                <Button type="primary">Search</Button>
              </Form.Item>
            </Col>

          </Row>

        </Form>

        <Divider/>
        <h3>Vertical Form within columns</h3>

        <Form layout="vertical">

          <Row gutter={24}>

            <Col span={6}>
              <Form.Item label="Label" colon={false}>
                <Input placeholder="Placeholder"/>
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item label="Label" colon={false}>
                <Input placeholder="Placeholder"/>
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item label="Label" colon={false}>
                <Input placeholder="Placeholder"/>
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item label="Label" colon={false}>
                <Input placeholder="Placeholder"/>
              </Form.Item>
            </Col>

          </Row>

        </Form>
      </div>
     </>
  );
}