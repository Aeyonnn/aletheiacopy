import joblib
import boto3 
import pickle
from io import BytesIO 


path = 's3://aletheia-algorithm-models/aletheia-knn.pkl'

def execModel(test):
    s3 = boto3.resource('s3')
    with BytesIO() as data:
        s3.Bucket("aletheia-algorithm-models").download_fileobj("aletheia-knn.pkl", data)
        data.seek(0)    # move back to the beginning after writing
        file = joblib.load(data)

        input = [test]
        result = file.predict(input)
        return result


    
def lambdaGet(news):
    # return 'wideArray'
    return execModel(news)
