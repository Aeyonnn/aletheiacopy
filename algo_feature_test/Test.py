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
import joblib

data = pd.read_csv('data/Dataset1(OS)/news.csv')
target = 'Dataset1(OS)'
test = 'Test2'

#Train-test split
x_train,x_test,y_train,y_test = train_test_split(data['title'], data['label'], test_size=0.2, random_state=1)

#KNeighbors classification
pipe1 = Pipeline([('vect', CountVectorizer()), ('tfidf', TfidfTransformer()), ('model', KNeighborsClassifier(n_neighbors=30, algorithm='brute'))])

model_kn = pipe1.fit(x_train, y_train)
kn_pred = model_kn.predict(x_test)

print("\nConfusion Matrix of KNeighbors Classifier:\n")
print(confusion_matrix(y_test, kn_pred))
print("\nCLassification Report of KNeighbors Classifier:\n")
print(classification_report(y_test, kn_pred))
print("Accuracy of KNeighbors Classifier: {}%".format(round(accuracy_score(y_test, kn_pred)*100,2)))
