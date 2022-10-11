#iChannel0"file://asset/img8.jpg"

const float durationTime=5.;
const uint ORIENTED=0x00000001u;//方向错位
const uint RADIAL=0x00000002u;//径向错位
const uint mode=RADIAL;
// const uint mode=ORIENTED;
const float offRatio=.02;//错位程度
const float contrastThreshold=.3;
const float relativeThreshold=.3;
const float pi=3.141592653;

//计算亮度
float calcLuma(vec3 color){
    return dot(vec3(.213,.715,.072),color);
}

//轮廓错位-一次 pass
void mainImage(out vec4 fragColor,in vec2 fragCoord)
{
    vec2 uv=fragCoord/iResolution.xy;
    vec2 texelSize=vec2(3.)/iResolution.xy;
    float progress=fract(iTime/durationTime);
    float time=progress;
    // time=.7;
    
    vec2 dir;
    float theta=2.*pi*time;
    vec2 offDirection=vec2(cos(theta),sin(theta));//错位方向
    if(mode==ORIENTED){
        dir=normalize(offDirection);
    }else if(mode==RADIAL){
        dir=normalize(uv-vec2(.5));
    }
    
    vec2 st=uv-dir*offRatio;
    float contrast=-1.;
    float maxLuma=0.;
    vec4 colorBase=texture2D(iChannel0,uv);
    vec4 colorOff=texture2D(iChannel0,st);
    
    if(all(greaterThan(st,vec2(0.)))&&all(lessThan(st,vec2(1.)))){
        //计算周围八点亮度
        //错位出原图范围的边缘不处理
        vec4 origin=colorOff;
        float lumaM=calcLuma(origin.rgb);
        float lumaE=calcLuma(texture2D(iChannel0,st+vec2(texelSize.x,0)).rgb);
        float lumaN=calcLuma(texture2D(iChannel0,st+vec2(0,texelSize.y)).rgb);
        float lumaW=calcLuma(texture2D(iChannel0,st+vec2(-texelSize.x,0)).rgb);
        float lumaS=calcLuma(texture2D(iChannel0,st+vec2(0,-texelSize.y)).rgb);
        float lumaNW=calcLuma(texture2D(iChannel0,st+vec2(-texelSize.x,texelSize.y)).rgb);
        float lumaNE=calcLuma(texture2D(iChannel0,st+vec2(texelSize.x,texelSize.y)).rgb);
        float lumaSW=calcLuma(texture2D(iChannel0,st+vec2(-texelSize.x,-texelSize.y)).rgb);
        float lumaSE=calcLuma(texture2D(iChannel0,st+vec2(texelSize.x,-texelSize.y)).rgb);
        
        float minLuma=min(min(min(lumaN,lumaS),min(lumaW,lumaE)),lumaM);
        maxLuma=max(max(max(lumaN,lumaS),max(lumaW,lumaE)),lumaM);
        contrast=maxLuma-minLuma;
    }
    
    vec4 color;
    //通过确定水平和垂直方向上像素点的亮度差，来计算对比度。当对比度较大时，认为处于边缘，需要进行轮廓错位处理
    if(contrast<max(contrastThreshold,maxLuma*relativeThreshold)){
        color=colorBase;
        // color = vec4(0.0,0.0,0.0,1.0);
    }else{
        color=colorOff;
    }
    
    fragColor=color;
}