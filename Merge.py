import pandas as pd

def merge():

    a = pd.read_csv("Endata.csv")
    b = pd.read_csv("body.csv")

    merged = a.merge(b, on='No.')
    merged.to_csv("output.csv", index=False)