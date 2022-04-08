import joblib
from numpy import vectorize
from sklearn.feature_extraction.text import CountVectorizer

model1 = joblib.load('model/test.pkl')
model2 = joblib.load('model/Dataset1(OS)/Test2/aletheia-adaboost.pkl')
model3 = joblib.load('model/Dataset1(OS)/Test2/aletheia-decisiontree.pkl')
model4 = joblib.load('model/Dataset1(OS)/Test2/aletheia-knn.pkl')
model5 = joblib.load('model/Dataset1(OS)/Test2/aletheia-logreg.pkl')
model6 = joblib.load('model/Dataset1(OS)/Test2/aletheia-naivbayes.pkl')
# model7 = joblib.load('model/Dataset1(OS)/Test2/aletheia-passiveagressive.pkl')


datainput = input('insert news: ')

peepoo = [datainput]

wide1 = model1.predict(peepoo)
wide2 = model2.predict(peepoo)
wide3 = model3.predict(peepoo)
wide4 = model4.predict(peepoo)
wide5 = model5.predict(peepoo)
wide6 = model6.predict(peepoo)
# wide7 = model7.predict(peepoo)

print(wide1)
print(wide2)
print(wide3)
print(wide4)
print(wide5)
print(wide6)
print(wide7)
