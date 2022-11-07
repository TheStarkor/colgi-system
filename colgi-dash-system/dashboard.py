from dash import Dash, html, dcc, Input, Output
import plotly.express as px
import pandas as pd
from pathlib import Path

app = Dash(__name__)

# assume you have a "long-form" data frame
# see https://plotly.com/python/px-arguments/ for more options


df = pd.read_csv(r"C:\Users\AEL\Documents\Ju Hyeong Park\colgi\latent space\for_visualization_dog.csv", encoding='utf-8')

min=df['image_num'].min()
max=df['image_num'].max()



def encode_image(image_file):
    encoded = base64.b64encode(open(image_file, 'rb').read())
    return 'data:image/png;base64,{}'.format(encoded.decode())



app.layout = html.Div(children=[

    dcc.Dropdown(['dog', 'bear', 'food', 'train','salmon'], value='dog', id='target-dropdown'),
    html.Div(id='target-output-container'),


    html.H6("Change the value in the text box to see callbacks in action!"),
    html.Div([
        dcc.Slider(min, max, 20, value=max,
               id='my-slider'
        ),
    ]),
    html.Br(),
    html.Div(id='slider-output-container'),
    html.Div(id='hidden-div', style={'display':'none'}),
    dcc.Graph(
        id='scatter'
        ),
    html.Img(id='image', alt='image', height=300)
])



@app.callback(
    [
    Output('my-slider', 'min'),
    Output('my-slider', 'max'),
    Output('scatter', 'figure')],
    [Input('target-dropdown', 'value'),
    Input('my-slider', 'value')])
def update_output(value,slider):
    target=value
    df = pd.read_csv(r"C:\Users\AEL\Documents\Ju Hyeong Park\colgi\latent space\for_visualization_"+target+".csv", encoding='utf-8')

    df["image_num"]=df["image_num"].astype(int)


    if slider is None : slider=df['image_num'].max()

    dataframe = df.loc[(df["image_num"]<=slider)]

    fig=px.scatter(dataframe,
        x="x",y="y",color="prompt",
        hover_data=["group_num","image_num"]
        )
    fig.update_layout(
        width=1200, 
        height=600,
        yaxis_range=[df['y'].min(),df['y'].max()],
        xaxis_range=[df['x'].min(),df['x'].max()]
    )

    return df['image_num'].min(), df['image_num'].max(), fig



@app.callback(
    [Output('hidden-div','children'),
    Output('image','src')],
    [Input('scatter','hoverData'),
    Input('target-dropdown', 'value')])
def update_image(hoverData, target):
    fileName='asset/'+target+'_'+'0_0.jpg'
    if hoverData is not None: fileName='assets/'+target+'_'+str(hoverData['points'][0]['curveNumber'])+'_'+str(hoverData['points'][0]['pointNumber'])+'.jpg'
    return 0, fileName

#    return 0, str(clickData['points'][0]['curveNumber'])+'_'+str(clickData['points'][0]['pointIndex'])
    

if __name__ == '__main__':
    app.run_server(debug=True)