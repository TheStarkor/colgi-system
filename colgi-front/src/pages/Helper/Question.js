import { Button, Row, Popover } from "antd"
import { RedoOutlined } from '@ant-design/icons'
import './index.scss'

const Question = (props) => {
  return (
    <>
      {/* <h3>Click and Check sample answers</h3> */}
      <div className="question-request-container">
        <div className="question-request-button" type="primary" onClick={props.getQuestion}>
          {props?.isLoading ? <>Please Waiting...</> : <p className="desc">Get More Ideas</p>}
          <RedoOutlined style={{fontSize: '12px'}}/>
        </div>
      </div>

      {props.suggestions && props.suggestions.map(suggestion => (
        <Row style={{marginTop: '10px'}}>
          <Button onClick={() => props.onFill(suggestion)} style={{width:'100%', border:0, boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', borderRadius: '5px', fontWeight:'400'}}>{suggestion.question}</Button>
        </Row>
      ))}
    </>
  )
}

export default Question
