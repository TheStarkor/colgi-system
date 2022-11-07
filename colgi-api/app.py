import json
import nltk
import random

from flask import Flask, request, Response
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

nltk.download('punkt')

nouns = []

with open("noun_list.txt", "r") as f:
    for line in f.readlines():
        nouns.append(line.strip())

positive_low = ['light', 'peaceful', 'relaxed', 'mild', 'elegant']
postivie_high = ['brigiht', 'vibrant', 'dynamic', 'vivid', 'colorful']
negative_low = ['sad', 'gloomy', 'tired', 'somber', 'depressing']
negative_high = ['dark', 'terror', 'shocking', 'stormy', 'haunting']

camera = ['close-up shot', 'medium shot', 'full shot', 'overhead view', 'low angle', 'fast shutter speed', 'bokeh']

illust = ['pencil sketch', 'pencil drawing', 'oil painting', 'watercolor', 'isometric', '3D render', 'pixar', 'pixel art']
art_style = ['cave paintings', 'realism']

def get_color(pos):
    if pos[0] == 'N':
        return 'coral'
    elif pos[0] == 'V':
        return 'aquamarine'
    elif pos == 'DT':
        return 'gray'
    elif pos == ',':
        return ''
    else:
        return 'red'

def generate_prompts(prompt):
    results = []

    for add in random.sample(positive_low, 2):
        results.append(f'{prompt}, {add}')

    for add in random.sample(postivie_high, 2):
        results.append(f'{prompt}, {add}')

    for add in random.sample(negative_low, 1):
        results.append(f'{prompt}, {add}')

    for add in random.sample(negative_high, 1):
        results.append(f'{prompt}, {add}')

    for add in random.sample(camera, 3):
        results.append(f'{prompt}, {add}')

    for add in random.sample(illust, 2):
        results.append(f'{prompt}, {add}')

    for add in random.sample(art_style, 1):
        results.append(f'{prompt}, {add}')

    return results

def is_common_noun(token):
    if token == 'a':
        return False

    if token in nouns:
        return True
    else:
        return False

# image test
images = []

with open("animal.txt", "r") as f:
    for i, line in enumerate(f.readlines()):
        images.append((f'animal-{i+1}.png', line))

with open("landscape.txt", "r") as f:
    for i, line in enumerate(f.readlines()):
        images.append((f'landscape-{i+1}.png', line))

with open("people.txt", "r") as f:
    for i, line in enumerate(f.readlines()):
        images.append((f'people-{i+1}.png', line))

with open("product.txt", "r") as f:
    for i, line in enumerate(f.readlines()):
        images.append((f'product-{i+1}.png', line))


@app.route('/analyse')
def analyse():
    prompt = request.args.get('prompt')

    tokens = nltk.word_tokenize(prompt)
    tags = nltk.pos_tag(tokens)

    print(tokens, tags)

    ret = {}
    resp = []
    for tag in tags:
        temp = {}
        temp['token'] = tag[0]
        temp['pos'] = tag[1]
        if is_common_noun(tag[0]):
            temp['color'] = 'blue'
        else:
            temp['color'] = get_color(tag[1])
        resp.append(temp)

    ret['tokens'] = resp
    ret['prompts'] = generate_prompts(prompt)

    return Response(json.dumps(ret), mimetype="application/json", status=200)

@app.route('/image')
def image():
    ret = {}
    item = random.choice(images)
    url = item[0]
    ret['name'] = url
    ret['prompt'] = item[1]
    ret['url'] = f'https://colgi-dataset.s3.amazonaws.com/{url}'
    images.remove(item)
    ret['left'] = len(images)


    return Response(json.dumps(ret), mimetype="application/json", status=200)


app.run(host="localhost",port=5001)
