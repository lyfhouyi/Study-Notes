#iChannel0"file://asset/img18.jpg"

const float pi=3.141592653;
const float golden_angle=(3.-sqrt(5.))*pi;
const mat2 rotateMatrix=mat2(cos(golden_angle),sin(golden_angle),-sin(golden_angle),cos(golden_angle));
const float CoC=.8;//弥散圆大小
const float sampleCnt=100.;//采样次数

//移轴摄影-第一次 pass，背景散景模糊
void mainImage(out vec4 fragColor,in vec2 fragCoord)
{
    vec2 uv=fragCoord/iResolution.xy;
    vec3 color=vec3(0.);
    vec3 colorDivisor=vec3(0.);
    float r=1.;
    vec2 theta=vec2(0.,CoC*.01/sqrt(sampleCnt));
    for(float i=0.;i<sampleCnt;i++){
        r+=1./r;
        theta=rotateMatrix*theta;
        vec2 st=uv+(r-1.)*theta;
        if(all(greaterThanEqual(st,vec2(0.)))&&all(lessThanEqual(st,vec2(1.)))){
            vec3 colorSt=texture2D(iChannel0,st).rgb;
            // colorSt=colorSt*colorSt*1.8;
            // vec3 bokeh=pow(colorSt,vec3(4.));
            // color+=colorSt*bokeh;
            // colorDivisor+=bokeh;
            color+=colorSt*colorSt;
            colorDivisor+=colorSt;
        }
    }
    color/=colorDivisor;
    fragColor=vec4(color,1.);
}