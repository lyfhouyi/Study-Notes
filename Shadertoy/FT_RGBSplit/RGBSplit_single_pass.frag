#iChannel0"file://asset/img4.jpg"

const float splitRatio=.03;//分离程度

// RGB 分离-一次 pass
void mainImage(out vec4 fragColor,in vec2 fragCoord)
{
    vec2 uv=fragCoord/iResolution.xy;
    float distanceBase=length(uv-vec2(.5));
    vec2 directionBase=normalize(uv-vec2(.5));
    
    float distanceR=distanceBase+splitRatio*sin(10.);
    float distanceG=distanceBase;
    float distanceB=distanceBase-splitRatio*sin(10.);
    
    vec2 coordR=distanceR*directionBase+vec2(.5);
    vec2 coordG=distanceG*directionBase+vec2(.5);
    vec2 coordB=distanceB*directionBase+vec2(.5);
    
    vec4 color=vec4(1.);
    color.r=texture2D(iChannel0,coordR).r;
    color.g=texture2D(iChannel0,coordG).g;
    color.b=texture2D(iChannel0,coordB).b;
    
    fragColor=color;
}