#iChannel0"file://asset/img0.jpg"
#iChannel1"file://asset/img1.jpg"
#iChannel2"file://asset/img2.jpg"
#iChannel3"file://asset/img3.jpg"
#iChannel4"file://asset/img4.jpg"
#iChannel5"file://asset/img5.jpg"
#iChannel6"file://asset/img6.jpg"
#iChannel7"file://asset/img7.jpg"
#iChannel8"file://asset/img8.jpg"
#iChannel9"file://asset/img9.jpg"

const float durationTime=10.;

vec2[]controlPoint=vec2[10](vec2(.81,.36),vec2(.33,.71),vec2(.54,.39),vec2(.53,.94),vec2(.98,.61),vec2(.50,.45),vec2(.14,.63),vec2(.74,.58),vec2(.23,.01),vec2(.27,.57));

//泰森多边形特效-一次 pass
void mainImage(out vec4 fragColor,in vec2 fragCoord)
{
    vec2 uv=fragCoord/iResolution.xy;
    float progress=fract(iTime/durationTime);
    float time=progress;
    float r=.7*time;
    
    vec3[]colors=vec3[10](texture2D(iChannel0,uv).rgb,texture2D(iChannel1,uv).rgb,texture2D(iChannel2,uv).rgb,texture2D(iChannel3,uv).rgb,texture2D(iChannel4,uv).rgb,texture2D(iChannel5,uv).rgb,texture2D(iChannel6,uv).rgb,texture2D(iChannel7,uv).rgb,texture2D(iChannel8,uv).rgb,texture2D(iChannel9,uv).rgb);
    
    vec3 color=vec3(1.);
    int affiliationIndex;
    float minDistance=9.9;
    for(int i=0;i<10;i++){
        if(distance(uv,controlPoint[i])<minDistance){
            affiliationIndex=i;
            minDistance=distance(uv,controlPoint[i]);
        }
    }
    
    if(minDistance<r){
        // color =minDistance<0.01?vec3(0.0):vec3(controlPoint[affiliationIndex],float(affiliationIndex) * 0.1);
        color=minDistance<.01?vec3(0.):colors[affiliationIndex];
    }
    
    fragColor=vec4(color,1.);
}