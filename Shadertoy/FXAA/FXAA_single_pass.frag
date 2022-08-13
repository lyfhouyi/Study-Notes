#iChannel0"file://PageFlip_pass_1.png"

float calc


//高斯模糊-一次 pass
void mainImage(out vec4 fragColor,in vec2 fragCoord)
{
    vec2 uv=fragCoord/iResolution.xy;
    vec2 pixelStep=vec2(1.)/iResolution.xy;

    fragColor=texture2D(iChannel0,uv);

    //通过确定水平和垂直方向上像素点的亮度差，来计算对比度。当对比度较大时，认为需要进行抗锯齿处理
}