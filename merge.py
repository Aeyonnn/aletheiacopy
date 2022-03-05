import pandas as pd

a = pd.read_csv("EMdata.csv")
b = pd.read_csv("LinkData.csv")

merge = a.merge(b, on='No.')
merge.to_csv("final.csv", index=False)