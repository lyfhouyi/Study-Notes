#iChannel0"file://asset/img15.jpg"

const float kernelSize=60.;//卷积核单边尺寸

//背景模糊-第一次 pass，模糊背景-水平方向
void mainImage(out vec4 fragColor,in vec2 fragCoord)
{
    vec2 uv=fragCoord/iResolution.xy;
    float pixelStep=4./iResolution.x;
    
    //计算卷积
    vec3 color=vec3(0.);
    vec2 st;
    float sumCnt=0.;
    for(float i=-kernelSize;i<=kernelSize;i++){
        st=uv;
        st.x+=i*pixelStep;
        if(all(greaterThan(st,vec2(0.)))&&all(lessThan(st,vec2(1.)))){
            color+=texture2D(iChannel0,st).rgb;
            sumCnt++;
        }
    }
    color/=sumCnt;
    fragColor=vec4(color,1.);
}