#iChannel0"file://asset/img22.jpg"
#iChannel1"file://frame_9_16.png"
#iChannel2"file://frame_16_9.png"

const float scale_init_short=0.925;//初始缩放比例_短边
const float scale_init_long=0.980;//初始缩放比例_长边


//二维缩放矩阵
mat2 scaleMatrix(float scaleX,float scaleY){
    return mat2(scaleX,0,0,scaleY);
}

//比例分屏滚动-第一次 pass，生成全边框视频帧（原始视频缩放）
void mainImage(out vec4 fragColor,in vec2 fragCoord)
{
    vec2 textureResolution=iChannelResolution[0].xy;
    vec2 uv=fragCoord/iResolution.xy;
    float scalingRatioX;
    float scalingRatioY;
    vec4 colorFrame;

    float mode_inner = (textureResolution.x>textureResolution.y)?0.:1.;
    if(mode_inner ==1.0){
        //竖直
        colorFrame=texture2D(iChannel1,uv);
        scalingRatioX = scale_init_short;
        scalingRatioY = scale_init_long;
    }
    if(mode_inner ==0.0){
        //水平
        colorFrame=texture2D(iChannel2,uv);
        scalingRatioX = scale_init_long;
        scalingRatioY = scale_init_short;
    }
    
    vec2 st;
    st=scaleMatrix(1.0/scalingRatioX,1.0/scalingRatioY)*(uv-vec2(.5))+vec2(.5);
    vec4 colorBase=texture2D(iChannel0,st);
    vec3 color=mix(colorBase.rgb,colorFrame.rgb,colorFrame.a);
    fragColor=vec4(color,1.);
}