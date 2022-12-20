import { Button, Form, Input } from "antd"

const Answer = (props) => {
  return (
    <>
      <Form
        name="basic"
        labelCol={{ span: 2 }}
        wrapperCol={{ span: 22 }}
        initialValues={{ remember: true }}
        onFinish={props.onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Question"
          name="question"
          rules={[{ required: true, message: 'Please input your Answer!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Answer 1"
          name="answer1"
          rules={[{ required: true, message: 'Please input your Answer!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Answer 2"
          name="answer2"
          rules={[{ message: 'Please input your Answer!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Answer 3"
          name="answer3"
          rules={[{ message: 'Please input your Answer!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Answer 4"
          name="answer4"
          rules={[{ message: 'Please input your Answer!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Answer 5"
          name="answer5"
          rules={[{ message: 'Please input your Answer!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 2, span: 22 }}>
          <Button type="primary" htmlType="submit">
            Show Images
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

export default Answer;
