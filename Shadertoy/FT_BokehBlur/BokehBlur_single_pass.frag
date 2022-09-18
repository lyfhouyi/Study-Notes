#iChannel0"file://asset/test_raw.png"

const float durationTime=6.;
const float pi=3.141592653;
const float golden_angle=(3.-sqrt(5.))*pi;
const mat2 rotateMatrix=mat2(cos(golden_angle),sin(golden_angle),-sin(golden_angle),cos(golden_angle));
const float CoC=1.6;//弥散圆大小
const float sampleCnt=500.;//采样次数

//散景模糊-一次 pass
void mainImage(out vec4 fragColor,in vec2 fragCoord)
{
    vec2 uv=fragCoord/iResolution.xy;
    float progress=fract(iTime/durationTime);
    float time=progress;
    time=1.;
    vec3 color=vec3(0.);
    vec3 colorDivisor=vec3(0.);
    float r=1.;
    vec2 theta=vec2(0.,time*CoC*.01/sqrt(sampleCnt));
    for(float i=0.;i<sampleCnt;i++){
        r+=1./r;
        theta=rotateMatrix*theta;
        vec2 st=uv+(r-1.)*theta;
        vec3 colorSt=texture2D(iChannel0,st).rgb;
        // colorSt=colorSt*colorSt*1.8;
        // vec3 bokeh=pow(colorSt,vec3(4.));
        // color+=colorSt*bokeh;
        // colorDivisor+=bokeh;
        color+=colorSt*colorSt;
        colorDivisor+=colorSt;
    }
    color/=colorDivisor;
    fragColor=vec4(color,1.);
}