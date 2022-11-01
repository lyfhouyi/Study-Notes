#iChannel0"file://asset/img4.jpg"
#iChannel1"file://asset/img5.jpg"

const float durationTime=6.;//特效时长
const uint UP=0x00000001u;//向上拉出
const uint DOWN=0x00000002u;//向下拉出
const uint LEFT=0x00000003u;//向左拉出
const uint RIGHT=0x00000004u;//向右拉出
const uint mode=RIGHT;

//拉出-一次 pass
void mainImage(out vec4 fragColor,in vec2 fragCoord)
{
    vec2 uv=fragCoord/iResolution.xy;
    float progress=fract(iTime/durationTime);
    float time=progress;
    
    vec3 color;
    if(time<.5){
        //贴图当前页
        if(mode==UP){
            uv.y*=(1.-time);
        }else if(mode==DOWN){
            uv.y=1.-(1.-uv.y)*(1.-time);
        }else if(mode==LEFT){
            uv.x=1.-(1.-uv.x)*(1.-time);
        }else if(mode==RIGHT){
            uv.x*=(1.-time);
        }
        color=texture2D(iChannel0,uv).rgb;
    }else{
        //贴图下一页
        if(mode==UP){
            uv.y=1.-(1.-uv.y)*time;
            uv.y+=.1*(2.-2.*time);//预留黑边
        }else if(mode==DOWN){
            uv.y=uv.y*time;
            uv.y-=.1*(2.-2.*time);//预留黑边
        }else if(mode==LEFT){
            uv.x=uv.x*time;
            uv.x-=.1*(2.-2.*time);//预留黑边
        }else if(mode==RIGHT){
            uv.x=1.-(1.-uv.x)*time;
            uv.x+=.1*(2.-2.*time);//预留黑边
        }
        color=texture2D(iChannel1,uv).rgb;
        if(any(lessThanEqual(uv,vec2(0.)))||any(greaterThanEqual(uv,vec2(1.)))){
            //贴图黑边
            color=vec3(0.);
        }
    }
    
    fragColor=vec4(color,1.);
}
