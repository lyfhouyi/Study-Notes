#iChannel0"file://asset/img0.jpg"

const uint ORIENTED=0x00000001u;//方向模糊
const uint RADIAL=0x00000002u;//径向模糊
// const uint mode=RADIAL;
const uint mode=ORIENTED;
const vec2 direction=vec2(-1.,1.);
const float stepCnt=61.;
const float sqrt_2=1.414213562373095;
const float durationTime=6.;

//方向模糊-一次 pass
void mainImage(out vec4 fragColor,in vec2 fragCoord)
{
    vec2 uv=fragCoord/iResolution.xy;
    vec2 pixelStep=2./iResolution.xy;
    float progress=fract(iTime/durationTime);
    float time=progress;
    
    vec4 color=vec4(0.);
    vec2 dir;
    vec2 stepLength;
    
    if(mode==ORIENTED){
        dir=normalize(direction);
        stepLength=pixelStep;
    }else if(mode==RADIAL){
        dir=normalize(uv-vec2(.5));
        stepLength=pixelStep*smoothstep(0.,.5*sqrt_2,length(uv-vec2(.5)));
    }
    
    stepLength*=time;
    for(float stepI=0.;stepI<stepCnt;stepI++){
        color+=texture2D(iChannel0,uv-dir*stepLength*stepI);
    }
    color/=stepCnt;
    fragColor=color;
}