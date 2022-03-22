from operator import index
import pandas as pd
import numpy as np

data = pd.read_csv('CNNData.csv')
data['body'].replace('', np.nan, inplace=True)
data['heading'].replace('', np.nan, inplace=True)
data.dropna(subset=['body'], inplace=True)
data.dropna(subset=['heading'], inplace=True)
data.to_csv('final.csv', index=False)
