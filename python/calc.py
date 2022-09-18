from random import random
import numpy as np
import matplotlib.pyplot as plt

def test1():
    x=np.array([[0.299, -0.147, 0.615],[0.587, -0.289, -0.515],[ 0.114, 0.436, -0.100]])
    x=x.T.reshape((3,3))


    z=np.linalg.inv(x)
    y=np.array([2.1,0.7,0.7]).reshape((3,1))
    y=np.dot(x,y)
    y[0]=1
    print(y)

    print(z)
    print(np.dot(z,y))


def test2():
    for i in range(10):
        print(random()*0.1,i/10+random()*0.1)


def test3():
    r=1.0
    x=[]
    y=[]
    for i in range(30):
        r+=1.0/r
        x.append(i)
        y.append(r-1.0)

    xx=np.arange(10, 100.005, 0.01)

    A_apertureDiameter=1.4
    F_focalLength=15.
    P_focusDistance=50.
    MaxBgdCoC=(A_apertureDiameter*F_focalLength)/(P_focusDistance-F_focalLength)
    yy=MaxBgdCoC*(1-P_focusDistance/xx)
    yy=abs(yy)
    plt.plot(xx,yy)
    plt.axhline(y=MaxBgdCoC, xmin=0.1, xmax=100)
    plt.axhline(y=0, xmin=0.1, xmax=100)
    plt.show()



test3()
