import { Input, Row, Form, Button } from 'antd';
import axios from "axios"

import { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import ShowImage from "./ShowImage";
import { qna as dummyQna, images as dummyImages } from './dummyData';

const generateUrl = (prompt) => {
  return `/generate?prompt=${prompt}&model=SD1-prod&cnt=6&name=test`
}

const InitialPage = () => {
  const [prompts, setPrompt] = useState(null)

  useEffect(() => {
    initPrompts();
  }, [])

  const initPrompts = () => {
    setPrompt({
      q: '',
      p1: '',
      p1_answer: '',
      p1_images: [],
      p2: '',
      p2_answer: '',
      p2_images: [],
      p3: '',
      p3_answer: '',
      p3_images: [],
      p4: '',
      p4_answer: '',
      p4_images: [],
      p5: '',
      p4_answer: '',
      p5_images: [],
    })
  }

  const generateImage = (values) => {
    initPrompts();

    let new_prompts = {
      q: values.question,
      p1: '',
      p1_answer: '',
      p1_images: [],
      p2: '',
      p2_answer: '',
      p2_images: [],
      p3: '',
      p3_answer: '',
      p3_images: [],
      p4: '',
      p4_answer: '',
      p4_images: [],
      p5: '',
      p4_answer: '',
      p5_images: [],
    }

    const items = [values.prompt1, values.prompt2, values.prompt3, values.prompt4]
    items.map(async (value, idx) => {
      if (!value) return;
      /* --------------- 실제 환경 ------------------ */
      new_prompts[`p${Number(idx) + 1}_answer`] = value
      new_prompts[`p${Number(idx) + 1}`] = value
      setPrompt({...new_prompts})

      const img_resp = await axios.get(generateUrl(value))
      // const img_resp = await axios.get('?cnt=6')
      new_prompts[`p${Number(idx) + 1}_images`] = img_resp.data.result
      setPrompt({...new_prompts})

      /* --------------- 더미 ------------------ */
      // new_prompts[`p${Number(idx) + 1}_answer`] = value
      // new_prompts[`p${Number(idx) + 1}`] = 'promptprompt'
      // new_prompts[`p${Number(idx) + 1}_images`] = dummyImages
      // setPrompt({ ...new_prompts })
    })
  }

  const initialComponent = () => (
    <>
      <div className='initial-container' >
        <Row>
            <Form
              style={{width: '700px'}}
              name="basic"
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 20 }}
              initialValues={{ remember: true }}
              onFinish={generateImage}
              autoComplete="off"
            >
              <Form.Item
                label="Prompt 1"
                name="prompt1"
                rules={[{ required: true, message: 'Please input your Prompt!' }]}
              >
                <Input style={{ width: '100%', border: '1px solid #D9D9D9', borderRadius: '5px', fontWeight: '400' }} />
              </Form.Item>
              <Form.Item
                label="Prompt 2"
                name="prompt2"
                rules={[{ message: 'Please input your Prompt!' }]}
              >
                <Input style={{ width: '100%', border: '1px solid #D9D9D9', borderRadius: '5px', fontWeight: '400' }} />
              </Form.Item>

              <Form.Item
                label="Prompt 3"
                name="prompt3"
                rules={[{ message: 'Please input your Prompt!' }]}
              >
                <Input style={{ width: '100%', border: '1px solid #D9D9D9', borderRadius: '5px', fontWeight: '400' }} />
              </Form.Item>

              <Form.Item
                label="Prompt 4"
                name="prompt4"
                rules={[{ message: 'Please input your Prompt!' }]}
              >
                <Input style={{ width: '100%', border: '1px solid #D9D9D9', borderRadius: '5px', fontWeight: '400' }} />
              </Form.Item>



              <Form.Item wrapperCol={{ offset: 1, span: 23 }}>
                <Button style={{width:'100%', backgroundColor:'gray', border:0, borderRadius:'5px'}} type="primary" htmlType="submit">
                  Generate Images
                </Button>
              </Form.Item>
            </Form>
        </Row>
        {prompts?.p1 !== '' && <ShowImage prompts={prompts} />}
      </div>
    </>
  )

  return (
    <>
      <Header />
      <div>
        {initialComponent()}
      </div>
    </>
  )
}

export default InitialPage
