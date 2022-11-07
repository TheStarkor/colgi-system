import axios from 'axios';
import { useEffect, useState } from 'react';

const Rating = () => {
  const [name, setName] = useState(0);
  const [url, setUrl] = useState(null);
  const [left, setLeft] = useState(null);
  const [prompt, setPrompt] = useState(null);

  useEffect(() => {
  }, [])

  const next = () => {
    axios.get('/image')
      .then(res => {
        console.log(res.data)
        setName(res.data.name);
        setUrl(res.data.url)
        setLeft(res.data.left);
        setPrompt(res.data.prompt)
      })
  }

  return (
    <>
      <div>
        {left && `name: ${name}, 남은 개수: ${left}`}
      </div>
      <div>
        {prompt && `prompt: ${prompt}`}
      </div>
      <div>
        {url && <img width={240} src={url} />}
        {/* <Rate name={name} onChange={onChange}/> */}
      </div>

      <button onClick={next}>{url ? 'next' : 'start'}</button>
    </>
  )
}

export default Rating
