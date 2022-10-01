#iChannel0"file://asset/img12.jpg"

const float kernelSize=5.;//卷积核单边尺寸

//计算亮度
float calcLuma(vec3 color){
    return dot(vec3(.213,.715,.072),color);
}

//双边纹理滤波-第二次 pass，由 I 计算 delta_omega_q
void mainImage(out vec4 fragColor,in vec2 fragCoord)
{
    vec2 uv=fragCoord/iResolution.xy;
    vec2 pixelStep=vec2(1.)/iResolution.xy;
    
    float minOmega=2.;
    float maxOmega=-2.;
    for(float j=-kernelSize;j<=kernelSize;j++){
        for(float i=-kernelSize;i<=kernelSize;i++){
            vec2 st=uv+vec2(i,j)*pixelStep;
            vec3 colorSt=texture2D(iChannel0,st).rgb;
            float lumaSt=calcLuma(colorSt);
            if(lumaSt<minOmega){
                minOmega=min(lumaSt,minOmega);
                maxOmega=max(lumaSt,maxOmega);
            }
        }
    }
    
    fragColor=vec4(vec3(maxOmega-minOmega),1.);
}