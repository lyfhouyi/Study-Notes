#iChannel0"file://asset/img4.jpg"
#iChannel1"file://asset/img5.jpg"

const float durationTime=3.;//特效时长
const vec2 slipDirection=normalize(vec2(-1.,-1.));//滑动方向
const float sSlip=1.3;//滑动距离

//缓动曲线
float easeOutBounce(float x){
    float n1=7.625;
    float d1=1./2.75;
    
    if(x<d1){
        return 1.-n1*x*x;
    }else if(x<2.*d1){
        x-=1.5*d1;
        return.25-n1*x*x;
    }else if(x<2.5*d1){
        x-=2.25*d1;
        return.0625-n1*x*x;
    }else{
        x-=2.625*d1;
        return.015625-n1*x*x;
    }
}

//滑入-一次 pass
void mainImage(out vec4 fragColor,in vec2 fragCoord)
{
    vec2 uv=fragCoord/iResolution.xy;
    float progress=fract(iTime/durationTime);
    
    vec2 uvSliped=uv+slipDirection*sSlip*easeOutBounce(progress);
    vec3 color;
    
    vec2 x=smoothstep(vec2(0.),vec2(.1),uvSliped);
    
    //贴图当前页及阴影
    float thickness=.01;//阴影范围
    float ratio1=min(smoothstep(-thickness,0.,uvSliped.x),smoothstep(-thickness,0.,uvSliped.y));
    float ratio2=min(1.-smoothstep(1.,1.+thickness,uvSliped.x),1.-smoothstep(1.,1.+thickness,uvSliped.y));
    float ratio=min(ratio1,ratio2);
    ratio*=.3;//阴影浓度
    color=mix(texture2D(iChannel0,uv).rgb,texture2D(iChannel1,uvSliped).rgb,ratio);
    color=mix(texture2D(iChannel0,uv).rgb,vec3(0.),ratio);
    
    //贴图下一页
    ratio1=min(step(0.,uvSliped.x),step(0.,uvSliped.y));
    ratio2=min(1.-step(1.,uvSliped.x),1.-step(1.,uvSliped.y));
    ratio=min(ratio1,ratio2);
    color=mix(color,texture2D(iChannel1,uvSliped).rgb,ratio);
    
    fragColor=vec4(color,1.);
}
