#iChannel0"file://asset/img10.jpg"

const float durationTime=5.;
const float kernelSize=10.;//卷积核单边尺寸
const float sigmaS=.2;
const float sigmaR=.12;

//计算权重
vec3 bilateralWeight(float dis,vec3 colorDiff){
    float value1=-((dis*dis)/(2.*sigmaS*sigmaS));
    vec3 value2=-((colorDiff*colorDiff)/(2.*sigmaR*sigmaR));
    vec3 value=vec3(value1)+value2;
    return exp(value);
}

//双边滤波-一次 pass
void mainImage(out vec4 fragColor,in vec2 fragCoord)
{
    vec2 uv=fragCoord/iResolution.xy;
    float progress=fract(iTime/durationTime);
    float time=progress;
    float mixRatio=time;
    vec3 colorBase=texture2D(iChannel0,uv).rgb;
    vec2 pixelStep=vec2(1.)/iResolution.xy;
    float dis;
    vec3 weight;
    vec3 totalWeight=vec3(0.);
    vec3 colorBilateral=vec3(0.);
    for(float j=-kernelSize;j<=kernelSize;j++){
        for(float i=-kernelSize;i<=kernelSize;i++){
            vec2 st=uv+vec2(i,j)*pixelStep;
            vec3 colorSt=texture2D(iChannel0,st).rgb;
            dis=distance(uv,st);
            weight=bilateralWeight(dis,colorSt-colorBase);
            colorBilateral+=colorSt*weight;
            totalWeight+=weight;
        }
    }
    
    colorBilateral/=totalWeight;
    fragColor=vec4(mix(colorBase,colorBilateral,mixRatio),1.);
}