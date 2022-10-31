import numpy as np
import matplotlib.pyplot as plt


# 缓动函数
def easeInSine(x):
    return 1 - np.cos((x * np.pi) / 2)


def easeOutSine(x):
    return np.sin((x * np.pi) / 2)


def easeInOutSine(x):
    return -(np.cos(np.pi * x) - 1) / 2


def easeInQuad(x):
    return x * x


def easeOutQuad(x):
    return 1 - (1 - x) * (1 - x)


def easeInOutQuad(x):
    if x < 0.5:
        return 2 * x * x
    else:
        return 1 - pow(-2 * x + 2, 2) / 2


def easeInCubic(x):
    return x * x * x


def easeOutCubic(x):
    return 1 - pow(1 - x, 3)


def easeInOutCubic(x):
    if x < 0.5:
        return 4 * x * x * x
    else:
        return 1 - pow(-2 * x + 2, 3) / 2


def easeInQuart(x):
    return x * x * x * x


def easeOutQuart(x):
    return 1 - pow(1 - x, 4)


def easeInOutQuart(x):
    if x < 0.5:
        return 8 * x * x * x * x
    else:
        return 1 - pow(-2 * x + 2, 4) / 2


def easeInQuint(x):
    return x * x * x * x * x


def easeOutQuint(x):
    return 1 - pow(1 - x, 5)


def easeInOutQuint(x):
    if x < 0.5:
        return 16 * x * x * x * x * x
    else:
        return 1 - pow(-2 * x + 2, 5) / 2


def easeInExpo(x):
    if x == 0:
        return 0
    else:
        return pow(2, 10 * x - 10)  #可调


def easeOutExpo(x):
    if x == 1:
        return 1
    else:
        return 1 - pow(2, -10 * x)  #可调


def easeInOutExpo(x):
    if x == 0:
        return 0
    elif x == 1:
        return 1
    elif x < 0.5:
        return pow(2, 20 * x - 10) / 2  #可调
    else:
        return (2 - pow(2, -20 * x + 10)) / 2  #可调


def easeInCirc(x):
    return 1 - np.sqrt(1 - pow(x, 2))  #可调


def easeOutCirc(x):
    return np.sqrt(1 - pow(x - 1, 2))  #可调


def easeInOutCirc(x):
    if x < 0.5:
        return (1 - np.sqrt(1 - pow(2 * x, 2))) / 2  #可调
    else:
        return (np.sqrt(1 - pow(-2 * x + 2, 2)) + 1) / 2  #可调


def easeInBack(x):
    c1 = 1.70158  # 可调
    c3 = c1 + 1

    return c3 * x * x * x - c1 * x * x


def easeOutBack(x):
    c1 = 1.70158  # 可调
    c3 = c1 + 1

    return 1 + c3 * pow(x - 1, 3) + c1 * pow(x - 1, 2)


