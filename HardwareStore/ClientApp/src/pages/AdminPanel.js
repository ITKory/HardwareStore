
import { UserOutlined, VideoCameraOutlined, } from '@ant-design/icons';
import { Layout, Menu, Modal } from 'antd';
import React, { useState } from 'react';
import AdminCardGroup from '../components/AdminCardGroup';
import UploadImage from '../components/UploadImage';
const { Header, Content, Footer, Sider } = Layout;
const items = [
    UserOutlined,
    VideoCameraOutlined,
].map((icon, index) => ({
    key: String(index + 1),
    icon: React.createElement(icon),
    label: `nav ${index + 1}`,
}));

const AdminPanel = ({ products }) => {

    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('Content of the modal');
    const [editable, setEditable] = useState([]);
    const showModal = () => {
        setVisible(true);
    };

    console.log(sessionStorage)
    const handleOk = () => {
        setModalText('The modal will be closed after two seconds');
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
        <Layout hasSider>
            <Sider
                style={{
                    overflow: 'auto', height: '100vh',
                    position: 'fixed', left: 0, top: 0, bottom: 0,
                }}>
                <div className="logo" />
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']} items={items} />
            </Sider>
            <Layout className="site-layout" style={{ marginLeft: 200, }}>
                <Header className="site-layout-background" style={{ padding: 0, }} />
                <Content style={{ margin: '24px 16px 0', overflow: 'initial', }}>

                    <div className="site-layout-background" style={{ padding: 24, textAlign: 'center', }}>
                        <AdminCardGroup products={products} showModal={showModal} setEditable={setEditable} />
                    </div>
                    <Modal
                        title="Title"
                        visible={visible}
                        onOk={handleOk}
                        confirmLoading={confirmLoading}
                        onCancel={handleCancel}
                    >
                        <p>{modalText}</p>
                        <p>id: {editable.id}</p>
                        <p>name: {editable.name}</p>
                        <p>class: {editable.year}</p>
                        <p>Upload picture (jpg/png) {<UploadImage/>}</p>
                    </Modal>
                </Content>
            </Layout>
        </Layout>
    )
}

export default AdminPanel