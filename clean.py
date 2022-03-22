import pandas as pd
import csv
    
def merge():
    a = pd.read_csv("PTData.csv")
    b = pd.read_csv("LinkData.csv")
    
    merged = a.merge(b, on="No.")
    merged.to_csv("output.csv", index=False)