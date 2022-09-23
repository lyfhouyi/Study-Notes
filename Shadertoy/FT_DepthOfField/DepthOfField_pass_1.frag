#iChannel0"file://asset/test_depth.png"

const float durationTime=6.;
const float kernelSize=20.;//卷积核单边尺寸
const float pi=3.141592653;
const float sigma=3.;
const float e=2.7182804;

//计算亮度
float calcLuma(vec3 color){
    return dot(vec3(.213,.715,.072),color);
}

//计算权重
float gaussianWeight(float dis){
    return(1./pow(sqrt(2.*pi*pow(sigma,2.)),2.))*pow(e,-((dis*dis)/(2.*pow(sigma,2.))));
}

//散景模糊-第一次 pass，模糊深度图
void mainImage(out vec4 fragColor,in vec2 fragCoord)
{
    vec2 uv=fragCoord/iResolution.xy;
    vec2 pixelStep=vec2(3.)/iResolution.xy;
    float progress=fract(iTime/durationTime);
    float time=progress;
    time=1.0;
    
    //计算卷积
    vec2 st;
    float weight;
    float totalWeight=0.;
    float lumaGaussian = 0.0;
    for(float j=-kernelSize;j<=kernelSize;j++){
        for(float i=-kernelSize;i<=kernelSize;i++){
            st=uv+vec2(i,j)*pixelStep;
            weight=gaussianWeight(abs(j)+abs(i));
            lumaGaussian+=calcLuma(texture2D(iChannel0,st).rgb)*weight;
            totalWeight+=weight;
        }
    }
    lumaGaussian/=totalWeight;
    vec4 colorGaussian = vec4(vec3(lumaGaussian),1.0);

    float lumaBase=calcLuma(texture2D(iChannel0,uv).rgb);
    vec4 colorBase = vec4(vec3(lumaBase),1.0);
    
    fragColor=mix(colorBase,colorGaussian,time);
}