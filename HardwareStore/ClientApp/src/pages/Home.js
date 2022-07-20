import React from 'react'
import { Layout, Menu, BackTop } from 'antd';
 import TabPanel from '../components/TabPanel';
import { Link } from 'react-router-dom';
import { Items } from '../constants/NavigateConstants';

const { Header, Content, Footer, Sider } = Layout;
 


const Home = ({ products }) => {


    return (

        <Layout>
            <Sider
                breakpoint="lg"
                collapsedWidth="0">
                <Menu
                    theme="dark"
                    mode="inline"
                    items={Items}
                />
            </Sider>
            <Layout>
                <Header
                    className="site-layout-sub-header-background"
                    style={{ padding: 0, }}>
                    <div className="logo" style={{ margin: '0 50%  ', }} >
                        <img height={'50px'} src='https://logos-world.net/wp-content/uploads/2021/09/Orange-Emblem.png' />
                    </div>
                </Header>
                <Content
                    style={{ margin: '24px 16px 0', }}>
                    <div
                        className="site-layout-background"
                        style={{ padding: 24, minHeight: 360, }} >
                        <>

                            <TabPanel products={products} />
                            <BackTop />

                        </>
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center', }}>
                    Mari stroi lomai ©2022 Created by Alex for Mari
                </Footer>
            </Layout>

        </Layout>
    )
}

export default Home