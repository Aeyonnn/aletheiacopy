#Importing Libraries
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.feature_extraction.text import TfidfTransformer
from sklearn.metrics import accuracy_score, confusion_matrix,classification_report
from sklearn.naive_bayes import MultinomialNB
import joblib

def naivBayes():
    data = pd.read_csv('data/news.csv')

    data['label']

    #Train-test split
    x_train,x_test,y_train,y_test = train_test_split(data['text'], data['label'],test_size=0.2, random_state=1)

    #Naive-Bayes classification
    pipe3 = Pipeline([('vect', CountVectorizer()), ('tfidf', TfidfTransformer()), ('model', MultinomialNB())])

    model_nb = pipe3.fit(x_train, y_train)
    nb_pred = model_nb.predict(x_test)

    print("Accuracy of Naive Bayes Classifier: {}%".format(round(accuracy_score(y_test, nb_pred)*100,2)))
    print("\nConfusion Matrix of Naive Bayes Classifier:\n")
    print(confusion_matrix(y_test, nb_pred))
    print("\nClassification Report of Naive Bayes Classifier:\n")
    print(classification_report(y_test, nb_pred))

    joblib.dump(model_nb, 'model/aletheia-naivbayes.pkl')

naivBayes()