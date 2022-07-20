import { Tabs } from 'antd';
import React from 'react';
import AdminCardGroup from './AdminCardGroup';
import HomeCardGroup from './HomeCardGroup';
 

const { TabPane } = Tabs;

const TabPanel = ({products}) => {
  return (
    <div className="card-container">
    <Tabs type="card">
      <TabPane tab="Tab Title 1" key="1">
      <HomeCardGroup products={products}/>
      </TabPane>
      <TabPane tab="Tab Title 2" key="2">
      <>lalala</>
      </TabPane>
      <TabPane tab="Tab Title 3" key="3">
        <p>Content of Tab Pane 3</p>
        <p>Content of Tab Pane 3</p>
        <p>Content of Tab Pane 3</p>
      </TabPane>
    </Tabs>
  </div>
  )
}

export default TabPanel