def easeInOutBack(x):
    c1 = 1.70158  # 可调
    c2 = c1 * 1.525
    if x < 0.5:
        return (pow(2 * x, 2) * ((c2 + 1) * 2 * x - c2)) / 2
    else:
        return (pow(2 * x - 2, 2) * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2


def easeInElastic(x):
    c4 = (2 * np.pi) / 3  # 可调

    if x == 0:
        return 0
    elif x == 1:
        return 1
    else:
        return -pow(2, 10 * x - 10) * np.sin((x * 10 - 10.75) * c4)


def easeOutElastic(x):
    c4 = (2 * np.pi) / 3  # 可调

    if x == 0:
        return 0
    elif x == 1:
        return 1
    else:
        return pow(2, -10 * x) * np.sin((x * 10 - 0.75) * c4) + 1


def easeInOutElastic(x):
    c5 = (2 * np.pi) / 4.5  # 可调

    if x == 0:
        return 0
    elif x == 1:
        return 1
    elif x < 0.5:
        return -(pow(2, 20 * x - 10) * np.sin((20 * x - 11.125) * c5)) / 2
    else:
        return (pow(2, -20 * x + 10) * np.sin((20 * x - 11.125) * c5)) / 2 + 1


def easeInBounce(x):
    return 1 - easeOutBounce(1 - x)


def easeOutBounce(x):
    n1 = 7.625
    d1 = 2.75
    if x < 1 / d1:
        return n1 * x * x
    elif x < 2 / d1:
        x -= 1.5 / d1
        return n1 * x * x + 0.75

    elif x < 2.5 / d1:
        x -= 2.25 / d1
        return n1 * x * x + 0.9375
    else:
        x -= 2.625 / d1
        return n1 * x * x + 0.984375


def easeInOutBounce(x):
    if x < 0.5:
        return 1 - easeOutBounce(1 - 2 * x) / 2
    else:
        return 1 + easeOutBounce(2 * x - 1) / 2


def ehEaseInElasticBounce(x):
    c4 = (2 * np.pi) / 3  # 可调

    if x == 0:
        return 0
    elif x == 1:
        return 1
    else:
        return abs(-pow(2, 10 * x - 10) * np.sin((x * 10 - 10.75) * c4))


def ehEaseOutElasticBounce(x):
    c4 = (2 * np.pi) / 3  # 可调

    if x == 0:
        return 0
    elif x == 1:
        return 1
    else:
        y = pow(2, -10 * x) * np.sin((x * 10 - 0.75) * c4) + 1
        if y > 1:
            y = 2 - y
        return y


def ehEaseInOutElasticBounce(x):
    c5 = (2 * np.pi) / 4.5  # 可调

    if x == 0:
        return 0
    elif x == 1:
        return 1
    elif x < 0.5:
        return abs(-(pow(2, 20 * x - 10) * np.sin((20 * x - 11.125) * c5)) / 2)
    else:
        y = (pow(2, -20 * x + 10) * np.sin((20 * x - 11.125) * c5)) / 2 + 1
        if y > 1:
            y = 2 - y
        return y


def ehEaseCustom(x):
    return 1 - easeOutBounce(x)


# 绘制缓动曲线
def plotEaseCurve(func):
    x = np.arange(0, 1.0005, 0.001)
    ret = []
    for t in x:
        ret.append(func(t))
    y = np.array(ret)

    plt.plot(x, y, linewidth=3)
    plt.title(func.__name__)
    plt.grid()
    plt.show()


# 绘制三次贝塞尔曲线
def plotCubicBezier(p1_x, p1_y, p2_x, p2_y):
    # 三次贝塞尔
    def cubic_bezier(t, p0, p1, p2, p3):
        mat = np.array([[-1, 3, -3, 1], [3, -6, 3, 0], [-3, 3, 0, 0],
                        [1, 0, 0, 0]])
        left = np.array([t * t * t, t * t, t, 1]).reshape(1, 4)
        right = np.array([p0, p1, p2, p3]).reshape(4, 1)
        # return p0*pow(1-t,3)+3*p1*t*pow(1-t,2)+3*p2*pow(t,2)*(1-t)+p3*pow(t,3)
        return np.matmul(np.matmul(left, mat), right)[0][0]

    t = np.arange(0, 1.005, 0.01)
    x = []
    y = []
    for ti in t:
        x.append(cubic_bezier(ti, 0, p1_x, p2_x, 1))
        y.append(cubic_bezier(ti, 0, p1_y, p2_y, 1))
    x = np.array(x)
    y = np.array(y)

    print(x)
    print(y)
    plt.plot(x, y, linewidth=3)
    plt.plot(t, t, linestyle='--')
    plt.plot(t,y,linestyle='-.')
    plt.plot(t,x,linestyle='-.')
    plt.grid()
    plt.show()


# plotEaseCurve(ehEaseCustom)
plotCubicBezier(-0.5, 0.5, 0.5, 0.5)
