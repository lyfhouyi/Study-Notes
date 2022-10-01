#iChannel0"file://asset/img12.jpg"
#iChannel1"file://BilateralTextureFilter_pass_2.frag"

const float durationTime=5.;
const float kernelSize=5.;//卷积核单边尺寸
const float sigmaS=.2;
const float sigmaR=.12;

//计算权重
vec3 bilateralWeight(float dis,vec3 colorDiff){
    float value1=-((dis*dis)/(2.*sigmaS*sigmaS));
    vec3 value2=-((colorDiff*colorDiff)/(2.*sigmaR*sigmaR));
    vec3 value=vec3(value1)+value2;
    return exp(value);
}

//双边纹理滤波-四次 pass，由 I, T 计算输出
void mainImage(out vec4 fragColor,in vec2 fragCoord)
{
    vec2 uv=fragCoord/iResolution.xy;
    float progress=fract(iTime/durationTime);
    float time=progress;
    time=1.;
    float mixRatio=time;
    vec3 colorBaseI=texture2D(iChannel0,uv).rgb;
    vec3 colorBaseT=texture2D(iChannel1,uv).rgb;
    vec2 pixelStep=vec2(1.)/iResolution.xy;
    float dis;
    vec3 weight;
    vec3 totalWeight=vec3(0.);
    vec3 colorBilateral=vec3(0.);
    for(float j=-kernelSize;j<=kernelSize;j++){
        for(float i=-kernelSize;i<=kernelSize;i++){
            vec2 st=uv+vec2(i,j)*pixelStep;
            vec3 colorStI=texture2D(iChannel0,st).rgb;
            vec3 colorStT=texture2D(iChannel1,st).rgb;
            dis=distance(uv,st);
            weight=bilateralWeight(dis,colorStT-colorBaseT);
            colorBilateral+=colorStI*weight;
            totalWeight+=weight;
        }
    }
    
    colorBilateral/=totalWeight;
    fragColor=vec4(mix(colorBaseI,colorBilateral,mixRatio),1.);
}