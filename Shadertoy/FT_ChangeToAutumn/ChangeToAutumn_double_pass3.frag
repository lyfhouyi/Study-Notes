#iChannel0"file://ChangeToAutumn_green_cutout.frag"
#iChannel1"file://asset/img2.jpg"
#iChannel2"file://RandomTexture.jpg"

const vec3 rgbRatio=vec3(1.98,.58,.58);//色彩调节参数
const float durationTime=2.;

vec3 maxInRGB(vec3 color){
    float maxValue =max(max(color.r,color.g),color.b);
    return vec3(maxValue);
}

vec3 minInRGB(vec3 color){
    float minValue =min(min(color.r,color.g),color.b);
    return vec3(minValue);
}

float calcSaturability(vec3 color){
    float maxValue = maxInRGB(color).x;
    float minValue = minInRGB(color).x;
    return (maxValue-minValue)/maxValue;
}


//树叶变黄
void mainImage(out vec4 fragColor,in vec2 fragCoord)
{
    vec2 uv=fragCoord/iResolution.xy;
    float time = sin(iTime/durationTime)+1.0;
    
    //树叶变黄
    vec4 colorBase=texture2D(iChannel1,uv);
    vec4 colorGreen=texture2D(iChannel0,uv);

    if(abs(maxInRGB(colorBase.rgb).x - colorBase.g)<0.1){
        float saturability  = calcSaturability (colorBase.rgb);
        float ratio = smoothstep(0.0,1.0,saturability);
        vec3 xx = mix(vec3(1.0),rgbRatio,saturability);
        colorBase.rgb *=xx;
    }

    // float saturability  = calcSaturability (colorBase.rgb);
    // float ratio = smoothstep(0.0,1.0,saturability);
    // vec3 xx = mix(vec3(1.0),rgbRatio,saturability);
    // colorBase.rgb *=xx;

    fragColor=colorBase;
    // fragColor=colorGreen;


    // colorGreen.rgb= clamp(colorGreen.rgb*rgbRatio,vec3(0.0),vec3(1.0));
    // vec4 colorAutumn=mix(colorBase,colorGreen,colorGreen.a);
    // float mixRatio = smoothstep(0.7*time,1.0*time,texture2D(iChannel2,uv).r);
    // fragColor= mix(colorAutumn,colorBase,mixRatio);
}