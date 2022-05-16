import joblib
import boto3 
import pickle
from io import BytesIO 


path = 's3://aletheia-algorithm-models/Final_Combi.pkl'

def combiModel(news):
    s3 = boto3.resource('s3')
    with BytesIO() as data:
        s3.Bucket("aletheia-algorithm-models").download_fileobj("Final_Combi.pkl", data)
        data.seek(0)    # move back to the beginning after writing
        file = joblib.load(data)

        input = [news]
        result = file.predict(input)
        return result

def neuralModel(news):
    s3 = boto3.resource('s3')
    with BytesIO() as data:
        s3.Bucket("aletheia-algorithm-models").download_fileobj("Nueral_Network.pkl", data)
        data.seek(0)    # move back to the beginning after writing
        file = joblib.load(data)

        input = [news]
        result = file.predict(input)
        return result

def decisionModel(news):
    s3 = boto3.resource('s3')
    with BytesIO() as data:
        s3.Bucket("aletheia-algorithm-models").download_fileobj("Decision_Tree.pkl", data)
        data.seek(0)    # move back to the beginning after writing
        file = joblib.load(data)

        input = [news]
        result = file.predict(input)
        return result

def randomModel(news):
    s3 = boto3.resource('s3')
    with BytesIO() as data:
        s3.Bucket("aletheia-algorithm-models").download_fileobj("Random_Forest.pkl", data)
        data.seek(0)    # move back to the beginning after writing
        file = joblib.load(data)

        input = [news]
        result = file.predict(input)
        return result


    
# def lambdaGet(news):
#     # return 'wideArray'
#     return execModel(news)
