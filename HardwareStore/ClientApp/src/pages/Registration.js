import { InfoCircleOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, Radio } from 'antd';
import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { authContext } from '../constants/AuthConstants';
import { Login } from '../data/fetchs';
import useAuth from '../hooks/AuthHook';

const Registration = () => {
 
    let history = useHistory();
    let location = useLocation();
    let auth = useAuth(authContext);
    const [user,setUser] = useState([])
    const inputEventTrigger =(e)=>{
        setUser({
          ...user,
          [e.target.name]: e.target.value
      })
      }

  return (
    <Card >
 <Form
      name="basic"
      labelCol={{ span: 8, }
      }
      wrapperCol={{ span: 16, }}
      initialValues={{ remember: true, }}
      autoComplete="off">

      <Form.Item
        label="Email"
        name="Email"
        rules={[
          {
            required: true,
            message: 'Please input your email!',
          },
        ]}>
        <Input name='Login' onInput={(e) => {inputEventTrigger(e)}} />
      </Form.Item>

      <Form.Item
        label="Name"
        name="Name"
        rules={[
          {
            required: true,
            message: 'Please input your name!',
          },
        ]}
      >
        <Input.Password name='Name'   value={user.password} onInput={(e) => {inputEventTrigger(e)}} />
      </Form.Item>


            
                  <Form.Item
                    label="Phone number"
                    name="PhoneNumber"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your Email!',
                      },
                    ]}
                  >
                    <Input.Password name='PhoneNumber'   value={user.password} onInput={(e) => {inputEventTrigger(e)}} />
                  </Form.Item>
      <Form.Item
        label="Password"
        name="Password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password name='Password'   value={user.password} onInput={(e) => {inputEventTrigger(e)}} />
      </Form.Item>

      <Form.Item
        label="Password Confirm"
        name="PasswordConfirm"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password name='passwordConfirm'   value={user.password} onInput={(e) => {inputEventTrigger(e)}} />
      </Form.Item>

      <Form.Item
        wrapperCol={{ offset: 8, span: 16, }} >
        <Button type="primary" htmlType="submit" onClick={() => alert(1)} >
          Submit
        </Button>
      </Form.Item>
    </Form>
    </Card>
  );
};

export default Registration;