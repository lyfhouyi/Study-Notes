#iChannel0"file://asset/img15.jpg"
#iChannel1"file://BackgroundBlur_pass_2.frag"

//计算亮度
float calcLuma(vec3 color){
    return dot(vec3(.213,.715,.072),color);
}

//背景模糊-第三次 pass，贴图前景
void mainImage(out vec4 fragColor,in vec2 fragCoord)
{
    vec2 diffResolution=iResolution.xy-iChannelResolution[0].xy;
    vec2 foregroundCoord=fragCoord-.5*diffResolution;
    vec2 foregroundUv=foregroundCoord/iChannelResolution[0].xy;
    vec2 backgroundUv=fragCoord/iResolution.xy;
    
    vec3 color=vec3(1.);
    vec3 colorForeground=texture2D(iChannel0,foregroundUv).rgb;
    vec3 colorBackground=texture2D(iChannel1,backgroundUv).rgb;
    if(all(greaterThan(foregroundUv,vec2(0.)))&&all(lessThan(foregroundUv,vec2(1.)))){
        color=colorForeground;
    }else{
        float luma=calcLuma(colorBackground);
        color=vec3(luma);
    }
    
    fragColor=vec4(color,1.);
}