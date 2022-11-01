#iChannel0"file://asset/img0.jpg"
#iChannel1"file://asset/img2.jpg"

const float durationTime=6.;
const float maxRatio=2.;

vec2 calcCoord(vec2 uv,float magnifyRatio){
    vec2 vec=uv-vec2(.5);
    float ratio=1./magnifyRatio;
    return vec2(.5)+ratio*vec;
}

//放大-一次 pass
void mainImage(out vec4 fragColor,in vec2 fragCoord)
{
    vec2 uv=fragCoord/iResolution.xy;
    float progress=fract(iTime/durationTime);
    float time=progress;
    if(progress<.5){
        time=progress;
    }else{
        time=1.-progress;
    }
    
    float magnifyRatio=1.+2.*time;
    vec4 colorCur=texture2D(iChannel0,calcCoord(uv,magnifyRatio));
    vec4 colorNext=texture2D(iChannel1,calcCoord(uv,magnifyRatio));
    
    if(progress>.5){
        fragColor=colorCur;
    }else{
        fragColor=colorNext;
    }
}