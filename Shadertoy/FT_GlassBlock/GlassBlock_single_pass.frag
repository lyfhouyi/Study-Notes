#iChannel0"file://asset/img16.jpg"

const float durationTime=3.;

const float pi=3.141592653;
const float blockTheta=.25*pi;//玻璃块角度
const float blockWidth=300.;//玻璃块宽度
const float kernelSize=10.;//卷积核单边尺寸
const float sigma=3.;
const float e=2.7182804;

//计算高斯权重
float gaussianWeight(float dis){
    return(1./pow(sqrt(2.*pi*pow(sigma,2.)),2.))*pow(e,-((dis*dis)/(2.*pow(sigma,2.))));
}

//二维基准点缩放矩阵：基准点 fixedPt，缩放系数 s
mat3 scale2DMatrix(vec2 fixedPt,vec2 s){
    return mat3(s.x,0.,0.,0.,s.y,0.,fixedPt.x*(1.-s.x),fixedPt.y*(1.-s.y),1.);
}

//计算三次贝塞尔：参数 t，四个控制点 p0、p1、p2、p3
float cubic_bezier(float t,float p0,float p1,float p2,float p3){
    mat4 mat=mat4(-1.,3.,-3.,1.,3.,-6.,3.,0.,-3.,3.,0.,0.,1.,0.,0.,0.);
    vec4 left=vec4(t*t*t,t*t,t,1.);
    vec4 right=vec4(p0,p1,p2,p3);
    return dot(left,mat*right);
}

//玻璃块-一次 pass
void mainImage(out vec4 fragColor,in vec2 fragCoord)
{
    float progress=fract(iTime/durationTime);
    float time=progress;
    // time=1.;
    
    vec2 blockPosition=vec2(.5);//玻璃块中线与视口竖直中线交点
    blockPosition.y=1.-(2.1*(cubic_bezier(time,0.,1.49,-.61,1.)-.5)+.5);
    
    float blockThetaModulated=mod(blockTheta,2.*pi);
    float blockThetaNormalModulated=mod(blockThetaModulated+.5*pi,2.*pi);//垂直放置角度
    vec2 direction=vec2(cos(blockThetaModulated),sin(blockThetaModulated));//玻璃块放置方向
    vec2 directionNormal=vec2(cos(blockThetaNormalModulated),sin(blockThetaNormalModulated));//垂直放置方向
    vec2 boundaryPoint_1=blockPosition*iResolution.xy-.5*blockWidth*directionNormal;//边界点1
    vec2 boundaryPoint_2=blockPosition*iResolution.xy+.5*blockWidth*directionNormal;//边界点2
    
    vec3 color;
    if((cross(vec3(fragCoord-boundaryPoint_1,0.),vec3(direction,0.))*cross(vec3(fragCoord-boundaryPoint_2,0.),vec3(direction,0.))).z>0.){
        //两侧，模糊背景
        vec2 pixelStep=vec2(1.)/iResolution.xy;
        vec2 uv=fragCoord/iResolution.xy;
        vec2 st;
        float weight;
        float totalWeight=0.;
        for(float j=-kernelSize;j<=kernelSize;j++){
            for(float i=-kernelSize;i<=kernelSize;i++){
                st=uv+vec2(i,j)*pixelStep;
                if(all(greaterThanEqual(st,vec2(0.)))&&all(lessThanEqual(st,vec2(1.)))){
                    weight=gaussianWeight(abs(j)+abs(i));
                    color+=texture2D(iChannel0,st).rgb*weight;
                    totalWeight+=weight;
                }
            }
        }
        color/=totalWeight;
    }else{
        //中间，放大前景
        vec2 fragCoord_changed=(scale2DMatrix(vec2(.5)*iResolution.xy,vec2(.8))*vec3(fragCoord,1.)).xy;
        color=texture2D(iChannel0,fragCoord_changed/iResolution.xy).rgb;
    }
    fragColor=vec4(color,1.);
}