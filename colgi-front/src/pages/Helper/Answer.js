import { Button, Form, Input } from "antd"
import './index.scss'

const Answer = (props) => {
  return (
    <>
      <div className="answer-container">
      <Form
        form={props.form}
        name="basic"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        initialValues={{ remember: true }}
        onFinish={props.onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Question"
          name="question"
          rules={[{ required: true, message: 'Please input your Answer!' }]}
        >
          <Input style={{width:'100%', border: '1px solid #D9D9D9', borderRadius: '5px', fontWeight:'400'}}/>
        </Form.Item>
        <Form.Item
          label="Answer 1"
          name="answer1"
          rules={[{ required: true, message: 'Please input your Answer!' }]}
        >
          <Input style={{width:'100%', border: '1px solid #D9D9D9', borderRadius: '5px', fontWeight:'400'}}/>
        </Form.Item>

        <Form.Item
          label="Answer 2"
          name="answer2"
          rules={[{ message: 'Please input your Answer!' }]}
        >
          <Input style={{width:'100%', border: '1px solid #D9D9D9', borderRadius: '5px', fontWeight:'400'}}/>
        </Form.Item>

        <Form.Item
          label="Answer 3"
          name="answer3"
          rules={[{ message: 'Please input your Answer!' }]}
        >
          <Input style={{width:'100%', border: '1px solid #D9D9D9', borderRadius: '5px', fontWeight:'400'}}/>
        </Form.Item>

        <Form.Item
          label="Answer 4"
          name="answer4"
          rules={[{ message: 'Please input your Answer!' }]}
        >
          <Input style={{width:'100%', border: '1px solid #D9D9D9', borderRadius: '5px', fontWeight:'400'}}/>
        </Form.Item>

        {/* <Form.Item
          label="Answer 5"
          name="answer5"
          rules={[{ message: 'Please input your Answer!' }]}
        >
          <Input style={{width:'100%', border: '1px solid #D9D9D9', borderRadius: '5px', fontWeight:'400'}}/>
        </Form.Item> */}

        <Form.Item wrapperCol={{ offset: 1, span: 23 }}>
          <Button style={{width:'100%', backgroundColor:'gray', border:0, borderRadius:'5px'}} type="primary" htmlType="submit">
            Show Images
          </Button>
        </Form.Item>
      </Form>
    </div>
    </>
  )
}

export default Answer;
