import { Button, Row, Popover } from "antd"

const Question = (props) => {
  return (
    <>
      <h3>Click and Check sample answers</h3>
      {props.suggestions && props.suggestions.map(suggestion => (
        <Row style={{marginTop: '10px'}}>
          <Popover placement="rightTop" title={suggestion.question} trigger="click" content={
            <>
              <div>{suggestion.answer_1}</div>
              <div>{suggestion.answer_2}</div>
              <div>{suggestion.answer_3}</div>
              <div>{suggestion.answer_4}</div>
              <div>{suggestion.answer_5}</div>
            </>
          }>
            <Button>{suggestion.question}</Button>
          </Popover>
        </Row>
      ))}
      <Button style={{marginTop: '20px'}} type="primary" onClick={props.getQuestion}>Get More Ideas</Button>
    </>
  )
}

export default Question
