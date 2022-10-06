#iChannel0"file://asset/img11.jpg"

const float durationTime=5.;
const float pi=3.141592653;
const vec2 explosionCenter=vec2(.3,.7);//爆炸中心
const float radiusInner=.1;//爆炸内圈半径
const float radiusOuter=1.3;//爆炸外圈半径
const float anglePhase=mod(explosionCenter.y/explosionCenter.x*pi*1.234,2.*pi);//爆炸辐条相位

//计算两向量的夹角（从向量 A 逆时针转到向量 B）：向量 A vecA，向量 B vecB
//返回值范围：[0,2*pi)
float calcAngle(vec2 vecA,vec2 vecB){
    vecA=normalize(vecA);
    vecB=normalize(vecB);
    float cosTheta=dot(vecA,vecB);
    float sinTheta=cross(vec3(vecA,0.),vec3(vecB,0.)).z;
    float theta=acos(cosTheta);
    return sinTheta>=0.?theta:2.*pi-theta;
}

//局部爆炸-一次 pass
void mainImage(out vec4 fragColor,in vec2 fragCoord)
{
    vec2 uv=fragCoord/iResolution.xy;
    float progress=fract(iTime/durationTime);
    float time=progress;
    
    vec3 color=texture2D(iChannel0,uv).rgb;
    
    //贴图爆炸辐条
    vec2 vecCenter=uv-explosionCenter;
    vecCenter.x=(vecCenter.x/iResolution.y)*iResolution.x;
    float disCenter=length(vecCenter);
    if(disCenter<radiusOuter*time&&disCenter>radiusInner){
        float angle=calcAngle(vec2(1.,0.),vecCenter)+anglePhase;
        if(mod(angle,.25*pi)<.05*pi){
            color=mix(color,vec3(0.,0.,.0),.9);
        }
    }
    
    fragColor=vec4(color,1.);
}