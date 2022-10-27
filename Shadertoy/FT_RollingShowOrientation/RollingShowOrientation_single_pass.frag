#iChannel0"file://asset/img11.jpg"
#iChannel1"file://frame.png"

const float durationTime=3.;

const float pi=3.141592653;
const float splitTheta=-.2*pi;//切分角度
const float speed=1.;//滑动速度

//二维平移矩阵：平移向量 t
mat3 translate2DMatrix(vec2 t){
    return mat3(1.,0.,0.,0.,1.,0.,t.x,t.y,1);
}

//二维基准点旋转矩阵：基准点 pivotPt，旋转角度 theta
mat3 rotate2DMatrix(vec2 pivotPt,float theta){
    float c=cos(theta);
    float s=sin(theta);
    return mat3(c,s,0.,-s,c,0.,pivotPt.x*(1.-c)+pivotPt.y*s,pivotPt.y*(1.-c)-pivotPt.x*s,1.);
}

//二维基准点缩放矩阵：基准点 fixedPt，缩放系数 s
mat3 scale2DMatrix(vec2 fixedPt,vec2 s){
    return mat3(s.x,0.,0.,0.,s.y,0.,fixedPt.x*(1.-s.x),fixedPt.y*(1.-s.y),1.);
}

//定向分屏滚动-一次 pass
void mainImage(out vec4 fragColor,in vec2 fragCoord)
{
    float progress=fract(iTime/durationTime);
    float time=progress;
    // time=1.;
    
    // float splitTheta= 1. *time*2.0*pi;
    float splitThetaModulated=mod(splitTheta,2.*pi);
    float splitThetaNormalModulated=mod(splitThetaModulated+.5*pi,2.*pi);//垂直切分角度
    vec2 direction=vec2(cos(splitThetaModulated),sin(splitThetaModulated));//切分方向
    vec2 directionNormal=vec2(cos(splitThetaNormalModulated),sin(splitThetaNormalModulated));//垂直切分方向
    float len=max(abs(cross(vec3(-.5,.5,0.)*iResolution.xyz,vec3(direction,0.)).z),abs(cross(vec3(.5,.5,0.)*iResolution.xyz,vec3(direction,0.)).z));//垂直切分线合并长度。将整个视口（垂直切分向高度）分为三部分，高度分别为 0.5*len, len, 0.5*len
    vec2 splitPoint_1=vec2(.5)*iResolution.xy-.5*len*directionNormal;//均分点1
    vec2 splitPoint_2=vec2(.5)*iResolution.xy+.5*len*directionNormal;//均分点2
    
    vec2 scalingRatio;
    vec2 fragCoord_changed;
    
    if(cross(vec3(fragCoord-splitPoint_1,0.),vec3(direction,0.)).z>0.&&cross(vec3(fragCoord-splitPoint_2,0.),vec3(direction,0.)).z>0.){
        //两侧
        scalingRatio=iResolution.xy/(.5*len);
        fragCoord+=time*speed*direction*len;
        //二维坐标变换
        fragCoord_changed=(scale2DMatrix(vec2(.5)*iResolution.xy,scalingRatio)*rotate2DMatrix(vec2(.5)*iResolution.xy,-splitThetaModulated)*translate2DMatrix(-.75*len*directionNormal)*vec3(fragCoord,1.)).xy;
    }else if(cross(vec3(fragCoord-splitPoint_1,0.),vec3(direction,0.)).z<0.&&cross(vec3(fragCoord-splitPoint_2,0.),vec3(direction,0.)).z<0.){
        //两侧
        scalingRatio=iResolution.xy/(.5*len);
        fragCoord+=time*speed*direction*len;
        //二维坐标变换
        fragCoord_changed=(scale2DMatrix(vec2(.5)*iResolution.xy,scalingRatio)*rotate2DMatrix(vec2(.5)*iResolution.xy,-splitThetaModulated)*translate2DMatrix(.75*len*directionNormal)*vec3(fragCoord,1.)).xy;
    }else{
        //中间
        scalingRatio=iResolution.xy/len;
        fragCoord-=time*speed*direction*len;
        //二维坐标变换
        fragCoord_changed=(scale2DMatrix(vec2(.5)*iResolution.xy,scalingRatio)*rotate2DMatrix(vec2(.5)*iResolution.xy,-splitThetaModulated)*vec3(fragCoord,1.)).xy;
    }
    
    vec4 colorBase=texture2D(iChannel0,fragCoord_changed/iResolution.xy);
    fragCoord_changed=vec2(fragCoord_changed.y,iResolution.x-fragCoord_changed.x);
    vec4 colorFrame=texture2D(iChannel1,fragCoord_changed/iResolution.yx);
    vec3 color=mix(colorBase.rgb,colorFrame.rgb,colorFrame.a);
    fragColor=vec4(color,1.);
}