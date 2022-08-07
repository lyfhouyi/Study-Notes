import PIL.Image
import numpy as np
import matplotlib.pyplot as plt


# 计算图片像素值分布
def imageDistribution(imageArray,indexs=[0,1,2]):
    colors=['red','green','blue']
    ret = []
    for channel in indexs:
        value=[]
        count=[]
        arr = imageArray[:,:,channel].flatten()
        # print(arr.shape)
        arr.sort()
        value.append(arr[0])
        count.append(0)
        for i in arr:
            if(i==value[-1]):
                count[-1]+=1
            else:
                value.append(i)
                count.append(1)
        ret.append([value,count])
        sumCnt = sum(count)
        cnt = 0
        ratio=[]
        for i in count:
            cnt+=i
            ratio.append(cnt/sumCnt)
        plt.plot(value, ratio, linewidth=2, color=colors[channel], marker="o")  
    
    plt.xticks(np.arange(0,256,10))
    plt.yticks(np.arange(0,1.01,0.05))
    plt.grid()
    plt.show() 
    return ret

# 像素值归一化：0-255
def normalize(imageArray):
    imageArrayNormalized=np.zeros(imageArray.shape)

    for channel in range(3):
        imageArrayChannel=imageArray[:,:,channel]
        minValue = np.min(imageArrayChannel)
        maxValue = np.max(imageArrayChannel)
        
        for i, x in np.ndenumerate(imageArrayChannel):
            if i[0]==1080:
                print('df')
            imageArrayNormalized[i[0],i[1],channel]=int(255*(x-minValue)/(maxValue-minValue))

    return imageArrayNormalized


# 打印基本信息
def printBasicInformation(imageArray):
    minR = np.min(imageArray[:,:,0])
    maxR = np.max(imageArray[:,:,0])
    minG = np.min(imageArray[:,:,1])
    maxG = np.max(imageArray[:,:,1])
    minB = np.min(imageArray[:,:,2])
    maxB = np.max(imageArray[:,:,2])

    print('尺寸: ',imageArray.shape)
    print('R 范围: ',minR,',',maxR)
    print('G 范围: ',minG,',',maxG)
    print('B 范围: ',minB,',',maxB)


# 查看纹理数据分布
def checkTexture():
    image = PIL.Image.open("/Users/e.hou/git/Study-Notes/python/RandomTexture.jpg")
    imageArray = np.array(image)
    # image.show()

    # 原始纹理信息
    printBasicInformation(imageArray)
    imageDistribution(imageArray)
    
    # 归一化后纹理信息
    imageArrayNormalized=normalize(imageArray)
    printBasicInformation(imageArrayNormalized)
    imageDistribution(imageArrayNormalized)

    # 保存纹理
    imageNormalized= PIL.Image.fromarray(imageArrayNormalized.astype('uint8')).convert('RGB')
    # imageNormalized.show()
    imageNormalized.save("/Users/e.hou/git/Study-Notes/python/RandomTextureZZ.jpg", quality=95)




checkTexture()
