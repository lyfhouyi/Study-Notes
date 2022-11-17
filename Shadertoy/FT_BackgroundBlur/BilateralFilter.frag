#iChannel0"file://tmp/img001/img001_raw.jpg"

const float kernelSize=10.;//卷积核单边尺寸
const float sigma=.5;

//双边滤波-一次 pass
void mainImage(out vec4 fragColor,in vec2 fragCoord)
{
    vec2 uv=fragCoord/iResolution.xy;
    vec3 colorBase=texture2D(iChannel0,uv).rgb;
    vec2 pixelStep=vec2(1.)/iResolution.xy;
    //计算卷积
    vec3 color=vec3(0.);
    vec2 st;
    float weight;
    float totalWeight=0.;
    for(float j=-kernelSize;j<=kernelSize;j++){
        for(float i=-kernelSize;i<=kernelSize;i++){
            vec2 st=uv+vec2(i,j)*pixelStep;
            float dis=st.x*st.y*(1.-st.x)*(1.-st.y)+.0001;
            
            weight=distanceWeight(dis);
            color+=texture2D(iChannel0,st).rgb*weight;
            totalWeight+=weight;
        }
    }
        color/=totalWeight;
    
    fragColor=vec4(color,1.);
}