#iChannel0"file://img.jpg"

const float kernelSize=12.;//卷积核单边尺寸
const float pi=3.141592653;
const float sigma=3.;
const float e=2.7182804;

//计算权重
float gaussianWeight(float distance){
    return(1./pow(sqrt(2.*pi*pow(sigma,2.)),2.))*pow(e,-((distance*distance)/(2.*pow(sigma,2.))));
}

//高斯模糊-一次 pass
void mainImage(out vec4 fragColor,in vec2 fragCoord)
{
    vec2 uv=fragCoord/iResolution.xy;
    vec2 pixelStep=vec2(1.)/iResolution.xy;
    
    //计算卷积核坐标及权重
    vec2 textureCoords[int(2.*kernelSize+1.)*int(2.*kernelSize+1.)];
    float weights[int(2.*kernelSize+1.)*int(2.*kernelSize+1.)];
    int k=0;
    float totalWeight=0.;
    for(float j=-kernelSize;j<=kernelSize;j++){
        for(float i=-kernelSize;i<=kernelSize;i++){
            textureCoords[k]=uv+vec2(i,j)*pixelStep;
            weights[k]=gaussianWeight(abs(j)+abs(i));
            totalWeight+=weights[k];
            k++;
        }
        
    }
    
    //计算卷积
    vec4 colorGaussian=vec4(0.);
    for(int i=0;i<int(2.*kernelSize+1.)*int(2.*kernelSize+1.);i++){
        colorGaussian+=texture2D(iChannel0,textureCoords[i])*weights[i];
    }
    colorGaussian/=totalWeight;
    
    vec4 colorBase=texture2D(iChannel0,uv);
    
    float mixRatio=sin(.5*iTime);
    fragColor=mix(colorBase,colorGaussian,abs(mixRatio));
}