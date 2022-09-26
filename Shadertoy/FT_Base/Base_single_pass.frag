#iChannel0"file://asset/img10.jpg"

const float durationTime=5.;
const float brightness=.9;//亮度
const float saturation=1.2;//饱和度
const float contrast=.6;//对比度

//计算亮度
float calcLuma(vec3 color){
    return dot(vec3(.213,.715,.072),color);
}

//基础滤镜-一次 pass
void mainImage(out vec4 fragColor,in vec2 fragCoord)
{
    vec2 uv=fragCoord/iResolution.xy;
    float progress=fract(iTime/durationTime);
    float time=progress;
    // time=1.;
    float mixRatio=time;
    vec3 colorBase=texture2D(iChannel0,uv).rgb;
    
    //调整亮度
    vec3 colorFilter=colorBase*brightness;
    
    //调整饱和度
    float luma=calcLuma(colorBase);
    vec3 colorLuma=vec3(luma);
    colorFilter=mix(colorLuma,colorFilter,saturation);
    
    //调整对比度
    vec3 colorGray=vec3(.5);
    colorFilter=mix(colorGray,colorFilter,contrast);
    
    fragColor=vec4(mix(colorBase,colorFilter,mixRatio),1.);
}