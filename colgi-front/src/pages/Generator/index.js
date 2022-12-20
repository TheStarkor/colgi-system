import { useState } from 'react';
import { Col, Row, Image, Button } from 'antd';
import axios from 'axios';
import ReactDataSheet from 'react-datasheet';
// Be sure to include styles at some point, probably during your bootstrapping
import 'react-datasheet/lib/react-datasheet.css';
import './index.css'
import ResultTable from '../../components/Generator/statistic';

const generateUrl = (prompt) => {
  return `/generate?prompt=${prompt}&model=SD1-prod&cnt=6&name=test`
}
const Generator = () => {
  const [isLoading, setLoading] = useState(false);
  const [result, setResult] = useState([]);
  const [grid, setGrid] = useState([
    [
      { readOnly: true, value: '' },
      { value: 'Subject (e.g., a dog)', readOnly: true },
      { value: 'Explain (e.g., eating a cake)', readOnly: true },
      { value: '3rd', readOnly: true },
      { value: '4th', readOnly: true },
    ],
    [
      { readOnly: true, value: 1 },
      { value: null },
      { value: null },
      { value: null },
      { value: null },
    ],
    [
      { readOnly: true, value: 2 },
      { value: null },
      { value: null },
      { value: null },
      { value: null },
    ],
    [
      { readOnly: true, value: 3 },
      { value: null },
      { value: null },
      { value: null },
      { value: null },
    ],
  ])

  const generateImage = async () => {
    setLoading(true);
    let tempResult = []

    let first_list = []
    let second_list = []
    let third_list = []
    let fourth_list = []

    grid.forEach((item, index) => {
      if (index === 0) return;
      if (item[1].value) first_list.push(item[1].value);
      if (item[2].value) second_list.push(item[2].value);
      if (item[3].value) third_list.push(item[3].value);
      if (item[4].value) fourth_list.push(item[4].value);
    })

    let promptList = [];
    let temp_promptList = [];

    first_list.forEach(item => {
      promptList.push(item)
    })

    if (second_list.length !== 0) {
      promptList.forEach(t => (
        second_list.forEach(item => (
          temp_promptList.push(`${t} ${item}`)
        ))
      ))
      promptList = temp_promptList
    }

    if (third_list.length !== 0) {
      temp_promptList = [];
      promptList.forEach(t => (
        third_list.forEach(item => (
          temp_promptList.push(`${t} ${item}`)
        ))
      ))
      promptList = temp_promptList
    }

    if (fourth_list.length !== 0) {
      promptList.forEach(t => (
        fourth_list.forEach(item => (
          temp_promptList.push(`${t} ${item}`)
        ))
      ))
      promptList = temp_promptList
    }

    await Promise.all(promptList.map(async prompt => {
      console.log(prompt)
      const resp = await axios.get(generateUrl(prompt))
      // const resp = await axios.get('?cnt=6') //test
      const data = {
        prompt: prompt,
        images: resp.data.result
      }

      console.log(data);
      tempResult.push(data)
    }))

    setLoading(false);
    setResult(tempResult)
  }

  const valueRenderer = cell => cell.value;
  const onCellsChanged = changes => {
    const temp_grid = grid;
    changes.forEach(({ cell, row, col, value }) => {
      temp_grid[row][col] = { ...temp_grid[row][col], value };
    });
    setGrid(temp_grid);
  };
  const onContextMenu = (e, cell, i, j) =>
    cell.readOnly ? e.preventDefault() : null;

  const getMoreImage = async (prompt) => {
    // const resp = await axios.get('?cnt=6') //test
    const resp = await axios.get(generateUrl(prompt))

    let temp_result = [...result];

    temp_result.map(item => {
      if (item?.prompt === prompt) {
        item.images = [
          ...item?.images,
          ...resp.data.result
        ]
      }
    })

    setResult(temp_result)
  }

  return (
    <>
      <Row>
        <h1>Generator</h1>
      </Row>
      <Button loading={isLoading} type="primary" style={{marginBottom: '20px' ,height: '30px'}} onClick={generateImage}>Generate</Button>
      {grid && <ReactDataSheet
        data={grid}
        valueRenderer={valueRenderer}
        onContextMenu={onContextMenu}
        onCellsChanged={onCellsChanged}
      />}

      {/* <Row style={{marginTop: '10px', marginBottom: '20px'}}>
        <Col span={12}>{result.length !== 0 && <ResultTable result={result} />}</Col>
        <Col span={4}>
          <h3>Camera</h3>
          <Row>close-up shot</Row>
          <Row>overhead view</Row>
          <Row>low angle</Row>
          <Row>fast shutter speed</Row>
          <Row>bokeh</Row>
          <Row>Long Exposure</Row>
        </Col>
        <Col span={4}>
          <h3>Style</h3>
          <Row>pencil sketch</Row>
          <Row>pencil drawing</Row>
          <Row>oil painting</Row>
          <Row>isometric</Row>
          <Row>pixel art</Row>
          <Row>3D render</Row>
        </Col>
        <Col span={4}>
          <h3>Sentiment</h3>
          <Row>light, peaceful</Row>
          <Row>bright, vibrant</Row>
          <Row>sad, gloomy</Row>
          <Row>dark, terror</Row>
          <Row>mild, relaxed</Row>
        </Col>
      </Row> */}

      {result.length !== 0 && result?.map(item => (
        <>
          <Row style={{marginTop:'10px'}}>
            <h3>{item?.prompt}</h3>
            <Button onClick={() => getMoreImage(item?.prompt)} type="primary" size='small' style={{marginLeft:'10px'}}>more images</Button>
          </Row>
          <Row>
            {item?.images?.map(image => (
              <Col span={4}>
                <Image
                  preview={{
                    visible: false
                  }}
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
