#iChannel0"file://TiltShift_pass_1.frag"
#iChannel1"file://asset/img18.jpg"

const float durationTime=6.;
const uint CIRCLE=0x00000001u;//圆形
const uint HORIZONTAL=0x00000002u;//水平
const uint mode=CIRCLE;

float round(vec2 pt,vec2 center,float radius){
    float value=distance(pt,center)/radius;
    return(1.-smoothstep(.7,1.,value));
}

float strap(vec2 pt,vec2 center,vec2 direction,float width){
    direction=normalize(direction);
    vec2 ptCenter=pt-center;
    float value=abs(cross(vec3(ptCenter,0.),vec3(direction,0.)).z)/width;
    return(1.-smoothstep(.7,1.,value));
}

//移轴摄影-第二次 pass，融合前景背景
void mainImage(out vec4 fragColor,in vec2 fragCoord)
{
    vec2 uv=fragCoord/iResolution.xy;
    float progress=fract(iTime/durationTime);
    float time=progress;
    time=1.;
    vec3 colorBackground=texture2D(iChannel0,uv).rgb;
    vec3 colorForeground=texture2D(iChannel1,uv).rgb;
    float mixRatio;
    if(mode==CIRCLE){
        mixRatio=round(uv,vec2(.5),.45*time);
    }else if(mode==HORIZONTAL){
        mixRatio=strap(uv,vec2(.5),vec2(1.,0.),.35*time);
    }
    vec3 color=mix(colorBackground,colorForeground,mixRatio);
    fragColor=vec4(color,1.);
}