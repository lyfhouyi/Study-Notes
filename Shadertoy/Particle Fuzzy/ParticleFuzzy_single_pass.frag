#iChannel0"file://img.jpg"

const float radius = 0.01;
const float durationTime =6.0;



//返回 0 - 1 之间的随机数
float random(vec2 st){
    return fract(sin(dot(st,vec2(12.9898,78.233)))*43758.5453123);
}

//返回 0 - 1 之间的随机向量
vec2 random2f(vec2 st){
    float randomF = random(st);
    return vec2()
}

//粒子模糊-一次 pass
void mainImage(out vec4 fragColor,in vec2 fragCoord)
{
    vec2 uv=fragCoord/iResolution.xy;
    float progress=fract(iTime/durationTime);
    float time;

    vec2 uvRandom = uv+radius*(2.0*random(uv)-1.0);
    
    vec4 colorBase=texture2D(iChannel0,uvRandom);
    
    float mixRatio=sin(.5*iTime);
    fragColor=colorBase;
}