#iChannel0"file://asset/img14.jpg"

const float shutterDelay = 120.0;//快门延迟

//电子卷帘快门-一次 pass
void mainImage(out vec4 fragColor,in vec2 fragCoord)
{
    vec2 uv=fragCoord/iResolution.xy;
    float offsetTexel=shutterDelay/iResolution.x;
    vec2 st = vec2(uv.x+(1.0-uv.y)*offsetTexel,uv.y);
    vec3 color = texture2D(iChannel0,st).rgb;
    if(any(lessThan(st,vec2(0.)))||any(greaterThan(st,vec2(1.)))){
        color=vec3(0.);
    }
    fragColor = vec4(color,1.0);
}