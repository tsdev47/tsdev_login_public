import React, { useState, useEffect } from 'react'
import "antd/dist/antd.css";
import { Button, Form, Input, message } from "antd"
import languages from './data/labels.js'
import loginService from './services/login'
import storage from './functions/storage'
import { OmitProps } from 'antd/lib/transfer/ListBody';

const LoginForm = (props) => {
  // eslint-disable-next-line no-unused-vars
  const [user, setUser] = useState(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    const user = storage.loadUser()
    setUser(user)
  }, [])

  const getLabel = (type) => languages[props.language][type]

  const onFinish = async () => {
    try {
      const user = await loginService.login({
        email, password
      })
      setEmail('')
      setPassword('')
      setUser(user)
      storage.saveUser(user)
      // eslint-disable-next-line no-template-curly-in-string
      message.success(getLabel('loginSuccess').replace('${name}', user.name))
    } catch(exception) {
      message.error(getLabel('loginFailed'))
    }
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const handleLogout = () => {
    setUser(null)
    storage.logoutUser()
  }

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  };

  if ( !user ) {
    return (
      <Form
        {...layout}
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={() => onFinish()}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your email!',
            },
          ]}
        >
          <Input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
          />
        </Form.Item>

        <Form.Item
          label={getLabel('labelPassword')}
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            {getLabel('loginButLabel')}
          </Button>
        </Form.Item>
      </Form>
    )
  }

  return (
    <div>
      <p>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>
    </div>
  )
}

export default LoginForm