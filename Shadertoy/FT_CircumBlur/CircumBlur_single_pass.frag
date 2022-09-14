#iChannel0"file://asset/img4.jpg"

const float durationTime=6.;
const float pi=3.141592653;
const float strength=.1*pi;//模糊强度
const float sampleCnt=200.;//采样次数

//二维旋转矩阵
mat2 rotateMatrix(float theta){
    float s=sin(theta);
    float c=cos(theta);
    return mat2(c,-s,s,c);
}

//圆周模糊-一次 pass
void mainImage(out vec4 fragColor,in vec2 fragCoord)
{
    vec2 uv=fragCoord/iResolution.xy;
    float progress=fract(iTime/durationTime);
    float time=progress;
    vec2 curCenter=uv-vec2(.5);
    float deltaTheta=length(curCenter)/.8*strength*time/sampleCnt;//模糊步长
    
    vec3 color=texture2D(iChannel0,uv).rgb;
    float cnt=0.;
    for(float i=0.;i<sampleCnt;i++){
        vec2 uv_rotated=rotateMatrix(i*deltaTheta)*curCenter+vec2(.5);
        if(all(greaterThan(uv_rotated,vec2(0.)))&&all(lessThan(uv_rotated,vec2(1.)))){
            color+=texture2D(iChannel0,uv_rotated).rgb;
            cnt++;
        }
    }
    color/=(cnt+1.);
    fragColor=vec4(color,1.);
}