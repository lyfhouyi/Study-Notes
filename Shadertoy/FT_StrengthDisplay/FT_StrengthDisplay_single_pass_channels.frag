#iChannel0"file://asset/img19.jpg"

const float durationTime=5.;
const int n=8;//将原图量化为 n + 1 个强度等级
const float I_0=.01;//显示的最低强度

//计算等级为 k 的显示强度
float calcIk(float I_0,int n,int k){
    k=max(0,k);
    float r=pow(1./I_0,1./float(n));//相邻强度之间的比率
    return I_0*pow(r,float(k));
}

//背景模糊-第一次 pass，模糊背景-水平方向
void mainImage(out vec4 fragColor,in vec2 fragCoord)
{
    vec2 uv=fragCoord/iResolution.xy;
    float progress=.5+.5*sin(2.*3.14*iTime/durationTime);
    float time=progress;
    time=1.;
    
    vec3 colorBase=texture2D(iChannel0,uv).rgb;
    vec3 colorPattern;
    for(int i=0;i<=n;i++){
        if(colorBase.r<calcIk(I_0,n,i)){
            float lumaMid=(calcIk(I_0,n,i)+calcIk(I_0,n,i-1))/2.;
            colorPattern.r=colorBase.r>lumaMid?calcIk(I_0,n,i):calcIk(I_0,n,i-1);
            break;
        }
    }
    
    for(int i=0;i<=n;i++){
        if(colorBase.g<calcIk(I_0,n,i)){
            float lumaMid=(calcIk(I_0,n,i)+calcIk(I_0,n,i-1))/2.;
            colorPattern.g=colorBase.g>lumaMid?calcIk(I_0,n,i):calcIk(I_0,n,i-1);
            break;
        }
    }
    
    for(int i=0;i<=n;i++){
        if(colorBase.b<calcIk(I_0,n,i)){
            float lumaMid=(calcIk(I_0,n,i)+calcIk(I_0,n,i-1))/2.;
            colorPattern.b=colorBase.b>lumaMid?calcIk(I_0,n,i):calcIk(I_0,n,i-1);
            break;
        }
    }
    
    vec3 color=colorPattern;
    
    fragColor=vec4(color,1.);
}