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
from sklearn.naive_bayes import MultinomialNB
from sklearn.neural_network import MLPClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.svm import LinearSVC
from sklearn.linear_model import LinearRegression
import joblib

data = pd.read_csv('Data/news.csv')
target = 'Dataset1(OS)'
test = 'Test2'

def adaboost():
    # Train-test split
    x_train, x_test, y_train, y_test = train_test_split(data['title'], data['label'], test_size=0.2, random_state=1)

    # Adaboost classification
    pipe1 = Pipeline([('vect', CountVectorizer()), ('tfidf', TfidfTransformer()), ('model', AdaBoostClassifier())])

    model_ab = pipe1.fit(x_train, y_train)
    ab_pred = model_ab.predict(x_test)

    print("\nConfusion Matrix of Adaboost Classifier:\n")
    print(confusion_matrix(y_test, ab_pred))
    print("\nCLassification Report of Adaboost Classifier:\n")
    print(classification_report(y_test, ab_pred))
    print("Accuracy of Adaboost Classifier: {}%".format(round(accuracy_score(y_test, ab_pred) * 100, 2)))

    # Save Model
    joblib.dump(model_ab, f'model/{target}/{test}/aletheia-adaboost.pkl')


def decisionTree():
    #Train-test split
    x_train,x_test,y_train,y_test = train_test_split(data['title'], data['label'], test_size=0.2, random_state=1)

    #Decision Tree classification
    pipe1 = Pipeline([('vect', CountVectorizer()), ('tfidf', TfidfTransformer()), ('model', DecisionTreeClassifier())])

    model_dt = pipe1.fit(x_train, y_train)
    dt_pred = model_dt.predict(x_test)


    print("\nConfusion Matrix of Decision Tree Classifier:\n")
    print(confusion_matrix(y_test, dt_pred))
    print("\nCLassification Report of Decision Tree Classifier:\n")
    print(classification_report(y_test, dt_pred))
    print("Accuracy of Decision Tree Classifier: {}%".format(round(accuracy_score(y_test, dt_pred)*100,2)))

    joblib.dump(model_dt, f'model/{target}/{test}/aletheia-decisiontree.pkl')
 
def knn():
    #Train-test split
    x_train,x_test,y_train,y_test = train_test_split(data['title'], data['label'], test_size=0.2, random_state=1)

    #KNeighbors classification
    pipe1 = Pipeline([('vect', CountVectorizer()), ('tfidf', TfidfTransformer()), ('model', KNeighborsClassifier())])

    model_kn = pipe1.fit(x_train, y_train)
    kn_pred = model_kn.predict(x_test)

    print("\nConfusion Matrix of KNeighbors Classifier:\n")
    print(confusion_matrix(y_test, kn_pred))
    print("\nCLassification Report of KNeighbors Classifier:\n")
    print(classification_report(y_test, kn_pred))
    print("Accuracy of KNeighbors Classifier: {}%".format(round(accuracy_score(y_test, kn_pred)*100,2)))

    joblib.dump(model_kn, f'model/{target}/{test}/aletheia-knn.pkl')

def logisticRegression():
    #Train-test split
    x_train,x_test,y_train,y_test = train_test_split(data['title'], data['label'], test_size=0.2, random_state=1)

    #Logistic regression classification
    pipe1 = Pipeline([('vect', CountVectorizer()), ('tfidf', TfidfTransformer()), ('model', LogisticRegression())])

    model_lr = pipe1.fit(x_train, y_train)
    lr_pred = model_lr.predict(x_test)

    print("\nConfusion Matrix of Logistic Regression Classifier:\n")
    print(confusion_matrix(y_test, lr_pred))
    print("\nCLassification Report of Logistic Regression Classifier:\n")
    print(classification_report(y_test, lr_pred))
    print("Accuracy of Logistic Regression Classifier: {}%".format(round(accuracy_score(y_test, lr_pred)*100,2)))

    joblib.dump(model_lr, f'model/{target}/{test}/aletheia-logreg.pkl')

def naivBayes():
    #Train-test split
    x_train,x_test,y_train,y_test = train_test_split(data['title'], data['label'],test_size=0.2, random_state=1)

    #Naive-Bayes classification
    pipe3 = Pipeline([('vect', CountVectorizer()), ('tfidf', TfidfTransformer()), ('model', MultinomialNB())])

    model_nb = pipe3.fit(x_train, y_train)
    nb_pred = model_nb.predict(x_test)

    print("\nConfusion Matrix of Naive Bayes Classifier:\n")
    print(confusion_matrix(y_test, nb_pred))
    print("\nClassification Report of Naive Bayes Classifier:\n")
    print(classification_report(y_test, nb_pred))
    print("Accuracy of Naive Bayes Classifier: {}%".format(round(accuracy_score(y_test, nb_pred)*100,2)))

    joblib.dump(model_nb, f'model/{target}/{test}/aletheia-naivbayes.pkl')

def neuralNetwork():
    #Train-test split
    x_train,x_test,y_train,y_test, = train_test_split(data['title'], data['label'], test_size=0.2, random_state=1)

    #Support Vector classification
    pipe2 = Pipeline([('vect', CountVectorizer()), ('tfidf', TfidfTransformer()), ('model', MLPClassifier())])

    model_mlp = pipe2.fit(x_train, y_train)
    mlp_pred = model_mlp.predict(x_test)

    print("\nConfusion Matrix of Neural Network:\n")
    print(confusion_matrix(y_test, mlp_pred))
    print("\nClassification Report of Neural Network:\n")
    print(classification_report(y_test, mlp_pred))
    print("Accuracy of Neural Network: {}%".format(round(accuracy_score(y_test, mlp_pred)*100,2)))

    joblib.dump(model_mlp, f'model/{target}/{test}/aletheia-neural.pkl')

def randForest():
    #Train-test split
    x_train,x_test,y_train,y_test = train_test_split(data['title'], data['label'], test_size=0.2, random_state=1)

    #Random Forest classification
    pipe1 = Pipeline([('vect', CountVectorizer()), ('tfidf', TfidfTransformer()), ('model', RandomForestClassifier())])

    model_rf = pipe1.fit(x_train, y_train)
    rf_pred = model_rf.predict(x_test)

    print("\nConfusion Matrix of Random Forest Classifier:\n")
    print(confusion_matrix(y_test, rf_pred))
    print("\nCLassification Report of Random Forest Classifier:\n")
    print(classification_report(y_test, rf_pred))
    print("Accuracy of Random Forest  Classifier: {}%".format(round(accuracy_score(y_test, rf_pred)*100,2)))

    joblib.dump(model_rf, f'model/{target}/{test}/aletheia-randforest.pkl')
    
def supportVector():
    #Train-test split
    x_train,x_test,y_train,y_test = train_test_split(data['title'], data['label'],test_size=0.2, random_state=1)

    #Support Vector classification
    pipe2 = Pipeline([('vect', CountVectorizer()), ('tfidf', TfidfTransformer()), ('model', LinearSVC())])

    model_svc = pipe2.fit(x_train, y_train)
    svc_pred = model_svc.predict(x_test)

    print("\nConfusion Matrix of SVM Classifier:\n")
    print(confusion_matrix(y_test, svc_pred))
    print("\nClassification Report of SVM Classifier:\n")
    print(classification_report(y_test, svc_pred))
    print("Accuracy of SVM Classifier: {}%".format(round(accuracy_score(y_test, svc_pred)*100,2)))

    joblib.dump(model_svc, f'model/{target}/{test}/aletheia-supportvector.pkl')
    