import ImageCard from '../../components/imageCard';

import { Input, Col, Row } from 'antd';
import axios from 'axios';
import { useState } from 'react';
import Token from '../../components/token';

const { Search } = Input;

const AutoSearch = () => {
  const [tokens, setTokens] = useState(null);
  const [prompts, setPrompts] = useState(null);

  const onSearch = async (q) => {
    const resp = await axios.get(`/analyse?prompt=${q}`);

    console.log(resp.data);
    setTokens(resp.data?.tokens);
    setPrompts(resp.data?.prompts);
  }

  return (
    <>
      <Row>
        <Search placeholder="input search text" allowClear onSearch={onSearch} style={{ width: 700 }} size="large" />
      </Row>

      <Row style={{padding: '10px 0px 10px 0px'}}>
        {tokens && tokens.map(token => (<Token color={token.color} token={token.token} />))}
      </Row>

      <Row>
        {prompts && prompts.map(prompt => (
          <Col span={6}>
            <ImageCard image={"adw"} prompt={prompt} />
          </Col>
        ))}
      </Row>
    </>
  )
}

export default AutoSearch;
