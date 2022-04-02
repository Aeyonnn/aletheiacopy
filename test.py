import joblib
import pandas as pd
from sklearn.metrics import accuracy_score, confusion_matrix,classification_report
from sklearn.model_selection import train_test_split


data = pd.read_csv('data/Dataset1(OS)/news.csv')
model = joblib.load('model/Dataset1(OS)/Test1/aletheia-naivbayes.pkl')

x_train, x_test, y_train, y_test = train_test_split(data['title'], data['label'], test_size=0.2, random_state=1)

test = input('Enter news: ')
test_f = [test]
result = model.predict(test_f)
models = model.score(x_train, y_train)

print(result)
print(models)