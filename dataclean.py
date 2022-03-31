import pandas as pd

data = pd.read_csv('Data/news-number.csv')

data.loc[data['label']== 'FAKE', 'label'] = 1
data.loc[data['label']== 'REAL', 'label'] = 0

data.to_csv('data/news-test.csv')