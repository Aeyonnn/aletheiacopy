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
import joblib

data = pd.read_csv('data/Dataset1(OS)/news.csv')
target = 'Dataset1(OS)'
test = 'Test2'

#Train-test split
x_train,x_test,y_train,y_test,z_train,z_test = train_test_split(data['title'], data['label'], data['title'], test_size=0.2, random_state=1)

#Support Vector classification
pipe2 = Pipeline([('vect', CountVectorizer()), ('tfidf', TfidfTransformer()), ('model', MLPClassifier())])

model_mlp = pipe2.fit(x_train, y_train)
mlp_pred = model_mlp.predict(x_test)

print("\nConfusion Matrix of Neural Network:\n")
print(confusion_matrix(y_test, mlp_pred))
print("\nClassification Report of Neural Network:\n")
print(classification_report(y_test, mlp_pred))
print("Accuracy of Neural Network: {}%".format(round(accuracy_score(y_test, mlp_pred)*100,2)))