#iChannel0"file://asset/img16.jpg"

const float durationTime=2.;

//二维基准点缩放矩阵：基准点 fixedPt，缩放系数 s
mat3 scale2DMatrix(vec2 fixedPt,vec2 s){
    return mat3(s.x,0.,0.,0.,s.y,0.,fixedPt.x*(1.-s.x),fixedPt.y*(1.-s.y),1.);
}

//灵魂出窍-一次 pass
void mainImage(out vec4 fragColor,in vec2 fragCoord)
{
    vec2 uv=fragCoord/iResolution.xy;
    float progress=fract(iTime/durationTime);
    float time=progress;
    
    float scalingRatio=1.-.3*time;
    vec2 uv_changed=(scale2DMatrix(vec2(.5),vec2(scalingRatio))*vec3(uv,1.)).xy;
    vec3 colorSoul=texture2D(iChannel0,uv_changed).rgb;
    
    vec3 colorBase=texture2D(iChannel0,uv).rgb;
    float mixRatio=.4+.6*time;
    vec3 color=mix(colorSoul,colorBase,mixRatio);
    fragColor=vec4(color,1.);
}