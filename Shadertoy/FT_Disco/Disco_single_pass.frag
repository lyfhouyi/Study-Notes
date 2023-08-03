#iChannel0"file://asset/img11.jpg"

const float speed=0.5;//闪烁速度
const float fps=30.;//帧率
const float pi=3.141592653;

//蹦迪光-一次 pass
void mainImage(out vec4 fragColor,in vec2 fragCoord)
{
    vec2 uv=fragCoord/iResolution.xy;
    float frameNo=floor(mod(iTime*fps,50.))+1.;
    int frameNo_int = int(frameNo);
    float t = abs(sin(2.0*pi*(0.25*speed)*frameNo));
    float ratio = mix(0.0,0.13,t);
    vec4 colorBase=texture2D(iChannel0,uv);
    vec3 colorOverlay = vec3(1.0);

    vec3 color = mix(colorBase.rgb,colorOverlay,ratio);

    fragColor=vec4(color,1.);
}