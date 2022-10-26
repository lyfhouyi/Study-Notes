#iChannel0"file://asset/img11.jpg"

const float durationTime=6.;
const float pi=3.141592653;
const float splitTheta=0.2*pi;//切分角度
const float speed=1.;//滑动速度

//二维旋转矩阵
mat2 rotateMatrix(float theta){
    float s=sin(theta);
    float c=cos(theta);
    return mat2(c,-s,s,c);
}

//分屏滚动-一次 pass
void mainImage(out vec4 fragColor,in vec2 fragCoord)
{
    vec2 uv=fragCoord/iResolution.xy;
    // uv.x=(uv.x/iResolution.y)*iResolution.x;
    float progress=fract(iTime/durationTime);
    float time=progress;
    // time=1.;
    
    // float splitTheta= 1. *time*2.0*pi;
    float splitThetaModulated=mod(splitTheta,2.*pi);
    float splitThetaNormalModulated=mod(splitThetaModulated+.5*pi,2.*pi);//垂直切分角度
    vec2 direction=vec2(cos(splitTheta),sin(splitTheta));//切分方向
    vec2 directionNormal=vec2(cos(splitThetaNormalModulated),sin(splitThetaNormalModulated));//垂直切分方向
    float len=max(abs(cross(vec3(vec2(.0,1.)-vec2(.5),0.),vec3(direction,0.)).z),abs(cross(vec3(vec2(1.,1.)-vec2(.5),0.),vec3(direction,0.)).z));//垂直切分线合并长度。将整个视口分为三部分，高度分别为 0.5*len, len, 0.5*len
    vec2 splitPoint_1=vec2(.5)-.5*len*directionNormal;//均分点1
    vec2 splitPoint_2=vec2(.5)+.5*len*directionNormal;//均分点2
    
    vec3 color=vec3(0.);
    vec2 curCenter;
    float scalingRatio;
    vec2 uv_rotated;
    

    if(cross(vec3(uv-splitPoint_1,0.),vec3(direction,0.)).z>0.&&cross(vec3(uv-splitPoint_2,0.),vec3(direction,0.)).z>0.){
        //两侧
        uv.x=(uv.x/iResolution.y)*iResolution.x;
        scalingRatio=1./(0.5*len);
        curCenter=uv-vec2(.5)-0.75*len*directionNormal;
        // curCenter=uv-vec2(.5)+time*speed*len*direction;
        uv_rotated=mat2(scalingRatio,0.,0.,scalingRatio)*rotateMatrix(splitTheta)*curCenter+vec2(.5)+.75*len*directionNormal;
        // color=texture2D(iChannel0,uv_rotated).rgb;
    }else if(cross(vec3(uv-splitPoint_1,0.),vec3(direction,0.)).z<0.&&cross(vec3(uv-splitPoint_2,0.),vec3(direction,0.)).z<0.){
        //两侧
        uv.x=(uv.x/iResolution.y)*iResolution.x;
        scalingRatio=1./(0.5*len);
        curCenter=uv-vec2(.5);
        // curCenter=uv-vec2(.5)+time*speed*len*direction;
        uv_rotated=mat2(scalingRatio,0.,0.,scalingRatio)*rotateMatrix(splitTheta)*curCenter+vec2(.5)-1.*len*directionNormal;
        // color=texture2D(iChannel0,uv_rotated).rgb;
    }else{
        //中间
        // uv.x=(uv.x/iResolution.y)*iResolution.x;
        scalingRatio=1./(len);
        curCenter=uv-vec2(.5)+time*speed*len*direction;
        uv_rotated=mat2(scalingRatio,0.,0.,scalingRatio)*rotateMatrix(splitTheta)*curCenter+vec2(.5);
        color=texture2D(iChannel0,uv_rotated).rgb;
    }
    
    fragColor=vec4(color,1.);
}