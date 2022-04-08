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

fake = pd.read_csv('data/Dataset2(OS)/Fake.csv')
real = pd.read_csv('data/Dataset2(OS)/True.csv')

fake['text'] = fake['title'] + " " + fake['text']
real['text'] = real['title'] + " " + real['text']

fake['text'] = fake['text'].apply(lambda x: str(x).lower())
real['text'] = real['text'].apply(lambda x: str(x).lower())

real['class'] = 1
fake['class'] = 0

real = real[['text','class']]
fake = fake[['text','class']]

data = real.append(fake, ignore_index=True)

#Train-test split
x_train,x_test,y_train,y_test = train_test_split(data['text'], data['class'], random_state=1)

#Support Vector classification
pipe1 = Pipeline([('vect', CountVectorizer(stop_words='english')), ('model', DecisionTreeClassifier(criterion='entropy',ccp_alpha= 0.0, class_weight=None, splitter='best', random_state=0))])
model_pac = pipe1.fit(x_train, y_train)
pac_pred = model_pac.predict(x_test)

print("\nConfusion Matrix of Passive Agressive Classifier:\n")
print(confusion_matrix(y_test, pac_pred))
print("\nClassification Report of Passive Agressive Classifier:\n")
print(classification_report(y_test, pac_pred))
print("Accuracy of Passive Agressive Classifier: {}%".format(round(accuracy_score(y_test, pac_pred)*100,2)))

print (x_test)

# joblib.dump(model_pac, f'model/test.pkl')



