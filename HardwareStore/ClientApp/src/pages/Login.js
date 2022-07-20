import { Button, Checkbox, Form, Input } from 'antd';
import React, { useState } from 'react';
import { Route, useHistory, useLocation } from 'react-router-dom';
import { authContext } from '../constants/AuthConstants';
import useAuth from '../hooks/AuthHook';
import { Login } from '../data/fetchs';





const Auth = () => {
  let history = useHistory();
  let location = useLocation();
  let auth = useAuth(authContext);
  let { from } = location.state || { from: { pathname: "/" } };
  const [user,setUser] = useState([])

  const inputEventTrigger =(e)=>{
    setUser({
      ...user,
      [e.target.name]: e.target.value
  })
  }
  return (
    <Form
      name="basic"
      labelCol={{ span: 8, }
      }
      wrapperCol={{ span: 16, }}
      initialValues={{ remember: true, }}
      autoComplete="off">

      <Form.Item
        label="Email"
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}>
        <Input name='Login' onInput={(e) => {inputEventTrigger(e)}} />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password name='password'   value={user.password} onInput={(e) => {inputEventTrigger(e)}} />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item
        wrapperCol={{ offset: 8, span: 16, }} >

        <Button type="primary" htmlType="submit" onClick={() =>  Login({auth,from,history,user} )} >
          Submit
        </Button>

      </Form.Item>
    </Form>
  )
}

export default Auth