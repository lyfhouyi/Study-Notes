#iChannel0"file://BackgroundBlur_pass_1.frag"

const float kernelSize=60.;//卷积核单边尺寸

const float sigma=.01;

//计算权重
float distanceWeight(float dis){
    float value=-((dis*dis)/(2.*sigma*sigma));
    return exp(value);
}

//背景模糊-第二次 pass，模糊背景-竖直方向
void mainImage(out vec4 fragColor,in vec2 fragCoord)
{
    vec2 uv=fragCoord/iResolution.xy;
    float pixelStep=4./iResolution.y;
    
    //计算卷积
    vec3 color=vec3(0.);
    vec2 st;
    float weight;
    float totalWeight=0.;
    for(float i=-kernelSize;i<=kernelSize;i++){
        st=uv;
        st.y+=i*pixelStep;
        if(all(greaterThan(st,vec2(0.)))&&all(lessThan(st,vec2(1.)))){
            float dis=st.x*st.y*(1.-st.x)*(1.-st.y)+.0001;
            dis=dis*dis;
            
            weight=distanceWeight(dis);
            color+=texture2D(iChannel0,st).rgb*weight;
            totalWeight+=weight;
        }
    }
    color/=totalWeight;
    
    fragColor=vec4(color,1.);
}