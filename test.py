import joblib
from sklearn.metrics import accuracy_score, confusion_matrix,classification_report
model = joblib.load('model/aletheia-naivbayes.pkl')

test = input('Enter news: ')
test_f = [test]
result = model.predict(test_f)
print(result)
print(accuracy_score(result))
print('test')