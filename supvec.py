#Importing Libraries
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.feature_extraction.text import TfidfTransformer
from sklearn.metrics import accuracy_score, confusion_matrix,classification_report
from sklearn.svm import LinearSVC
import joblib

def supportVector():
    data = pd.read_csv('data/news.csv')

    data['label']

    #Train-test split
    x_train,x_test,y_train,y_test = train_test_split(data['text'], data['label'],test_size=0.2, random_state=1)

    #Support Vector classification
    pipe2 = Pipeline([('vect', CountVectorizer()), ('tfidf', TfidfTransformer()), ('model', LinearSVC())])

    model_svc = pipe2.fit(x_train, y_train)
    svc_pred = model_svc.predict(x_test)

    print("Accuracy of SVM Classifier: {}%".format(round(accuracy_score(y_test, svc_pred)*100,2)))
    print("\nConfusion Matrix of SVM Classifier:\n")
    print(confusion_matrix(y_test, svc_pred))
    print("\nClassification Report of SVM Classifier:\n")
    print(classification_report(y_test, svc_pred))

    joblib.dump(model_svc, 'model/aletheia-supportvector.pkl')