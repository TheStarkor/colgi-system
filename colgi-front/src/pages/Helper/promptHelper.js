const questionPrompt = (histories) => {
  let history = ''
  histories && histories.map(item => {history = history + `question: ${item.question}\nanswer: ${item.answer}\n`})

  return `
I am an expert in generating image description. I ask questions to generate detailed information. Then I use this information to generate an image description.

${histories ? history : ''}
give me another question and five sample answers
output format is JSON and sample is {"question": question, "answer_1": answer_1,  "answer_2": answer_2, ...}

output:`
}

const solutionPrompt = (histories, values, value) => {
  let history = ''
  histories && histories.map(item => {history = history + `question: ${item.question}\nanswer: ${item.answer}\n`})

  return `I am an expert in generating image descriptions. I gathered questions and answers to generate detailed information. Then I use this information to generate an image description.

${histories ? history : ''}question: ${values.Question}
answer: ${value}

give me an image description (single sentence):`
}

export { questionPrompt, solutionPrompt }
