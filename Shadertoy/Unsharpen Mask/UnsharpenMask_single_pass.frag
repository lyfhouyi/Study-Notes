#iChannel0"file://asset/img9.jpg"

const float durationTime=6.;
const float pi=3.141592653;
const float sigma=5.;

const float radius=10.;//半径
const float amount=3.;//数量
const float threshold=0.;//阈值

//计算权重
float gaussianWeight(float distance){
    return(1./pow(sqrt(2.*pi*pow(sigma,2.)),2.))*exp(-((distance*distance)/(2.*pow(sigma,2.))));
}

//计算亮度
float calcLuma(vec3 color){
    return dot(vec3(.213,.715,.072),color);
}

// USM 锐化-一次 pass
void mainImage(out vec4 fragColor,in vec2 fragCoord)
{
    vec2 uv=fragCoord/iResolution.xy;
    float progress=fract(iTime/durationTime);
    float time=progress;
    
    vec3 colorBase=texture2D(iChannel0,uv).rgb;
    //低通滤波
    vec3 colorLowFilter=vec3(0.);
    vec2 pixelStep=vec2(1.)/iResolution.xy;
    float weight;
    float totalWeight=0.;
    float kernelSize=radius;
    for(float j=-kernelSize;j<=kernelSize;j++){
        for(float i=-kernelSize;i<=kernelSize;i++){
            weight=gaussianWeight(abs(j)+abs(i));
            totalWeight+=weight;
            colorLowFilter+=texture2D(iChannel0,uv+vec2(i,j)*pixelStep).rgb*weight;
        }
    }
    colorLowFilter/=totalWeight;
    
    vec3 colorHighFilter=colorBase-colorLowFilter;//高通滤波
    vec3 colorSharping=colorBase+amount*colorHighFilter;//锐化结果
    
    float ratio=smoothstep(.8*threshold,threshold,calcLuma(abs(colorHighFilter)));
    vec3 color=mix(colorBase,colorSharping,ratio);
    
    fragColor=vec4(color,1.);
}