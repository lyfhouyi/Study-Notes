#iChannel0"file://asset/img10.jpg"

const float durationTime=5.;
const vec2 tileSize=vec2(10.);//马赛克块尺寸
const float dotSize=10.;//墨迹点尺寸

void mainImage(out vec4 fragColor,in vec2 fragCoord)
{
    vec2 uv=fragCoord/iResolution.xy;
    vec2 pixelStep=vec2(1.)/iResolution.xy;
    float progress=.5+.5*sin(2.*3.14*iTime/durationTime);
    float time=progress;
    time=1.;
    float mixRatio=time;
    vec3 colorBase=texture2D(iChannel0,uv).rgb;
    vec2 tileCnt=iResolution.xy/tileSize;
    vec2 st=round(uv*tileCnt)/tileCnt;
    st=clamp(st,vec2(0.),vec2(1.));
    
    vec2 dis=uv-st;
    dis.x=(dis.x/iResolution.y)*iResolution.x;
    float offset=length(dis);
    
    float threshold=dotSize/iResolution.x;
    vec3 th=threshold*(1.-colorBase);
    vec3 colorHalftone=step(th,vec3(offset));
    
    fragColor=vec4(mix(colorBase,colorHalftone,mixRatio),1.);
}