import joblib
model = joblib.load('model/aletheia-naivbayes.pkl')

test = input('Enter news: ')
test_f = [test]
result = model.predict(test_f)
print(result)
print('test')