import React, { useState } from 'react'
import { Button, Card, Space, Col, Row, Modal, Image , Form,Switch,Select,Radio,Input} from 'antd';
import UploadImage from './UploadImage';
import TextArea from 'antd/lib/input/TextArea';
const { Meta } = Card;

const AdminCardGroup = ({ products }) => {

    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [product, setProduct] = useState([]);



    const showModal = () => {
        setVisible(true);
      };

    const handleOk = () => {
        setConfirmLoading(true);
        setTimeout(() => {
            setVisible(false);
            setConfirmLoading(false);
        }, 2000);
    };

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setVisible(false);
    };

    return (
        <>
            <Space size={[8, 16]} wrap>
                {products.map((product) => (
                    <Card
                            key={product.id}
                            hoverable
                            style={{
                                width: '400px',
                            }}
                            cover={<> <img  style={{height:400}} alt="example" src={`Images/${product.image}`}  onClick={() => {  setProduct(product) ; showModal()}} /> </>}
                        >
                        
                            <Meta  title={product.name} description={product.description} />
                            <Meta title={`${product.cost}p`}/>
                        </Card>
                        
                ))}
            </Space>
            <Modal
                title={product.name}
                visible={visible}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                okText="Change"
            >
                <UploadImage img={`Images/${product.image}`}/>

                <Form
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 14,
      }}
      layout="horizontal"
      size='Default'
    >
      <Form.Item label="Name">
        <Input value={product.name} />
      </Form.Item>
      <Form.Item label="Description">
        <TextArea value={product.description} />
      </Form.Item>
      <Form.Item label="coast">
        <Input value={product.cost} />
      </Form.Item>
      <Form.Item label="Visible" valuePropName="checked">
        <Switch />
      </Form.Item>
      <Form.Item >
        <Button type='danger'>Delete</Button>
      </Form.Item>
    </Form>


            </Modal>
        </>
    )
}

export default AdminCardGroup