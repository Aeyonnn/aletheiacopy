#Importing Libraries
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.feature_extraction.text import TfidfTransformer
from sklearn.metrics import accuracy_score, confusion_matrix,classification_report
from sklearn.neighbors import KNeighborsClassifier
from sklearn import metrics
import joblib

def knn():
    data = pd.read_csv('data/news.csv')

    #Train-test split
    x_train,x_test,y_train,y_test = train_test_split(data['text'], data['label'], test_size=0.2, random_state=1)

    #KNeighbors classification
    pipe1 = Pipeline([('vect', CountVectorizer()), ('tfidf', TfidfTransformer()), ('model', KNeighborsClassifier())])
    
    model_kn = pipe1.fit(x_train, y_train)
    kn_pred = model_kn.predict(x_test)


    print("Accuracy of KNeighbors Classifier: {}%".format(round(accuracy_score(y_test, kn_pred)*100,2)))
    print("\nConfusion Matrix of KNeighbors Classifier:\n")
    print(confusion_matrix(y_test, kn_pred))
    print("\nCLassification Report of KNeighbors Classifier:\n")
    print(classification_report(y_test, kn_pred))

    joblib.dump(model_kn, 'model/aletheia-knn.pkl')

    # test = input('enter news')
    # test_f = [test]
    # result = model_kn.predict(test_f)
    # print(result)
