import pandas as pd
import numpy as np

a = pd.read_csv('EMdata.csv')

a['body'] = a['body'].apply(lambda x: x.replace('[','').replace(']',''))
a['body'] = a['body'].apply(lambda x: x.replace("''",'').replace("''",''))
a['body'] = a['body'].apply(lambda x: x.replace(",",'').replace(",",''))

print(a)

a.to_csv("output.csv", index=False)