import { Input, Button, Row } from 'antd';
import { useState } from 'react';
import { HomeOutlined } from '@ant-design/icons'
import Helper from './Helper';

const { Search } = Input;

const InitialPage = () => {
  const [prompt, setPrompt] = useState(null);
  const [isStart, setStart] = useState(null);

  const generate = (prompt) => {
    setPrompt(prompt);
    setStart(true);
  }

  const changeStartState = () => {
    if (isStart) setPrompt(null);
    setStart(!isStart);
  }

  const navigation = () => (
    <>
      <HomeOutlined onClick={changeStartState} style={{ fontSize: '20px'}} />
    </>
  )

  const initialComponent = () => (
    <>
      <Row>
        <Search placeholder="generate what you want" allowClear onSearch={generate} style={{ width: 700 }} size="large" />
      </Row>

      <Row style={{ marginTop: '10px' }}>
        <Button onClick={changeStartState} type="primary">Start without initial prompt</Button>
      </Row>
    </>
  )

  return (
    <>
      <div style={{marginBottom: '20px'}}>
        {isStart ? navigation() : initialComponent()}
      </div>


      {(isStart) && <Helper prompt={prompt} />}
    </>
  )
}

export default InitialPage
