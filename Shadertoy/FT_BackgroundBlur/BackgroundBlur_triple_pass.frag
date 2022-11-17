#iChannel0"file://asset/img20.jpg"
#iChannel1"file://BackgroundBlur_pass_2.frag"

//背景模糊-第三次 pass，贴图前景
void mainImage(out vec4 fragColor,in vec2 fragCoord)
{
    vec2 textureResolution=iChannelResolution[0].xy;
    float iAspect=iResolution.x/iResolution.y;//画布宽高比
    float textureAspect=textureResolution.x/textureResolution.y;//纹理宽高比
    
    //根据宽高比调整纹理尺寸，使纹理充分填充画布
    if(textureAspect>iAspect){
        textureResolution.x=iResolution.x;
        textureResolution.y=textureResolution.x/textureAspect;
    }else{
        textureResolution.y=iResolution.y;
        textureResolution.x=textureResolution.y*textureAspect;
    }
    
    vec2 diffResolution=iResolution.xy-textureResolution;
    vec2 foregroundCoord=fragCoord-.5*diffResolution;
    vec2 foregroundUv=foregroundCoord/textureResolution;
    vec2 backgroundUv=fragCoord/iResolution.xy;
    
    vec3 color=vec3(1.);
    vec3 colorForeground=texture2D(iChannel0,foregroundUv).rgb;
    vec3 colorBackground=texture2D(iChannel1,backgroundUv).rgb;
    if(all(greaterThan(foregroundUv,vec2(0.)))&&all(lessThan(foregroundUv,vec2(1.)))){
        color=colorForeground;
    }else{
        color=colorBackground;
    }
    
    fragColor=vec4(color,1.);
}