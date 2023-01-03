import { Row, Col, Image, Popover, Button } from 'antd';
import './index.scss';

const ShowImage = (props) => {
  return (
    <>
      <Row>
        {props.prompts?.p1 &&
        <Row style={{ width: '100%', padding: '15px 28px', marginBottom: '14px', border: '1px solid #D9D9D9', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Popover placement='bottom' title={props.prompts?.p1_answer} trigger="hover" content={props.prompts?.p1}>
            <Button style={{ fontWeight: '500', marginBottom: '10px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#EDEDED', border: 0 }}>{props.prompts?.p1_answer}</Button>
          </Popover>

          {props.prompts?.p1_images.length !== 0 && props.prompts?.p1_images.map(image => (<Row>
            <Image src={image} width={140} />
          </Row>))}
        </Row>}

        {props.prompts?.p2 &&
        <Row style={{ width: '100%', padding: '15px 28px', marginBottom: '14px', border: '1px solid #D9D9D9', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Popover placement='bottom' title={props.prompts?.p2_answer} trigger="hover" content={props.prompts?.p2}>
            <Button style={{ fontWeight: '500', marginBottom: '10px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#EDEDED', border: 0 }}>{props.prompts?.p2_answer}</Button>
          </Popover>

          {props.prompts?.p2_images.length !== 0 && props.prompts?.p2_images.map(image => (<Row>
            <Image src={image} width={140} />
          </Row>))}
        </Row>}

        {props.prompts?.p3 &&
        <>
          <Row style={{ width: '100%', padding: '15px 28px', marginBottom: '14px', border: '1px solid #D9D9D9', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Popover placement='bottom' title={props.prompts?.p3_answer} trigger="hover" content={props.prompts?.p3}>
              <Button style={{ fontWeight: '500', marginBottom: '10px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#EDEDED', border: 0 }}>{props.prompts?.p3_answer}</Button>
            </Popover>

            {props.prompts?.p3_images.length !== 0 && props.prompts?.p3_images.map(image => (<Row>
              <Image src={image} width={140} />
            </Row>))}
          </Row>
        </>}

        {props.prompts?.p4 &&
        <Row style={{ width: '100%', padding: '15px 28px', marginBottom: '14px', border: '1px solid #D9D9D9', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Popover placement='bottom' title={props.prompts?.p4_answer} trigger="hover" content={props.prompts?.p4}>
            <Button style={{ fontWeight: '500', marginBottom: '10px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#EDEDED', border: 0 }}>{props.prompts?.p4_answer}</Button>
          </Popover>

          {props.prompts?.p4_images.length !== 0 && props.prompts?.p4_images.map(image => (<Row>
            <Image src={image} width={140} />
          </Row>))}
        </Row>}

        {props.prompts?.p5 &&
        <Row style={{ width: '100%', padding: '15px 28px', marginBottom: '14px', border: '1px solid #D9D9D9', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Popover placement='bottom' title={props.prompts?.p5_answer} trigger="hover" content={props.prompts?.p5}>
            <Button style={{ fontWeight: '500', marginBottom: '10px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#EDEDED', border: 0 }}>{props.prompts?.p5_answer}</Button>
          </Popover>

          {props.prompts?.p5_images.length !== 0 && props.prompts?.p5_images.map(image => (<Row>
            <Image src={image} width={140} />
          </Row>))}
        </Row>}
      </Row>
    </>
  )
}

export default ShowImage
