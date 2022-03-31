#Importing Libraries
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.feature_extraction.text import TfidfTransformer
from sklearn.metrics import accuracy_score, confusion_matrix,classification_report
from sklearn.tree import DecisionTreeClassifier
import joblib

def decisionTree():
    data = pd.read_csv('data/news.csv')
    
    #Train-test split
    x_train,x_test,y_train,y_test,z_train,z_test = train_test_split(data['text'], data['label'], data['title'], test_size=0.2, random_state=1)

    #Decision Tree classification
    pipe1 = Pipeline([('vect', CountVectorizer()), ('tfidf', TfidfTransformer()), ('model', DecisionTreeClassifier())])

    model_dt = pipe1.fit(x_train, y_train)
    dt_pred = model_dt.predict(x_test)


    print("Accuracy of Decision Tree Classifier: {}%".format(round(accuracy_score(y_test, dt_pred)*100,2)))
    print("\nConfusion Matrix of Decision Tree Classifier:\n")
    print(confusion_matrix(y_test, dt_pred))
    print("\nCLassification Report of Decision Tree Classifier:\n")
    print(classification_report(y_test, dt_pred))

    joblib.dump(model_dt, 'model/aletheia-decisiontree.pkl')
    # test = input('enter news')
    # test_f = [test]
    # result = model_dt.predict(test_f)
    # print(result)
