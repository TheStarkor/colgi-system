import { Row, Col, Image, Popover, Button } from 'antd';

const ShowImage = (props) => {
  return (
    <>
      <h3>Check your ideas</h3>
      <p>We show images based on your ideas</p>
      <Row>
        <Col span={4}>
          <Popover placement='bottom' title={props.prompts?.p1_answer} trigger="hover" content={props.prompts?.p1}>
            <Button style={{marginBottom: '10px'}}>{props.prompts?.p1_answer}</Button>
          </Popover>
          {props.prompts?.p1 && <Button onClick={() => props.addHistory({ question: props.prompts?.q, answer: props.prompts?.p1_answer })} type='primary'>OK</Button>}
          {props.prompts?.p1_images.length !== 0 && props.prompts?.p1_images.map(image => (<Row>
            <Image src={image} width={200} />
          </Row>))}
        </Col>
        <Col span={4}>
          <Popover placement='bottom' title={props.prompts?.p2_answer} trigger="hover" content={props.prompts?.p2}>
            <Button style={{marginBottom: '10px'}}>{props.prompts?.p2_answer}</Button>
          </Popover>
          {props.prompts?.p2 && <Button onClick={() => props.addHistory({ question: props.prompts?.q, answer: props.prompts?.p2_answer })} type='primary'>OK</Button>}
          {props.prompts?.p2_images.length !== 0 && props.prompts?.p2_images.map(image => (<Row>
            <Image src={image} width={200} />
          </Row>))}
        </Col>
        <Col span={4}>
          <Popover placement='bottom' title={props.prompts?.p3_answer} trigger="hover" content={props.prompts?.p3}>
            <Button style={{marginBottom: '10px'}}>{props.prompts?.p3_answer}</Button>
          </Popover>
          {props.prompts?.p3 && <Button onClick={() => props.addHistory({ question: props.prompts?.q, answer: props.prompts?.p3_answer })} type='primary'>OK</Button>}
          {props.prompts?.p3_images.length !== 0 && props.prompts?.p3_images.map(image => (<Row>
            <Image src={image} width={200} />
          </Row>))}
        </Col>
        <Col span={4}>
          <Popover placement='bottom' title={props.prompts?.p4_answer} trigger="hover" content={props.prompts?.p4}>
            <Button style={{marginBottom: '10px'}}>{props.prompts?.p4_answer}</Button>
          </Popover>
          {props.prompts?.p4 && <Button onClick={() => props.addHistory({ question: props.prompts?.q, answer: props.prompts?.p4_answer })} type='primary'>OK</Button>}
          {props.prompts?.p4_images.length !== 0 && props.prompts?.p4_images.map(image => (<Row>
            <Image src={image} width={200} />
          </Row>))}
        </Col>
        <Col span={4}>
          <Popover placement='bottom' title={props.prompts?.p5_answer} trigger="hover" content={props.prompts?.p5}>
            <Button style={{marginBottom: '10px'}}>{props.prompts?.p5_answer}</Button>
          </Popover>
          {props.prompts?.p5 && <Button onClick={() => props.addHistory({ question: props.prompts?.q, answer: props.prompts?.p5_answer })} type='primary'>OK</Button>}
          {props.prompts?.p5_images.length !== 0 && props.prompts?.p5_images.map(image => (<Row>
            <Image src={image} width={200} />
          </Row>))}
        </Col>
      </Row>
    </>
  )
}

export default ShowImage
