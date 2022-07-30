from random import random
import numpy as np

def test1():
    x=np.array([[0.299, -0.147, 0.615],[0.587, -0.289, -0.515],[ 0.114, 0.436, -0.100]])
    x=x.T.reshape((3,3))


    z=np.linalg.inv(x)
    y=np.array([1.6,0.8,0.8]).reshape((3,1))
    y=np.dot(x,y)
    y[0]=1
    print(y)

    print(z)
    print(np.dot(z,y))


def test2():
    for i in range(10):
        print(random()*0.1,i/10+random()*0.1)

test2()