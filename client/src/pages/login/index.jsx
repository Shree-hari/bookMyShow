import React from 'react'
import { Button, Form, Input, message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { LoginUser } from '../../api/users';

function Login() {
    const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const response = await LoginUser(values);
      console.log(response.data);
      if (response.success) {
          message.success(response.message);
          localStorage.setItem('token', response.data);
          navigate('/');
      }else{
          message.error(response.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
        <main className='App-header'>
        <h1>Login To BookMyShow</h1>
        <section className='mw-500 text-center px-3'>
            <Form layout="vertical" onFinish={onFinish}>
                <Form.Item
                    label="Email"
                    htmlFor='email'
                    name="email"
                    className='d-block'
                    rules={[
                        {required:true, message: "Email is required"},
                        {type:"email", message: "Enter a valid email."},
                    ]}
                >
                    <Input type="text" placeholder="Enter your email" ></Input>
                </Form.Item>
                <Form.Item
                    label="Password"
                    htmlFor='password'
                    name="password"
                    className='d-block'
                    rules={[{required:true, message: "Password is required"}]}
                >
                    <Input type="password" placeholder="Enter your password" ></Input>
                </Form.Item>
                <Form.Item
                    className='d-block'>
                    <Button type='primary' block htmlType='submit'
                        style={{fontSize:"1rem", fontWeight: "600"}}>
                            Login
                        </Button>
                </Form.Item>
            </Form>
            <div>
                <p>New User? <Link to="/register">Register Here</Link></p>
            </div>
        </section>
        </main>
    </>
  )
}

export default Login