#Importing Libraries
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.feature_extraction.text import TfidfTransformer
from sklearn.metrics import accuracy_score, confusion_matrix,classification_report
from sklearn.linear_model import LogisticRegression
import joblib

def logisticRegression():
    data = pd.read_csv('data/news.csv')
    
    #Train-test split
    x_train,x_test,y_train,y_test,z_train,z_test = train_test_split(data['text'], data['label'], data['title'], test_size=0.2, random_state=1)

    #Logistic regression classification
    pipe1 = Pipeline([('vect', CountVectorizer()), ('tfidf', TfidfTransformer()), ('model', LogisticRegression())])

    model_lr = pipe1.fit(x_train, y_train)
    lr_pred = model_lr.predict(x_test)


    print("Accuracy of Logistic Regression Classifier: {}%".format(round(accuracy_score(y_test, lr_pred)*100,2)))
    print("\nConfusion Matrix of Logistic Regression Classifier:\n")
    print(confusion_matrix(y_test, lr_pred))
    print("\nCLassification Report of Logistic Regression Classifier:\n")
    print(classification_report(y_test, lr_pred))

    joblib.dump(model_lr, 'model/aletheia-logreg.pkl')

    # test = input('enter news')
    # test_f = [test]
    # result = model_lr.predict(test_f)
    # print(result)