#Importing Libraries
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.feature_extraction.text import TfidfTransformer
from sklearn.metrics import accuracy_score, confusion_matrix,classification_report
from sklearn.ensemble import RandomForestClassifier
import joblib

def randForest():
    data = pd.read_csv('data/news.csv')

    data['label']

    #Train-test split
    x_train,x_test,y_train,y_test,z_train,z_test = train_test_split(data['text'], data['label'], data['title'], test_size=0.2, random_state=1)

    #Random Forest classification
    pipe1 = Pipeline([('vect', CountVectorizer()), ('tfidf', TfidfTransformer()), ('model', RandomForestClassifier())])

    model_rf = pipe1.fit(x_train, y_train)
    rf_pred = model_rf.predict(x_test)


    print("Accuracy of Random Forest  Classifier: {}%".format(round(accuracy_score(y_test, rf_pred)*100,2)))
    print("\nConfusion Matrix of Random Forest Classifier:\n")
    print(confusion_matrix(y_test, rf_pred))
    print("\nCLassification Report of Random Forest Classifier:\n")
    print(classification_report(y_test, rf_pred))

    joblib.dump(model_rf, 'model/aletheia-randforest.pkl')

    # test = input('enter news')
    # test_f = [test]
    # result = model_rf.predict(test_f)
    # print(result) hello there im new