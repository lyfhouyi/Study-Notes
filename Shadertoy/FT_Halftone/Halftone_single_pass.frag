#iChannel0"file://asset/img10.jpg"

const float durationTime=5.;
const vec2 tileSize=vec2(8.);//马赛克块尺寸
const float dotSize=5.;//墨迹点尺寸

//计算亮度
float calcLuma(vec3 color){
    return dot(vec3(.213,.715,.072),color);
}

//半色调-一次 pass
void mainImage(out vec4 fragColor,in vec2 fragCoord)
{
    vec2 uv=fragCoord/iResolution.xy;
    vec2 pixelStep=vec2(1.)/iResolution.xy;
    float progress=.5+.5*sin(2.*3.14*iTime/durationTime);
    float time=progress;
    time=1.;
    float mixRatio=time;
    float luma=calcLuma(texture2D(iChannel0,uv).rgb);
    vec3 colorBaseGray=vec3(luma);
    vec2 tileCnt=iResolution.xy/tileSize;
    vec2 st=round(uv*tileCnt)/tileCnt;
    st=clamp(st,vec2(0.),vec2(1.));
    
    vec2 dis=uv-st;
    dis.x=(dis.x/iResolution.y)*iResolution.x;
    float offset=length(dis);
    
    float threshold=dotSize/iResolution.x;
    threshold*=(1.-luma);
    float colorHalftone=step(threshold,offset);
    
    vec3 color=vec3(colorHalftone);
    fragColor=vec4(mix(colorBaseGray,color,mixRatio),1.);
}