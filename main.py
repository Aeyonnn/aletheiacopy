from Algo.adaboost import adaboost
from Algo.dt import decisionTree
# from gaussian_p import gaussianProcess
from Algo.knn import knn
from Algo.logreg import logisticRegression
from Algo.naivbayes import naivBayes
from Algo.randforest import randForest
from Algo.supvec import supportVector
from Algo.neural import neuralNetwork

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
