#iChannel0"file://asset/img22.jpg"

const float scale_init_short=0.925;//初始缩放比例_短边
const float scale_init_long=0.980;//初始缩放比例_长边


//比例分屏滚动-第二次 pass，生成单边框视频帧（边框直接覆盖）
void mainImage(out vec4 fragColor,in vec2 fragCoord)
{
    vec2 textureResolution=iChannelResolution[0].xy;
    vec2 uv=fragCoord/iResolution.xy;
    vec4 colorBase=texture2D(iChannel0,uv);
    vec4 colorFrame;

    float mixRatioBaseFrame=0.0;
    float edge = 1.0*(1.0-scale_init_long);
    float mode_inner = (textureResolution.x>textureResolution.y)?0.:1.;

    vec3 color=colorBase.rgb;
    if(mode_inner ==1.0 && 1.0-uv.y<edge){
        color=vec3(0.0);
    }
    if(mode_inner ==0.0 && 1.0-uv.x<edge){
        color=vec3(0.0);
    }
    fragColor=vec4(color,1.);
}