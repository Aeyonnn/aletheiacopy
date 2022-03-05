import pandas as pd

link = pd.read_csv('linkdata.csv')
data = pd.read_csv('PSData.csv')

merged = link.merge(data, on='No.')
merged.to_csv("output.csv", index=False)