#Importing Libraries
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.feature_extraction.text import TfidfTransformer
from sklearn.metrics import accuracy_score, confusion_matrix,classification_report
from sklearn.naive_bayes import GaussianNB
import joblib

def gaussianProcess():
    data = pd.read_csv('data/news.csv')

    data['label']

    #Train-test split
    x_train,x_test,y_train,y_test = train_test_split(data['text'], data['label'], test_size=0.2, random_state=1)

    #Gaussian classification
    pipe1 = Pipeline([('vect', CountVectorizer()), ('tfidf', TfidfTransformer()), ('model', GaussianNB())])

    model_gp = pipe1.fit(x_train, y_train)
    gp_pred = model_gp.predict(x_test)


    print("Accuracy of Gaussian Process Classifier: {}%".format(round(accuracy_score(y_test, gp_pred)*100,2)))
    print("\nConfusion Matrix of Gaussian Process Classifier:\n")
    print(confusion_matrix(y_test, gp_pred))
    print("\nCLassification Report of Gaussian Process Classifier:\n")
    print(classification_report(y_test, gp_pred))

    #joblib.dump(model_gp, 'model/aletheia-gaussianp.pkl')

    # test = input('enter news')
    # test_f = [test]
    # result = model_kn.predict(test_f)
    # print(result)
gaussianProcess()