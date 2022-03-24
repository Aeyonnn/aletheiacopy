# Importing Libraries
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.feature_extraction.text import TfidfTransformer
from sklearn.metrics import accuracy_score, confusion_matrix, classification_report
from sklearn.ensemble import AdaBoostClassifier
import joblib

def adaboost():
    data = pd.read_csv('data/news.csv')

    # Train-test split
    x_train, x_test, y_train, y_test, z_train, z_test = train_test_split(data['text'], data['label'], data['title'], test_size=0.2, random_state=1)

    # Adaboost classification
    pipe1 = Pipeline([('vect', CountVectorizer()), ('tfidf', TfidfTransformer()), ('model', AdaBoostClassifier())])

    model_ab = pipe1.fit(x_train, y_train)
    ab_pred = model_ab.predict(x_test)

    print("Accuracy of Adaboost Classifier: {}%".format(round(accuracy_score(y_test, ab_pred) * 100, 2)))
    print("\nConfusion Matrix of Adaboost Classifier:\n")
    print(confusion_matrix(y_test, ab_pred))
    print("\nCLassification Report of Adaboost Classifier:\n")
    print(classification_report(y_test, ab_pred))

    # Save Model
    joblib.dump(model_ab, 'model/aletheia-adaboost.pkl')

    # Test Data
    # test = input('enter news')
    # test_f = [test]
    # result = model_ab.predict(test_f)
    # print(result)