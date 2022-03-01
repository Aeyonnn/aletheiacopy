from adaboost import adaboost
from dt import decisionTree
# from gaussian_p import gaussianProcess
from knn import knn
from logreg import logisticRegression
from naivbayes import naivBayes
from randforest import randForest
from supvec import supportVector
from neural import neuralNetwork

# Create models from each algorithm
adaboost()
decisionTree()
# gaussianProcess()
knn()
logisticRegression()
naivBayes()
randForest()
supportVector()
neuralNetwork()
