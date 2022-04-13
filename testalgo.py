import joblib
from numpy import vectorize
from sklearn.feature_extraction.text import CountVectorizer

model1 = joblib.load('model/Dataset2/Test1/aletheia-adaboost.pkl')
model2 = joblib.load('model/Dataset2/Test1/aletheia-decisiontree.pkl')
model3 = joblib.load('model/Dataset2/Test1/aletheia-knn.pkl')
model4 = joblib.load('model/Dataset2/Test1/aletheia-logreg.pkl')
model5 = joblib.load('model/Dataset2/Test1/aletheia-naivbayes.pkl')
model6 = joblib.load('model/Dataset2/Test1/aletheia-neural.pkl')
model7 = joblib.load('model/Dataset2/Test1/aletheia-passiveagressive.pkl')
model8 = joblib.load('model/Dataset2/Test1/aletheia-randforest.pkl')
model9 = joblib.load('model/Dataset2/Test1/aletheia-randforest.pkl')

datainput = input('insert news: ')

peepoo = [datainput]

wide1 = model1.predict(peepoo)
wide2 = model2.predict(peepoo)
wide3 = model3.predict(peepoo)
wide4 = model4.predict(peepoo)
wide5 = model5.predict(peepoo)
wide6 = model6.predict(peepoo)
wide7 = model7.predict(peepoo)
wide8 = model8.predict(peepoo)
wide9 = model9.predict(peepoo)

real = 0
fake = 0

for i in range(1,9):
    if eval('wide'+str(i)) == ['FAKE']:
        fake += 1
    if eval('wide'+str(i)) == ['REAL']:
        real += 1
        
if fake > real:
    perecentage = (fake/9)*100
    percent = str(round(perecentage,2))
    descip = 'fake'
    print('it is {}% {}'.format(percent,descip))
elif fake == real:
    percent = 50
    descip = 'half fake and half true'
    print('it is {}% {}'.format(percent,descip))
else:
    perecentage = (real/9)*100
    percent = str(round(perecentage,2))
    descip = 'real'
    print('it is {}% {}'.format(percent,descip))

for i in range (1,9):
    print(eval('wide'+str(i)))


