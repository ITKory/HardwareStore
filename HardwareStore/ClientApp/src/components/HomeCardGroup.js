import React, { useState } from 'react'
import { Button, Card, Space, Col, Row, Modal , Image} from 'antd';
const { Meta } = Card;

const HomeCardGroup = ({ products }) => {

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
          <div key={product.id} onClick={() => { showModal();setProduct(product) }}>
            <Card
              hoverable
              style={{
                width: '400px',
              }}
              cover={<> <img style={{height:'400px'}} alt="example" src={`Images/${product.image}`} /> </>}
            >
              <Meta title={product.name} description={product.description} />
              <Meta title={`${product.cost}р`} />
            </Card>
          </div>
        ))}
      </Space>
      <Modal
        title={product.name}
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        okText="Buy"
      >
        <Image src={`Images/${product.image}`} width={200}/>
        <p>{product.name}</p>
        <p>{product.description}</p>
        <h1>coast</h1>
      </Modal>
    </>

  )
}

export default HomeCardGroup