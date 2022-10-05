#iChannel0"file://asset/img8.jpg"
#iChannel1"file://asset/img0.jpg"

const float durationTime=5.;
const float pi=3.141592653;
const float splitTheta=.6*pi;//切分角度
const float speed=2.;//滑动速度

//切分转场-一次 pass
void mainImage(out vec4 fragColor,in vec2 fragCoord)
{
    vec2 uv=fragCoord/iResolution.xy;
    float progress=fract(iTime/durationTime);
    float time=progress;
    // time = 1.;
    vec2 direction=vec2(cos(splitTheta),sin(splitTheta));
    
    float splitThetaModulated=mod(splitTheta,.5*pi);
    splitThetaModulated=min(splitThetaModulated,.5*pi-splitThetaModulated);
    float len=speed*1./cos(splitThetaModulated);//切分线长度
    
    //计算纹理坐标
    vec2 stCur;//当前页
    vec2 stNext;//下一页
    if(cross(vec3(uv-vec2(.5),0.),vec3(direction,0.)).z>0.){
        //方向右侧
        stCur=uv+len*time*direction;
        stNext=uv+len*(time-1.)*direction;
    }else{
        //方向左侧
        stCur=uv-len*time*direction;
        stNext=uv-len*(time-1.)*direction;
    }
    
    //调整纹理的填充方式-镜像填充
    stCur=abs(stCur);
    if(stCur.x>1.){
        stCur.x=2.-stCur.x;
    }
    if(stCur.y>1.){
        stCur.y=2.-stCur.y;
    }
    
    stNext=abs(stNext);
    if(stNext.x>1.){
        stNext.x=2.-stNext.x;
    }
    if(stNext.y>1.){
        stNext.y=2.-stNext.y;
    }
    
    vec3 color;
    if(time<.5){
        color=texture2D(iChannel0,stCur).rgb;
    }else{
        color=texture2D(iChannel1,stNext).rgb;
    }
    
    fragColor=vec4(color,1.);
}