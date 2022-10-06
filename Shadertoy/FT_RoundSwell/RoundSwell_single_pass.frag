#iChannel0"file://asset/img11.jpg"

const float durationTime=5.;

//圆形鼓包-一次 pass
void mainImage(out vec4 fragColor,in vec2 fragCoord)
{
    vec2 uv=fragCoord/iResolution.xy;
    float progress=fract(iTime/durationTime);
    float time=progress;
    
    vec3 swellCenter=vec3(.0,1.,.1);//鼓包中心
    float swellRadius=.2;//鼓包半径
    swellCenter.xy+=time*vec2(1.,-1.);
    
    float depth=swellCenter.z;//鼓包中心深度
    float disCenterMax=sqrt(swellRadius*swellRadius-depth*depth);//表面上最大鼓包范围
    float projectionAngle=2.*acos(depth/swellRadius);//表面上鼓包角度
    float arcLengthMax=projectionAngle*swellRadius;//表面上鼓包弧长
    float disCenter=distance(uv,swellCenter.xy);//当前点到中轴距离
    float arcLength=asin(disCenter/swellRadius)*swellRadius;//当前点在表面上的鼓包弧长
    vec2 st=swellCenter.xy+(2.*arcLength/arcLengthMax)*disCenterMax*normalize(uv-swellCenter.xy);//沿球面展开后的纹理坐标
    vec3 color;
    if(2.*arcLength<arcLengthMax){
        //处于鼓包内
        color=texture2D(iChannel0,st).rgb;
    }else{
        //处于鼓包外
        color=texture2D(iChannel0,uv).rgb;
    }
    
    fragColor=vec4(color,1.);
}