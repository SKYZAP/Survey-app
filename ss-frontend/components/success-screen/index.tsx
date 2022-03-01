import { Button, Result } from 'antd';
import Router from 'next/router';

export const SuccessScreen = () => {
  return (
    <Result
      status="success"
      title="Successfully Answered All Questions!"
      extra={[
        <Button
          type="primary"
          key="console"
          onClick={() => {
            Router.push('/');
          }}
        >
          Answer Again
        </Button>,
      ]}
    />
  );
};
