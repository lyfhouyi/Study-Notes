#iChannel0"file://asset/img9.jpg"

const float radius = 0.05;
const float durationTime =3.0;



//返回 0 - 1 之间的随机数
float random(vec2 st){
    return fract(sin(dot(st,vec2(12.9898,78.233)))*43758.5453123);
}

//返回 0 - 1 之间的随机向量
vec2 random2f(vec2 st){
    float randomF = random(st);
    return vec2(random(st+randomF),random(st-randomF));
}

//粒子模糊-一次 pass
void mainImage(out vec4 fragColor,in vec2 fragCoord)
{
    vec2 uv=fragCoord/iResolution.xy;
    float progress=fract(iTime/durationTime);
    float time = 1.0-progress;
    time =0.5;

    vec2 uvRandom = uv+radius*(2.0*random2f(uv)-1.0)*time;
    
    fragColor=texture2D(iChannel0,uvRandom);
}