#iChannel0"file://img2.jpg"


//高斯模糊-一次 pass
void mainImage(out vec4 fragColor,in vec2 fragCoord)
{
    vec2 uv=fragCoord/iResolution.xy;
    
    
    vec4 colorBase=texture2D(iChannel0,uv);
    
    float mixRatio=sin(.5*iTime);
    fragColor=mix(colorBase,colorGaussian,abs(mixRatio));
}