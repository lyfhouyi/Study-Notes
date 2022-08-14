#iChannel0"file://PageFlip_pass_1.png"
// #iChannel0"file://img.jpg"

const float contrastThreshold=.3;
const float relativeThreshold=.3;

//计算亮度
float calcLuma(vec3 color){
    return dot(vec3(.213,.715,.072),color);
}

//FXAA Console 版本-一次 pass
void mainImage(out vec4 fragColor,in vec2 fragCoord)
{
    vec2 uv=fragCoord/iResolution.xy;
    vec2 texelSize=vec2(3.)/iResolution.xy;
    
    //计算周围四点亮度
    vec4 origin=texture2D(iChannel0,uv);
    float lumaM=calcLuma(origin.rgb);
    float lumaNW=calcLuma(texture2D(iChannel0,uv+vec2(-texelSize.x,texelSize.y)*.5).rgb);
    float lumaNE=calcLuma(texture2D(iChannel0,uv+vec2(texelSize.x,texelSize.y)*.5).rgb);
    float lumaSW=calcLuma(texture2D(iChannel0,uv+vec2(-texelSize.x,-texelSize.y)*.5).rgb);
    float lumaSE=calcLuma(texture2D(iChannel0,uv+vec2(texelSize.x,-texelSize.y)*.5).rgb);
    
    float maxLuma=max(max(lumaNW,lumaNE),max(lumaSW,lumaSE));
    float minLuma=min(min(lumaNW,lumaNE),min(lumaNW,lumaNE));
    float contrast=max(maxLuma,lumaM)-min(minLuma,lumaM);
    
    //当对比度较大时，认为处于边缘，需要进行抗锯齿处理
    if(contrast<max(contrastThreshold,maxLuma*relativeThreshold))
    {
        fragColor=origin;
    }else{
        lumaNE+=1./384.;
        //计算切线方向
        vec2 dir;
        dir.x=-((lumaNW+lumaNE)-(lumaSW+lumaSE));
        dir.y=((lumaNE+lumaSE)-(lumaNW+lumaSW));
        dir=normalize(dir);
        //混合
        //第一次采样
        vec2 stepLength1=dir*texelSize.xy*.5;
        vec4 color=mix(texture2D(iChannel0,uv-stepLength1),texture2D(iChannel0,uv+stepLength1),.5);
        
        //对接近水平或垂直的锯齿进行第二次采样
        float dirAbsMinTimesC=min(abs(stepLength1.x),abs(stepLength1.y))*8.;
        vec2 stepLength2=clamp(stepLength1.xy/dirAbsMinTimesC,-2.,2.)*2.;
        vec4 newColor=color*.5+(texture2D(iChannel0,uv-stepLength2*texelSize.xy)+texture2D(iChannel0,uv+stepLength2*texelSize.xy))*.25;
        // 如果新的结果，亮度在正确范围内，则使用新的结果
        float lumaColor2=calcLuma(newColor.rgb);
        if((lumaColor2>=minLuma)&&(lumaColor2<=maxLuma)){
            color=newColor;
        }
        fragColor=color;
        // fragColor=vec4(1.0,0.0,0.0,1.0);
    }
    // fragColor = origin;
}