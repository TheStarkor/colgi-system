import { useState } from 'react';
import { Input, Col, Row, Select, Image } from 'antd';
import axios from 'axios';

const { Search } = Input;

const viewOptions = [
  {
    label: 'close-up shot',
    value: 'close-up shot'
  },
  {
    label: 'overhead view',
    value: 'overhead view'
  },
  {
    label: 'low angle',
    value: 'low angle'
  },
  {
    label: 'fast shutter speed',
    value: 'fast shutter speed'
  },
  {
    label: 'bokeh',
    value: 'bokeh'
  }
]

const styleOptions = [
  {
    label: 'pencil sketch',
    value: 'pencil sketch'
  },
  {
    label: 'pencil drawing',
    value: 'pencil drawing'
  },
  {
    label: 'oil painting',
    value: 'oil painting'
  },
  {
    label: 'isometric',
    value: 'isometric'
  },
  {
    label: 'pixel art',
    value: 'pixel art'
  }
]

const generateUrl = (prompt) => {
  return `/generate?prompt=${prompt}&model=SD1-prod&cnt=6&name=test`
}

const Generator = () => {
  const [originalPrompt, setOriginalPrompt] = useState('');
  const [prompt, setPrompt] = useState('');
  const [selectedView, setSelectedView] = useState(null);
  const [selectedStyle, setSelectedStyle] = useState(null);
  const [result, setResult] = useState([]);

  const onSearch = async (q) => {
    let tempResult = []

    await Promise.all(selectedStyle.map(async style => {
      let ourPrompt = `${originalPrompt}, ${style}`
      const resp = await axios.get(generateUrl(ourPrompt))
      const data = {
        prompt: ourPrompt,
        images: resp.data.result
      }

      // const tempResult = [...result, data]
      tempResult.push(data)
    }))

    await Promise.all(selectedView.map(async style => {
      let ourPrompt = `${originalPrompt}, ${style}`
      const resp = await axios.get(generateUrl(ourPrompt))
      const data = {
        prompt: ourPrompt,
        images: resp.data.result
      }

      // const tempResult = [...result, data]
      tempResult.push(data)
    }))

    setResult(tempResult)
    // const resp = await axios.get(`/analyse?prompt=${q}`);

    // console.log(resp.data);
    // setPrompts(resp.data?.prompts);
  }

  const handleChangeView = (value) => {
    setSelectedView(value)
  };

  const handleChangeStyle = (value) => {
    setSelectedStyle(value)
  };

  const onChange = (event) => {
    setPrompt(event.target.value)
    setOriginalPrompt(event.target.value)
  }

  return (
    <>
      <h1>Generator</h1>

      {/* <h3>원하는 사물을 입력해주세요.</h3>
      <Row>
        <Input placeholder="cat, dog, ..." style={{ width: 500 }} size="small" />
      </Row>


      <h3>사물의 동작을 입력해주세요.</h3>
      <Row>
        <Input placeholder="eating, running, ..." style={{ width: 500 }} size="small" />
      </Row>


      <h3>사물의 수를 입력해주세요.</h3>
      <Row>
        <Input placeholder="one, two, ..." style={{ width: 500 }} size="small" />
      </Row> */}

      <Row style={{marginTop: '20px'}}>
        <Search placeholder="input search text" value={prompt} onChange={onChange} allowClear onSearch={onSearch} style={{ width: 700 }} size="large" />
      </Row>

      <Row  style={{marginTop: '20px'}}>
        <Col span={4}>
          Angles
          {viewOptions &&
          <Select
            mode="multiple"
            allowClear
            style={{ width: '100%' }}
            placeholder="Please select"
            onChange={handleChangeView}
            options={viewOptions}
          />}
        </Col>
        <Col span={4}>
          Styles
          {styleOptions &&
          <Select
            mode="multiple"
            allowClear
            style={{ width: '100%' }}
            placeholder="Please select"
            onChange={handleChangeStyle}
            options={styleOptions}
          />}
        </Col>
      </Row>

      {result !== [] && result.map(item => (
        <>
          <Row>
            <h3>{item.prompt}</h3>
          </Row>
          <Row>
            {item.images.map(image => (
              <Col span={4}>
                <Image
                  src={image}
                />
              </Col>
            ))}
          </Row>
        </>
      ))}
    </>
  )
}

export default Generator;
