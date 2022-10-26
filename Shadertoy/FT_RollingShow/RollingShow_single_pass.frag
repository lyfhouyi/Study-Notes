#iChannel0"file://asset/img11.jpg"
#iChannel1"file://frame.png"

const float durationTime=5.;
const uint VERTICAL=0x00000001u;//垂直滚动
const uint HORIZONTAL=0x00000002u;//水平滚动
const uint mode=VERTICAL;
// const uint mode=HORIZONTAL;
const float speed=1.;//滑动速度

//二维缩放矩阵
mat2 scaleMatrix(float scale){
    return mat2(scale,0,0,scale);
}

//分屏滚动-一次 pass
void mainImage(out vec4 fragColor,in vec2 fragCoord)
{
    vec2 uv=fragCoord/iResolution.xy;
    // uv.x=(uv.x/iResolution.y)*iResolution.x;
    float progress=fract(iTime/durationTime);
    float time=progress;
    // time=1.;
    
    vec2 direction;//切分方向
    if(mode==VERTICAL){
        direction=vec2(0.,1.);
    }else if(mode==HORIZONTAL){
        direction=vec2(1.,0.);
    }
    vec2 directionNormal=vec2(-direction.y,direction.x);//垂直切分方向
    
    vec2 splitPoint_1=vec2(.5)-.25*directionNormal;//均分点1
    vec2 splitPoint_2=vec2(.5)+.25*directionNormal;//均分点2
    
    float scalingRatio;
    vec2 st;
    if(cross(vec3(uv-splitPoint_1,0.),vec3(direction,0.)).z>0.&&cross(vec3(uv-splitPoint_2,0.),vec3(direction,0.)).z>0.){
        //两侧
        scalingRatio=4.;
        st=scaleMatrix(scalingRatio)*uv+vec2(.5)-time*speed*direction;
        st+=.5*directionNormal;
    }else if(cross(vec3(uv-splitPoint_1,0.),vec3(direction,0.)).z<0.&&cross(vec3(uv-splitPoint_2,0.),vec3(direction,0.)).z<0.){
        //两侧
        scalingRatio=4.;
        st=scaleMatrix(scalingRatio)*uv+vec2(.5)-time*speed*direction;
        st+=.5*directionNormal;
    }else{
        //中间
        scalingRatio=2.;
        st=scaleMatrix(scalingRatio)*uv+vec2(.5)+time*speed*direction;
    }
    
    vec4 colorBase=texture2D(iChannel0,st);
    if(mode==HORIZONTAL){
        st=vec2(st.y,1.-st.x);
    }
    vec4 colorFrame=texture2D(iChannel1,st);
    vec3 color=mix(colorBase.rgb,colorFrame.rgb,colorFrame.a);
    fragColor=vec4(color,1.);
}