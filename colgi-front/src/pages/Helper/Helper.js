import { useEffect, useState } from "react";
import axios from "axios"

import { Button, Row, Col, Popover, Form } from "antd"
import { CaretRightOutlined } from '@ant-design/icons'

import { questionPrompt, solutionPrompt } from "./promptHelper";
import { qna as dummyQna, images as dummyImages } from './dummyData';

import Answer from "./Answer";
import Question from "./Question";
import ShowImage from "./ShowImage";

const generateUrl = (prompt) => {
  return `/generate?prompt=${prompt}&model=SD1-prod&cnt=6&name=test`
}

const Helper = (props) => {
  const [histories, setHistory] = useState(null);
  const [suggestions, setSuggestion] = useState(null);
  const [prompts, setPrompt] = useState(null)
  const [form] = Form.useForm();

  useEffect(() => {
    setHistory([])
    initPrompts();
    getQuestion();
  }, []);

  const getQuestion = async (histories = null) => {
    /* --------------- 실제 환경 ------------------ */
    const prompt = questionPrompt(histories, props.prompt);
    const resp = await axios.post(`/gpt/complete`, {
      prompt: prompt,
      cnt: 4,
      type: 'qna'
    });

    setSuggestion(resp.data.result)

    /* --------------- 더미 ------------------ */
    // setSuggestion(dummyQna)
  }

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

  const onFinish = async (values) => {
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

    const items = [values.answer1, values.answer2, values.answer3, values.answer4, values.answer5]
    items.map(async (value, idx) => {
      if (!value) return;
      /* --------------- 실제 환경 ------------------ */
      const prompt = solutionPrompt(histories, values, value, props.prompt)

      const resp = await axios.post(`/gpt/complete`, {
        prompt: prompt,
        cnt: 1,
      });

      new_prompts[`p${Number(idx) + 1}_answer`] = value
      new_prompts[`p${Number(idx) + 1}`] = resp.data.result[0]
      setPrompt({...new_prompts})

      const img_resp = await axios.get(generateUrl(resp.data.result[0]))
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

  const addHistory = ({ question, answer }) => {
    const new_history = [
      ...histories,
      {
        question: question,
        answer: answer
      }
    ]

    setHistory(new_history)
    getQuestion(new_history);
  };

  const onFill = (values) => {
    form.setFieldsValue({
      question: values.question
    })
  }

  return (
    <>
      <div className="helper-container">
        <div className="helper-box">
          <div className="history-container">
            <h2>Check Your History</h2>
            <p>You can generate images based on your Q&A and histories</p>
            <Row style={{ backgroundColor: '#EEEEEE', padding: '20px', display: 'flex' }}>
              <Col span={24}>
                {props.prompt &&
                  <Popover placement="top" title="Initial Prompt" content={props.prompt} trigger="hover">
                    <Button style={{marginRight: '5px', marginBottom: '8px', backgroundColor: 'white', fontWeight: '600', border: '2px solid #a3a3a3', color:'black', borderRadius: '30px', boxShadow:'0 2px 0 rgb(0 0 0 / 2%)'}} type="primary">{props.prompt}</Button>
                  </Popover>
                }

                {histories && histories.map(history => (
                  <>
                    <Popover placement="bottom" title={history.question} content={history.answer} trigger="hover">
                      <Button style={{ marginRight: '5px', borderRadius: '30px' }}>{history.answer}</Button>
                    </Popover>
                  </>
                ))}
              </Col>
            </Row>
          </div>

          {/* <h3>Test Your Ideas</h3> */}
          <div className="question-container">
            <h2>Get questions and give answer</h2>
            <p>You can get random questions based on your history</p>
            <Row style={{marginTop:'20px'}}>
              <Col span={8}>
                <Question onFill={onFill} suggestions={suggestions} getQuestion={() => getQuestion(histories)} />
              </Col>
              <Col span={1}>
                <div className="center-arrow">
                  <CaretRightOutlined style={{color:'gray', fontSize:'20px'}}/>
                </div>
              </Col>
              <Col span={15}>
                <Answer form={form} onFinish={onFinish} />
              </Col>
            </Row>
          </div>

          <div className="photo-container">
          <h2>Generated Images</h2>
            <p>You can get random questions based on your history</p>
            {prompts?.p1 !== '' && <ShowImage prompts={prompts} addHistory={addHistory} />}
          </div>
        </div>
      </div>
    </>
  )
}

export default Helper
