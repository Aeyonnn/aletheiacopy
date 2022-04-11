import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.feature_extraction.text import TfidfTransformer
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics import accuracy_score, confusion_matrix, classification_report
from sklearn.linear_model import PassiveAggressiveClassifier
from sklearn.ensemble import AdaBoostClassifier
import joblib

data = pd.read_csv('data/Dataset1/news.csv')
data.replace(to_replace='[\n\r\t]', value='', regex=True, inplace=True)
datam = pd.DataFrame(data)
datam['text'] = datam['text'].astype(float)

print (datam)
print (datam.dtypes)

# target = 'Dataset1(OS)'
# test = 'Test2'

# #Train-test split
# x_train,x_test,y_train,y_test = train_test_split(datam2['text'], datam2['label'], test_size=0.2, random_state=1)
 
# #Support Vector classification
# clf = PassiveAggressiveClassifier()

# model_mlp = clf.fit(x_train, y_train)
# mlp_pred = model_mlp.predict(x_test)

# print("\nConfusion Matrix of Passive Agressive Classifier:\n")
# print(confusion_matrix(y_test, mlp_pred))
# print("\nClassification Report of Passive Agressive Classifier:\n")
# print(classification_report(y_test, mlp_pred))
# print("Accuracy of Passive Agressive Classifier: {}%".format(round(accuracy_score(y_test, mlp_pred)*100,2)))