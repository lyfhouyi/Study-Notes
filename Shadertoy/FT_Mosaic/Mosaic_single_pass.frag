#iChannel0"file://asset/img0.jpg"

const float durationTime=5.;
const vec2 tileSize=vec2(8.);//马赛克块尺寸

//马赛克-一次 pass
void mainImage(out vec4 fragColor,in vec2 fragCoord)
{
    vec2 uv=fragCoord/iResolution.xy;
    vec2 pixelStep=vec2(1.)/iResolution.xy;
    float progress=fract(iTime/durationTime);
    float time=progress;
    time=1.;
    float mixRatio=time;
    vec3 colorBase=texture2D(iChannel0,uv).rgb;
    vec2 tileCnt=iResolution.xy/tileSize;
    vec2 st=round(uv*tileCnt)/tileCnt;
    st=clamp(st,vec2(0.),vec2(1.));
    vec3 color=texture2D(iChannel0,st).rgb;
    fragColor=vec4(mix(colorBase,color,mixRatio),1.);
}