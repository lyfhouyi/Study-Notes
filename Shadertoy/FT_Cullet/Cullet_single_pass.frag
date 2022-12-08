#iChannel0"file://asset/img8.jpg"

const float durationTime=10.;

vec2[]controlPoint=vec2[10](vec2(.81,.36),vec2(.33,.71),vec2(.54,.39),vec2(.53,.94),vec2(.98,.61),vec2(.50,.45),vec2(.14,.63),vec2(.74,.58),vec2(.23,.01),vec2(.27,.57));

//碎玻璃-一次 pass
void mainImage(out vec4 fragColor,in vec2 fragCoord)
{
    vec2 uv=fragCoord/iResolution.xy;
    float progress=fract(iTime/durationTime);
    float time=progress;
    time=1.;
    
    vec3 color=vec3(1.);
    int affiliationIndex;
    float minDistance=9.9;
    float secondMinDistance=9.9;
    for(int i=0;i<10;i++){
        float disCurControlPointI=distance(uv,controlPoint[i]);
        if(disCurControlPointI<minDistance){
            affiliationIndex=i;
            secondMinDistance=minDistance;
            minDistance=disCurControlPointI;
        }
    }
    
    vec2 dir=normalize(uv-controlPoint[affiliationIndex]);
    float dis=length(uv-controlPoint[affiliationIndex])+.0025;
    vec2 st=controlPoint[affiliationIndex]+dis*dir;
    color=minDistance<.01?vec3(1.,0.,0.):texture2D(iChannel0,st).rgb;
    
    if(abs(secondMinDistance-minDistance)<.01){
        color=vec3(0.);
    }
    
    fragColor=vec4(color,1.);
}