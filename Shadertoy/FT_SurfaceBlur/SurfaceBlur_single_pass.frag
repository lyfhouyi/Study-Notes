#iChannel0"file://asset/img10.jpg"

const float durationTime=5.;
const float kernelSize=15.;//卷积核单边尺寸
const float thresholdY=.1;

//计算权重
vec3 surfaceWeight(vec3 colorDiff){
    vec3 value=1.-abs(colorDiff)/(2.5*thresholdY);
    return max(vec3(0.),value);
}

//表面模糊-一次 pass
void mainImage(out vec4 fragColor,in vec2 fragCoord)
{
    vec2 uv=fragCoord/iResolution.xy;
    float progress=fract(iTime/durationTime);
    float time=progress;
    time=1.;
    float mixRatio=time;
    vec3 colorBase=texture2D(iChannel0,uv).rgb;
    vec2 pixelStep=vec2(1.)/iResolution.xy;
    vec3 weight;
    vec3 totalWeight=vec3(0.);
    vec3 colorSurface=vec3(0.);
    for(float j=-kernelSize;j<=kernelSize;j++){
        for(float i=-kernelSize;i<=kernelSize;i++){
            vec2 st=uv+vec2(i,j)*pixelStep;
            vec3 colorSt=texture2D(iChannel0,st).rgb;
            weight=surfaceWeight(colorSt-colorBase);
            colorSurface+=colorSt*weight;
            totalWeight+=weight;
        }
    }
    
    colorSurface/=totalWeight;
    fragColor=vec4(mix(colorBase,colorSurface,mixRatio),1.);
}