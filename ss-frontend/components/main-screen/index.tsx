import { Button, Form, Input, Layout, Slider } from 'antd';
import { Content, Footer, Header } from 'antd/lib/layout/layout';
import { useState } from 'react';
import _ from 'lodash';
import axios from 'axios';
import Router from 'next/router';

export const MainScreen = () => {
  const [q4Value, setQ4Value] = useState(1);
  const [loading, setLoading] = useState(false);

  const questions = [
    'What is your name?',
    'Where are you from?',
    'What are your hobbies?',
    'On a scale of 1 - 10 how satisfied are you with your life?',
    'Are birds real?',
  ];
  const onFinish = async (values: any) => {
    setLoading(true);
    const response = Object.values(values);
    setTimeout(async () => {
      const res = await axios.post(
        'http://localhost:3000/api/survey/create',
        {
          question: questions,
          response: response,
          name: response[0],
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      Router.push('/success');
      setLoading(false);
    }, 4000);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <Layout style={{ height: '100%' }}>
      <Header>
        <h1 style={{ color: 'white', textAlign: 'center' }}>Survey App</h1>
      </Header>
      <Content style={{ justifyContent: 'center', margin: 'auto' }}>
        <div style={{ padding: '15px' }}>
          <Form
            name="basic"
            layout="vertical"
            initialValues={{ remember: true }}
            style={{ justifyItems: 'center' }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label={`${questions[0]}`}
              name="question1"
              rules={[
                { required: true, message: 'Please answer the question!' },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label={`${questions[1]}`}
              name="question2"
              rules={[
                { required: true, message: 'Please answer the question!' },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label={`${questions[2]}`}
              name="question3"
              rules={[
                { required: true, message: 'Please answer the question!' },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label={`${questions[3]}`}
              name="question4"
              rules={[
                { required: true, message: 'Please answer the question!' },
              ]}
            >
              <Slider
                min={1}
                max={10}
                onChange={(val) => {
                  setQ4Value(val);
                }}
                value={q4Value}
              />
            </Form.Item>

            <Form.Item
              label={`${questions[4]}`}
              name="question5"
              rules={[
                { required: true, message: 'Please answer the question!' },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button loading={loading} type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        © Copyright 2022 Some Survey Corp
      </Footer>
    </Layout>
  );
};
