#iChannel0"file://asset/test_raw.png"
#iChannel1"file://asset/test_depth.png"

const float durationTime=6.;
const float pi=3.141592653;
const float golden_angle=(3.-sqrt(5.))*pi;
const mat2 rotateMatrix=mat2(cos(golden_angle),sin(golden_angle),-sin(golden_angle),cos(golden_angle));
const float sampleCnt=250.;//采样次数

//相机参数，用于计算弥散圆 CoC
const float A_apertureDiameter=1.4;//光圈mm
const float F_focalLength=15.;//焦距mm
const float P_focusDistance=50.;//聚焦位置cm
const float MaxBgdCoC=(A_apertureDiameter*F_focalLength)/(P_focusDistance-F_focalLength);

//深度参数，用于计算原图中物体的深度
const float depthMaskRange=30.;//深度图物距范围cm
const float depthMaskMedian=50.;//深度图物距中值cm

//景深参数，深度在 DoF_Near 与 DoF_Far 之间的物体不产生景深效果
const float DoF_Near=35.;//景深近平面
const float DoF_Far=55.;//景深远平面
const float transitionalRangeNear=2.;//景深近平面过渡带宽
const float transitionalRangeFar=2.;//景深远平面过渡带宽

const float ratio=2.5;// CoC 缩放因子

//计算亮度
float calcLuma(vec3 color){
    return dot(vec3(.213,.715,.072),color);
}

//计算物距cm
float calcObjectDistance(vec2 uv){
    float depthMask=calcLuma(texture2D(iChannel1,uv).rgb);
    return depthMaskMedian+.5*depthMaskRange-depthMask*depthMaskRange;
}

//计算 CoC
float calcCoC(float d_objectDistance){
    return abs(MaxBgdCoC*(1.-P_focusDistance/d_objectDistance));
}

//散景模糊-一次 pass
void mainImage(out vec4 fragColor,in vec2 fragCoord)
{
    vec2 uv=fragCoord/iResolution.xy;
    float progress=fract(iTime/durationTime);
    float time=progress;
    time=1.;
    vec3 colorBase=texture2D(iChannel0,uv).rgb;
    vec3 colorDoF=vec3(0.);
    vec3 colorDivisor=vec3(0.);
    float curObjectDistance=calcObjectDistance(uv);//当前像素点到镜头距离cm
    float curCoC=calcCoC(curObjectDistance);
    float r=1.;
    vec2 theta=vec2(0.,time*ratio*curCoC*.01/sqrt(sampleCnt));
    for(float i=0.;i<sampleCnt;i++){
        r+=1./r;
        theta=rotateMatrix*theta;
        vec2 st=uv+(r-1.)*theta;
        vec3 colorSt=texture2D(iChannel0,st).rgb;
        colorDoF+=colorSt*colorSt;
        colorDivisor+=colorSt;
    }
    colorDoF/=colorDivisor;
    // colorDoF=vec3(1.0,0.0,0.0);
    
    float mixRatio=smoothstep(DoF_Near,DoF_Near+transitionalRangeNear,curObjectDistance)-smoothstep(DoF_Far-transitionalRangeFar,DoF_Far,curObjectDistance);
    vec3 color=mix(colorDoF,colorBase,mixRatio);
    
    fragColor=vec4(color,1.);
}