#iChannel0"file://img3.jpg"
#iChannel1"file://background.jpg"

const float durationTime=6.;//特效时长
const float fps=30.;//帧率
const float pi=3.141592653;

//计算是否在椭圆内，椭圆心(0.5,0.5)，长轴 majorAxis，短轴 minorAxis
float Ellipse(vec2 uv,float majorAxis,float minorAxis){
    if(majorAxis<=0.||minorAxis<=0.){
        return 1.;
    }
    uv=uv-vec2(.5);
    float xDa=(uv.x*uv.x)/(majorAxis*majorAxis);
    float yDb=(uv.y*uv.y)/(minorAxis*minorAxis);
    return smoothstep(.6,1.,xDa+yDb);
}

float calcRatioOpen(vec2 uv,float frameNo){
    float r=frameNo/4.;
    float ratio1=Ellipse(uv,.9*r,.7*r);
    float ratio2=1.-clamp(2.*texture2D(iChannel1,uv).b,0.,1.);
    float mixRatio=smoothstep(.5*r,r,length(uv-.5));
    return mix(ratio1,ratio2,mixRatio);
}

float calcRatioClose(vec2 uv,float frameNo){
    float r=(11.-frameNo)/4.;
    float ratio1=Ellipse(uv,.5+.1*r,.9*r);
    return ratio1;
}

//计算纵向压缩后的坐标
vec3 squeeze(vec2 uv,float frameNo){
    float r=(frameNo-13.)/6.;
    float yRatio=abs(uv.y-.5)/.5;
    vec3 ret;
    ret.y=(uv.y-.5+.5*r)/r;
    ret.x=uv.x+.08*cos(45.*r*ret.y);
    ret.z=1.-smoothstep(.85,1.,yRatio/r);//调整清晰度
    return ret;
}

//计算区域显示后的坐标
vec3 area(vec2 uv,float frameNo){
    float r=(frameNo-13.)/6.;
    float yRatio=abs(uv.y-.5)/.5;
    vec3 ret=vec3(uv,1.);
    float frequency=55.*(uv.y-.5+.5*r);
    float amplification=.15*(1.-r*r);
    ret.x=uv.x+amplification*sin(frequency-.5*pi);
    ret.z=1.-smoothstep(.85,1.,yRatio/r);//调整清晰度
    return ret;
}

//生成横向条纹
float stripe(vec2 uv){
    float yRatio=.5*(cos(28.*2.*pi*uv.y)+1.);
    yRatio*=.1;//调整亮度
    return 1.-yRatio;
}

// RGB 分离
vec3 rgbSplit(vec2 uv,float offset){
    vec3 color;
    color.r=texture2D(iChannel0,uv-offset).r;
    color.g=texture2D(iChannel0,uv).g;
    color.b=texture2D(iChannel0,uv+offset).b;
    return color;
}

vec3 getColor(vec2 uv,bool split,bool offset){
    vec3 color;
    //偏移
    uv-=offset?.01:0.;
    //RGB分离
    color=split?rgbSplit(uv.xy,.004):texture2D(iChannel0,uv.xy).rgb;
    return color;
}

//电视开启特效
void mainImage(out vec4 fragColor,in vec2 fragCoord)
{
    vec2 uv=fragCoord/iResolution.xy;
    float frameNo=floor(mod(iTime*fps,50.))+1.;
    float ratio;
    bool split;
    bool offset;
    
    vec3 color=texture2D(iChannel0,uv).rgb;
    if(frameNo<=13.){
        //白色开场
        ratio=frameNo<=7.?calcRatioOpen(uv,frameNo):calcRatioClose(uv,frameNo);
        color=mix(vec3(1.),vec3(0.),ratio);
    }else if(frameNo<=18.){
        //上下挤压
        vec3 uvSqueezed=area(uv,frameNo);
        split=floor(mod(frameNo+7.,12.))<6.;
        color=split?rgbSplit(uvSqueezed.xy,.004):texture2D(iChannel0,uvSqueezed.xy).rgb;
        color=mix(vec3(0.),color,uvSqueezed.z);
    }else if(frameNo<=38.){
        //抖动
        split=floor(mod(frameNo+7.,12.))<6.;
        offset=floor(mod(frameNo,2.))==1.;
        float stripe=offset?stripe(uv):1.;
        color=mix(vec3(0.),getColor(uv,split,offset),stripe);
    }
    
    fragColor=vec4(color,1.);
}
