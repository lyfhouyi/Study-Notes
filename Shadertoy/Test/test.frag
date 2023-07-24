#iChannel0"file://asset/001.jpg"
#iChannel1"file://asset/img1.jpg"

const float durationTime=10.;

vec2[]controlPoint=vec2[10](vec2(.81,.36),vec2(.33,.71),vec2(.54,.39),vec2(.53,.94),vec2(.98,.61),vec2(.50,.45),vec2(.14,.63),vec2(.74,.58),vec2(.23,.01),vec2(.27,.57));

//泰森多边形-一次 pass
void mainImage(out vec4 fragColor,in vec2 fragCoord)
{
    vec2 uv=fragCoord/iResolution.xy;
    float progress=fract(iTime/durationTime);
    float time=progress;
    float r=.7*time;
    
    vec3 colorBase = texture2D(iChannel0,uv).rgb;
    vec3 colorRed = vec3(0.0,1.0,1.0);
    vec3 color = 0.5*colorBase+(1.0-0.5)*colorRed;
    
    fragColor=vec4(color,1.);
}