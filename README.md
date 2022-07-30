# Shadertoy
常用的特效 shader

## Gaussian Blur-高斯模糊

### 用一次 pass 实现

GaussianBlur_single_pass.frag

![GaussianBlur_single_pass](Shadertoy/Gaussian Blur/GaussianBlur_single_pass.png)


### 用两次 pass 实现

GaussianBlur_double_pass.frag

![GaussianBlur_double_pass](Shadertoy/Gaussian Blur/GaussianBlur_double_pass.png)

下面是第一次pass的中间输出，第一次pass只对水平方向模糊

![GaussianBlur_pass_1](Shadertoy/Gaussian Blur/GaussianBlur_pass_1.png)
