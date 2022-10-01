#iChannel0"file://asset/img12.jpg"

const float kernelSize=5.;//卷积核单边尺寸

//双边纹理滤波-第一次 pass，由 I 计算 B
void mainImage(out vec4 fragColor,in vec2 fragCoord)
{
    vec2 uv=fragCoord/iResolution.xy;
    vec2 pixelStep=vec2(1.)/iResolution.xy;
    vec3 colorAverage=vec3(0.);
    for(float j=-kernelSize;j<=kernelSize;j++){
        for(float i=-kernelSize;i<=kernelSize;i++){
            vec2 st=uv+vec2(i,j)*pixelStep;
            vec3 colorSt=texture2D(iChannel0,st).rgb;
            colorAverage+=colorSt;
        }
    }
    
    colorAverage/=(2.*kernelSize+1.)*(2.*kernelSize+1.);
    fragColor=vec4(colorAverage,1.);
}