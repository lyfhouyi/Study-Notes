# Shadertoy
常用的特效 shader

## Gaussian Blur-高斯模糊

使用高斯核对图片各像素点做卷积。

### 用一次 pass 实现

用一次 pass 实现时，计算量较大，当卷积核尺寸为 25 x 25 时卡顿明显。

下图是用一次 pass 实现的高斯模糊效果。

> GaussianBlur_single_pass.frag

![GaussianBlur_single_pass](Shadertoy/Gaussian Blur/GaussianBlur_single_pass.png)

### 用两次 pass 实现

用一次 pass 实现时，计算量较小，当卷积核尺寸为 25 x 25 时依旧流畅，且与用一次pass实现时效果相似。

下图是用两次 pass 实现的高斯模糊效果。

> GaussianBlur_double_pass.frag

![GaussianBlur_double_pass](Shadertoy/Gaussian Blur/GaussianBlur_double_pass.png)



下图是第一次 pass 的中间输出，第一次 pass 只对水平方向模糊。

> GaussianBlur_pass_1.frag

![GaussianBlur_pass_1](Shadertoy/Gaussian Blur/GaussianBlur_pass_1.png)



## Change To Autumn-树叶变黄

第一次 pass 用来抠出原图中的绿色部分。第二次 pass 将绿色部分变黄后与原图混合。

### 原图

![ChangeToAutumn_raw](Shadertoy/Change To Autumn/ChangeToAutumn_raw.png)

### 过程中

变化过程使用烧毁效果。

![ChangeToAutumn_changing](Shadertoy/Change To Autumn/ChangeToAutumn_changing.png)

### 滤镜后

> ChangeToAutumn_double_pass.frag

![ChangeToAutumn_double_pass](Shadertoy/Change To Autumn/ChangeToAutumn_double_pass.png)



## RGB Split-RGB 分离

一次 pass 即可实现。

### 滤镜后

> RGBSplit_single_pass.frag

![RGBSplit_single_pass](Shadertoy/RGB Split/RGBSplit_single_pass.png)