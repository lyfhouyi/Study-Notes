// #iChannel0"file://asset/img18.jpg"
#iChannel0"file://tmp/img001/IMG_0402.PNG"
#iChannel1"file://tmp/img001/shadertoy.png"

//背景模糊-第三次 pass，贴图前景
void mainImage(out vec4 fragColor,in vec2 fragCoord)
{
    vec2 uv=fragCoord/iResolution.xy;
    vec3 color;
    vec2 st=uv;
    st.x=st.x*2.;
    if(uv.x<.5){
        color=texture2D(iChannel0,st).rgb;
    }else{
        color=texture2D(iChannel1,st).rgb;
    }
    
    fragColor=vec4(color,1.);
}