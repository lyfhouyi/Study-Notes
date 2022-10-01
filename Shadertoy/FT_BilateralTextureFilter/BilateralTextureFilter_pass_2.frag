#iChannel0"file://BilateralTextureFilter_pass_1A.frag"
#iChannel1"file://BilateralTextureFilter_pass_1B.frag"

const float kernelSize=5.;//卷积核单边尺寸

//双边纹理滤波-第三次 pass，由 B, delta_omega_q 计算 T
void mainImage(out vec4 fragColor,in vec2 fragCoord)
{
    vec2 uv=fragCoord/iResolution.xy;
    vec2 pixelStep=vec2(1.)/iResolution.xy;
    
    vec2 minSt;
    float minDelta=3.;
    for(float j=-kernelSize;j<=kernelSize;j++){
        for(float i=-kernelSize;i<=kernelSize;i++){
            vec2 st=uv+vec2(i,j)*pixelStep;
            vec3 deltaSt=texture2D(iChannel1,st).rgb;
            if(deltaSt.r<minDelta){
                minDelta=deltaSt.r;
                minSt=st;
            }
        }
    }
    
    fragColor=vec4(texture2D(iChannel0,minSt).rgb,1.);
}