import { useEffect, useState } from "react";
import axios from "axios"

import { Button, Row, Col, Popover } from "antd"

import { questionPrompt, solutionPrompt } from "./promptHelper";

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

  useEffect(() => {
    setHistory([])
    initPrompts();
  }, []);

  const getQuestion = async () => {
    const prompt = questionPrompt(histories);

    const resp = await axios.post(`/gpt/complete`, {
      prompt: prompt,
      cnt: 4,
      type: 'qna'
    });
    console.log(resp.data)

    setSuggestion(resp.data.result)
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

      const prompt = solutionPrompt(histories, values, value)

      const resp = await axios.post(`/gpt/complete`, {
        prompt: prompt,
        cnt: 1,
      });

      new_prompts[`p${Number(idx) + 1}_answer`] = value
      new_prompts[`p${Number(idx) + 1}`] = resp.data.result[0]
      setPrompt({...new_prompts})

      // const img_resp = await axios.get(generateUrl(resp.data.result[0]))
      const img_resp = await axios.get('?cnt=6')
      new_prompts[`p${Number(idx) + 1}_images`] = img_resp.data.result
      setPrompt({...new_prompts})
    })
  }

  const addHistory = ({ question, answer }) => {
    setHistory([
      ...histories,
      {
        question: question,
        answer: answer
      }
    ])
    getQuestion();
  };

  return (
    <>
      <h2>Check Your History</h2>

      <Row style={{marginBottom: '20px'}}>
        <Col span={24}>
          {props.prompt &&
            <Popover placement="top" title="Initial Prompt" content={props.prompt} trigger="hover">
              <Button style={{marginRight: '5px'}}  type="primary">{props.prompt}</Button>
            </Popover>
          }

          {histories && histories.map(history => (
            <>
              <Popover placement="top" title={history.question} content={history.answer} trigger="hover">
                <Button style={{marginRight: '5px'}}>{history.answer}</Button>
              </Popover>
            </>
          ))}
        </Col>
      </Row>

      <h3>Test Your Ideas</h3>
      <p>You can generate images based on your Q&A and histories</p>
      <Row style={{marginTop: '40px'}}>
        <Col span={8}>
          <Question suggestions={suggestions} getQuestion={getQuestion} />
        </Col>
        <Col span={16}>
          <Answer onFinish={onFinish} />
        </Col>
      </Row>

      {prompts?.p1 !== '' && <ShowImage prompts={prompts} addHistory={addHistory} />}
    </>
  )
}

export default Helper
