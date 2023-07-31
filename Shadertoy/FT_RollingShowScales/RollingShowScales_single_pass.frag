#iChannel0"file://asset/img11.jpg"
#iChannel1"file://frame.png"

const uint VERTICAL=0x00000001u;//垂直滚动
const uint HORIZONTAL=0x00000002u;//水平滚动
const uint mode=VERTICAL;
// const uint mode=HORIZONTAL;
const float durationTime=3.;
const float speed=3.;//滑动速度

//二维缩放矩阵
mat2 scaleMatrix(float scale){
    return mat2(scale,0,0,scale);
}

//定向分屏滚动-一次 pass
void mainImage(out vec4 fragColor,in vec2 fragCoord)
{
    vec2 uv=fragCoord/iResolution.xy;
    float progress=fract(iTime/durationTime);
    float time=progress;
    
    float scalingRatio;//缩放比例
    if(time<.25){
        scalingRatio=4.*time+1.;
    }else if(time<.75){
        scalingRatio=4.*.25+1.;
    }else{
        scalingRatio=-4.*time+5.;
    }
    float midR=.5/scalingRatio;//中间半宽
    vec2 direction;//切分方向
    if(mode==VERTICAL){
        direction=vec2(0.,1.);
    }else if(mode==HORIZONTAL){
        direction=vec2(1.,0.);
    }
    
    vec2 directionNormal=vec2(-direction.y,direction.x);//垂直切分方向
    vec2 midEdge_1=vec2(.5)-midR*directionNormal;//中间边界
    vec2 midEdge_2=vec2(.5)+midR*directionNormal;//中间边界
    
    vec2 splitPoint_1=vec2(.5)-(1./scalingRatio)*directionNormal;//均分点1
    vec2 splitPoint_2=vec2(.5)+(1./scalingRatio)*directionNormal;//均分点2
    
    vec2 midEdgeCenter;
    if(time<.1){
        midEdgeCenter=vec2(.5,1.);
    }else if(time<.6){
        midEdgeCenter=vec2(.5,1.-(time-.1));
    }else{
        midEdgeCenter=vec2(.5,.5);
    }
    
    if(mode==HORIZONTAL){
        midEdgeCenter=midEdgeCenter.yx;
    }
    
    vec2 st;
    if(cross(vec3(uv-midEdge_1,0.),vec3(direction,0.)).z>0.&&cross(vec3(uv-midEdge_2,0.),vec3(direction,0.)).z>0.){
        //两侧
        st=scaleMatrix(scalingRatio)*(uv-vec2(.5))+vec2(.5)-time*speed*direction;
    }else if(cross(vec3(uv-midEdge_1,0.),vec3(direction,0.)).z<0.&&cross(vec3(uv-midEdge_2,0.),vec3(direction,0.)).z<0.){
        //两侧
        st=scaleMatrix(scalingRatio)*(uv-vec2(.5))+vec2(.5)+time*speed*direction;
    }else{
        //中间
        st=scaleMatrix(scalingRatio)*(uv-midEdgeCenter)+midEdgeCenter;
    }
    
    vec4 colorBase=texture2D(iChannel0,st);
    if(mode==HORIZONTAL){
        st=vec2(st.y,1.-st.x);
    }
    vec4 colorFrame=texture2D(iChannel1,st);
    vec3 color=mix(colorBase.rgb,colorFrame.rgb,colorFrame.a);
    fragColor=vec4(color,1.);
}