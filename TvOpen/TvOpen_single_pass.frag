#iChannel0"file://img.png"

const float durationTime=6.;//特效时长
//电视开启特效
void mainImage(out vec4 fragColor,in vec2 fragCoord)
{
    float time=fract(iTime/durationTime);//特效开始时长
    vec3 il = vec3(time);
    fragColor=vec4(il,1.0);break;
}