#iChannel0"file://asset/img8.jpg"

const float durationTime=5.;
const uint ORIENTED=0x00000001u;//方向错位
const uint RADIAL=0x00000002u;//径向错位
// const uint mode=RADIAL;
const uint mode=ORIENTED;
const float offRatio=.02;//错位程度
const float splitRatio=.01;//分离程度

const float contrastThreshold=.3;
const float relativeThreshold=.3;
const float pi=3.141592653;

//计算亮度
float calcLuma(vec3 color){
    return dot(vec3(.213,.715,.072),color);
}

//边缘检测。处于边缘返回 1 ，不处于边缘返回 0 。
float edgeDetection(vec2 uv,vec2 texelSize,float contrastThreshold,float relativeThreshold){
    vec4 origin=texture2D(iChannel0,uv);;
    float lumaM=calcLuma(origin.rgb);
    float lumaE=calcLuma(texture2D(iChannel0,uv+vec2(texelSize.x,0)).rgb);
    float lumaN=calcLuma(texture2D(iChannel0,uv+vec2(0,texelSize.y)).rgb);
    float lumaW=calcLuma(texture2D(iChannel0,uv+vec2(-texelSize.x,0)).rgb);
    float lumaS=calcLuma(texture2D(iChannel0,uv+vec2(0,-texelSize.y)).rgb);
    float lumaNW=calcLuma(texture2D(iChannel0,uv+vec2(-texelSize.x,texelSize.y)).rgb);
    float lumaNE=calcLuma(texture2D(iChannel0,uv+vec2(texelSize.x,texelSize.y)).rgb);
    float lumaSW=calcLuma(texture2D(iChannel0,uv+vec2(-texelSize.x,-texelSize.y)).rgb);
    float lumaSE=calcLuma(texture2D(iChannel0,uv+vec2(texelSize.x,-texelSize.y)).rgb);
    
    float minLuma=min(min(min(lumaN,lumaS),min(lumaW,lumaE)),lumaM);
    float maxLuma=max(max(max(lumaN,lumaS),max(lumaW,lumaE)),lumaM);
    float contrast=maxLuma-minLuma;
    return contrast>=max(contrastThreshold,maxLuma*relativeThreshold)?1.:0.;
}

//轮廓错位 RGB 分离-一次 pass
void mainImage(out vec4 fragColor,in vec2 fragCoord)
{
    vec2 uv=fragCoord/iResolution.xy;
    vec2 texelSize=vec2(3.)/iResolution.xy;
    float progress=fract(iTime/durationTime);
    float time=progress;
    // time=.5;
    
    vec2 dir;
    float theta=2.*pi*time;
    vec2 offDirection=vec2(cos(theta),sin(theta));//错位方向
    if(mode==ORIENTED){
        dir=normalize(offDirection);
    }else if(mode==RADIAL){
        dir=normalize(uv-vec2(.5));
    }
    
    vec2 stR=uv-dir*(offRatio-splitRatio);
    vec2 stG=uv-dir*offRatio;
    vec2 stB=uv-dir*(offRatio+splitRatio);
    vec2 st=stG;
    
    vec4 color=texture2D(iChannel0,uv);
    if(all(greaterThan(st,vec2(0.)))&&all(lessThan(st,vec2(1.)))){
        //错位出原图范围的边缘不处理
        if(edgeDetection(stR,texelSize,contrastThreshold,relativeThreshold)==1.){
            color.r=texture2D(iChannel0,stR).r;
        }
        if(edgeDetection(stG,texelSize,contrastThreshold,relativeThreshold)==1.){
            color.g=texture2D(iChannel0,stG).g;
        }
        if(edgeDetection(stB,texelSize,contrastThreshold,relativeThreshold)==1.){
            color.b=texture2D(iChannel0,stB).b;
        }
    }
    
    fragColor=color;
}