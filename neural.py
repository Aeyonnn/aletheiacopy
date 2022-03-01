#Importing Libraries
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.feature_extraction.text import TfidfTransformer
from sklearn.metrics import accuracy_score, confusion_matrix,classification_report
from sklearn.neural_network import MLPClassifier
import joblib

def neuralNetwork():
    data = pd.read_csv('data/news.csv')

    data['label']

    #Train-test split
    x_train,x_test,y_train,y_test,z_train,z_test = train_test_split(data['text'], data['label'], data['title'], test_size=0.2, random_state=1)

    #Support Vector classification
    pipe2 = Pipeline([('vect', CountVectorizer()), ('tfidf', TfidfTransformer()), ('model', MLPClassifier())])

    model_mlp = pipe2.fit(x_train, y_train)
    mlp_pred = model_mlp.predict(x_test)

    print("Accuracy of Neural Network: {}%".format(round(accuracy_score(y_test, mlp_pred)*100,2)))
    print("\nConfusion Matrix of Neural Network:\n")
    print(confusion_matrix(y_test, mlp_pred))
    print("\nClassification Report of Neural Network:\n")
    print(classification_report(y_test, mlp_pred))

    joblib.dump(model_mlp, 'model/aletheia-neural.pkl')
