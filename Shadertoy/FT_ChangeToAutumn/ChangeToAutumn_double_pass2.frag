#iChannel0"file://ChangeToAutumn_green_cutout.frag"
#iChannel1"file://asset/img2.jpg"
#iChannel2"file://RandomTexture.jpg"

const vec3 rgbRatio=vec3(1.5608,.7608,.7608);//色彩调节参数
const float durationTime=2.;

float random(vec2 st){
    return fract(sin(dot(st,vec2(12.9898,78.233)))*43758.5453123);
}


//树叶变黄
void mainImage(out vec4 fragColor,in vec2 fragCoord)
{
    vec2 uv=fragCoord/iResolution.xy;
    float time = sin(iTime/durationTime)+1.0;
    
    //树叶变黄
    vec4 colorBase=texture2D(iChannel1,uv);
    vec4 colorGreen=texture2D(iChannel0,uv);

    colorGreen.rgb= clamp(colorGreen.rgb*rgbRatio,vec3(0.0),vec3(1.0));
    vec4 colorAutumn=mix(colorBase,colorGreen,colorGreen.a);
    float mixRatio = smoothstep(0.7*time,1.0*time,texture2D(iChannel2,uv).r);
    fragColor= mix(colorAutumn,colorBase,mixRatio);
}