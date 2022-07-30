#iChannel0"file://img3.jpg"

// RGB 颜色空间转换至 HSV 颜色空间
vec3 rgb2hsv(vec3 colorRGB){
    vec4 K=vec4(0.,-1./3.,2./3.,-1.);
    vec4 p=mix(vec4(colorRGB.bg,K.wz),vec4(colorRGB.gb,K.xy),step(colorRGB.b,colorRGB.g));
    vec4 q=mix(vec4(p.xyw,colorRGB.r),vec4(colorRGB.r,p.yzx),step(p.x,colorRGB.r));
    float d=q.x-min(q.w,q.y);
    float e=1.e-10;
    return vec3(abs(q.z+(q.w-q.y)/(6.*d+e)),d/(q.x+e),q.x);
}

//计算是否为绿色
float greenRatio(vec4 colorRaw){
    colorRaw*=255.;
    if(colorRaw.g>140.&&colorRaw.r<128.&&colorRaw.b<128.){
        return 1.;
    }
    return 0.;
}

//计算是否为绿色
float greenRatio2(vec4 colorRaw){
    float smoothValue=.05;
    float rbAverage=(colorRaw.r+colorRaw.b)*.8;
    float ret=1.;
    vec3 hsv=rgb2hsv(colorRaw.rgb);
    
    vec3 thresholdMin=vec3(.19444,.16862,.18039);
    vec3 thresholdMax=vec3(.42777888,1.,1.);
    
    int gs=0;
    if(all(greaterThan(hsv,thresholdMin))&&all(lessThan(hsv,thresholdMax))){
        gs=1;
    }else if(colorRaw.g>=rbAverage&&colorRaw.g>.6){
        gs=1;
    }
    
    if(gs==1){
        //判定为绿色
        rbAverage=(colorRaw.r+colorRaw.b)*.65;
        rbAverage=min(rbAverage,colorRaw.g);
        float gDelta=colorRaw.g-rbAverage;
        float ss=smoothstep(0.,smoothValue,gDelta);
        ret=1.-ss;
        ret=ret*ret*ret;
    }
    return 1.-ret;
}

//抠出绿色部分
void mainImage(out vec4 fragColor,in vec2 fragCoord)
{
    vec2 uv=fragCoord/iResolution.xy;
    vec4 colorBase=texture2D(iChannel0,uv);
    
    float greenRatio=greenRatio2(colorBase);
    fragColor=mix(vec4(0.),colorBase,greenRatio);
}