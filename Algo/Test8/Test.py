import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.feature_extraction.text import TfidfTransformer
from sklearn.metrics import accuracy_score, confusion_matrix, classification_report
from sklearn.ensemble import AdaBoostClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.neighbors import KNeighborsClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.naive_bayes import BernoulliNB
from sklearn.neural_network import MLPClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.svm import LinearSVC
from sklearn.linear_model import PassiveAggressiveClassifier
from mlxtend.classifier import EnsembleVoteClassifier
import joblib

data = pd.read_csv('data/Dataset1/news.csv')
target = 'Dataset1'
test = 'Test1'

def adaboost():
    # Train-test split
    x_train,x_test,y_train,y_test = train_test_split(data['text'], data['label'], test_size=0.2, random_state=1)
    
    #declare models
    logclf=LogisticRegression(penalty='l2',C=0.001, random_state=0)
    treeclf=DecisionTreeClassifier(max_depth=3,criterion='entropy',random_state=0)
    # knnclf=KNeighborsClassifier(n_neighbors=5,p=2,metric='minkowski')

    # Adaboost classification
    pipe1 = Pipeline([('vect', CountVectorizer()), ('tfidf', TfidfTransformer()), ('model', EnsembleVoteClassifier(clfs=[logclf,treeclf],weights=[1.5,1]))])

    model_ab = pipe1.fit(x_train, y_train)
    ab_pred = model_ab.predict(x_test)

    print("\nConfusion Matrix of Adaboost Classifier:\n")
    print(confusion_matrix(y_test, ab_pred))
    print("\nCLassification Report of Adaboost Classifier:\n")
    print(classification_report(y_test, ab_pred))
    print("Accuracy of Adaboost Classifier: {}%".format(round(accuracy_score(y_test, ab_pred) * 100, 2)))

    # Save Model
    joblib.dump(model_ab, f'model/combi_test.pkl')
