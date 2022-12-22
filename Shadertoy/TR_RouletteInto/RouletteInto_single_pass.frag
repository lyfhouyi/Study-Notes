#iChannel0"file://asset/img2.jpg"
#iChannel1"file://asset/img6.jpg"

const float durationTime=5.;
const float pi=3.141592653;
const float blurStrength=.008*pi;//模糊强度
const float blurSampleCnt=200.;//模糊采样次数

//二维基准点旋转矩阵：基准点 pivotPt，旋转角度 theta
mat3 rotate2DMatrix(vec2 pivotPt,float theta){
    float c=cos(theta);
    float s=sin(theta);
    return mat3(c,s,0.,-s,c,0.,pivotPt.x*(1.-c)+pivotPt.y*s,pivotPt.y*(1.-c)-pivotPt.x*s,1.);
}

//轮盘进入-一次 pass
void mainImage(out vec4 fragColor,in vec2 fragCoord)
{
    vec2 uv=fragCoord/iResolution.xy;
    vec2 pixelStep=2./iResolution.xy;
    float progress=fract(iTime/durationTime);
    float time=progress;
    // time=.3;
    vec3 color=texture2D(iChannel0,uv).rgb;//贴图当前页
    float theta=pi*sin(4.5*pi*(time-1./9.))*exp(-6.*time);//转盘角度
    float omega=pi*exp(-6.*time)*(4.5*pi*cos(4.5*pi*(time-1./9.))-6.*sin(4.5*pi*(time-1./9.)));//转盘角速度
    vec2 uv_next=(rotate2DMatrix(vec2(.5,0.),theta)*vec3(uv,1.)).xy;//下一页纹理坐标
    if(all(greaterThanEqual(uv_next,vec2(0.)))&&all(lessThanEqual(uv_next,vec2(1.)))){
        //贴图下一页
        color=texture2D(iChannel1,uv_next).rgb;
        float deltaTheta=distance(uv_next,vec2(.5,0.))/.8*blurStrength*omega/blurSampleCnt;//模糊步长
        float cnt=0.;
        for(float i=0.;i<blurSampleCnt;i++){
            vec2 uv_i=(rotate2DMatrix(vec2(.5,0.),i*deltaTheta)*vec3(uv_next,1.)).xy;
            if(all(greaterThanEqual(uv_i,vec2(0.)))&&all(lessThanEqual(uv_i,vec2(1.)))){
                color+=texture2D(iChannel1,uv_i).rgb;
                cnt++;
            }
        }
        color/=(cnt+1.);
    }
    
    fragColor=vec4(color,1.);
}