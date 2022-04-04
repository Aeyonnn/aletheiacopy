import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.feature_extraction.text import TfidfTransformer
from sklearn.feature_extraction.text import TfidfVectorizer
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
import joblib

data = pd.read_csv('data/Dataset1(OS)/news.csv')
target = 'Dataset1(OS)'
test = 'Test1'

#Train-test split
x_train,x_test,y_train,y_test = train_test_split(data['text'], data['label'], test_size=0.2, random_state=1)

#Support Vector classification
pipe2 = Pipeline([('vect', CountVectorizer()), ('tfidf', TfidfTransformer()), ('model', PassiveAggressiveClassifier())])

model_pac = pipe2.fit(x_train, y_train)
pac_pred = model_pac.predict(x_test)

print("\nConfusion Matrix of Passive Agressive Classifier:\n")
print(confusion_matrix(y_test, pac_pred))
print("\nClassification Report of Passive Agressive Classifier:\n")
print(classification_report(y_test, pac_pred))
print("Accuracy of Passive Agressive Classifier: {}%".format(round(accuracy_score(y_test, pac_pred)*100,2)))
