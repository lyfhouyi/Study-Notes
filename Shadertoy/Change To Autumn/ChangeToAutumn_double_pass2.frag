#iChannel0"file://ChangeToAutumn_green_cutout.frag"
#iChannel1"file://img3.jpg"
#iChannel2"file://Radom Texture.jpg"

const vec3 rgbRatio=vec3(1.5608,.7608,.7608);//色彩调节参数
const float durationTime=2.;

//树叶变黄特效
void mainImage(out vec4 fragColor,in vec2 fragCoord)
{
    vec2 uv=fragCoord/iResolution.xy;
    
    //树叶变黄
    vec4 colorBase=texture2D(iChannel1,uv);
    vec4 colorGreen=texture2D(iChannel0,uv);
    colorGreen.rgb*=rgbRatio;
    vec4 colorAutumn=mix(colorBase,colorGreen,colorGreen.a);
    
    if(texture2D(iChannel2,uv).r<mod(iTime,durationTime)/durationTime){
        fragColor=colorAutumn;
    }else{
        fragColor=colorBase;
    }
}