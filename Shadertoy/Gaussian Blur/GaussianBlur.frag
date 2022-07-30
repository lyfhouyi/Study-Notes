#iChannel0"file://img.jpg"

const float kernelSize = 5.0; //卷积核单边尺寸
const float pi = 3.141592653;
const float sigma = 3.0;
const float e = 2.7182804;

//计算权重
float gaussianWeight(float distance){
    return (1.0/pow(sqrt(2.0*pi*pow(sigma,2.0)),2.0))*pow(e,-((distance*distance)/(2.0*pow(sigma,2.0))));
}

//高斯模糊
void mainImage(out vec4 fragColor,in vec2 fragCoord)
{
    vec2 uv=fragCoord/iResolution.xy;
    vec2 pixel=vec2(1.)/iResolution.xy;
    
    //计算卷积核坐标及权重
    vec2 textureCoords[int(2.0*kernelSize+1.0)*int(2.0*kernelSize+1.0)];
    float weights[int(2.0*kernelSize+1.0)*int(2.0*kernelSize+1.0)];
    int k=0;
    float totalWeight =0.0;
    for(float j=-kernelSize;j<=kernelSize;j++){
        for(float i=-kernelSize;i<=kernelSize;i++){
            textureCoords[k]=uv+vec2(i,j)*pixel;
            weights[k]=gaussianWeight(abs(j)+abs(i));
            totalWeight+=weights[k];
            k++;
        }

    }

    //计算卷积
    vec4 color = vec4(0.0);
    for(int i=0;i<int(2.0*kernelSize+1.0)*int(2.0*kernelSize+1.0);i++){
        color += texture2D(iChannel0,textureCoords[i])*weights[i];
    }
    color/=totalWeight;

    
    fragColor = color;
}