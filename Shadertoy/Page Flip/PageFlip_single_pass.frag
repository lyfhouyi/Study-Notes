#iChannel0"file://img.jpg"
#iChannel1"file://img2.jpg"

const float pi=3.141592653;
const float durationTime=2.;//翻页时长
const vec2 direction=normalize(vec2(-.55,-5.));//翻页方向-轴线

//翻页特效
void mainImage(out vec4 fragColor,in vec2 fragCoord)
{
    vec2 directionGeneratorFast=normalize(vec2(-1.,-5.));//翻页方向-快母线
    vec2 directionGeneratorSlow=normalize(2.*direction-directionGeneratorFast);//翻页方向-慢母线
    float cosFastCenter=dot(directionGeneratorFast,direction);//快母线与中轴夹角余弦
    // float cosCenterSlow = dot(direction,directionGeneratorSlow);//中轴与慢母线夹角余弦
    
    // float ratio=.4*time;
    vec2 uv=fragCoord/iResolution.xy;
    float time=fract(iTime/durationTime);//特效开始时长
    float vAxis=2.5*iResolution.x/durationTime;//中轴运动速度
    // vec2 axisCoord=vec2(iResolution.x-time*vAxis*durationTime,0.);//中轴与横轴交点坐标
    vec2 peakCoord=vec2(1.8*iResolution.x-time*vAxis*durationTime,2.*iResolution.y);//圆锥顶点坐标
    float cosCurCenter=dot(normalize(fragCoord-peakCoord),direction);//当前坐标与中轴夹角余弦
    vec3 crossCurCenter=cross(vec3(fragCoord-peakCoord,0.),vec3(direction,0.));
    
    float alongCurCenter=dot(fragCoord-peakCoord,direction);//当前坐标向中轴投影长度
    float alongCurGeneratorFast=dot(fragCoord-peakCoord,directionGeneratorFast);//当前坐标向快母线投影长度
    float disCurCenter=length(fragCoord-peakCoord-alongCurCenter*direction);//当前坐标到中轴距离
    float disCurGeneratorFast=length(fragCoord-peakCoord-alongCurGeneratorFast*directionGeneratorFast);//当前坐标到快母线距离
    
    float r=disCurCenter+disCurGeneratorFast;//当前圆锥截面半径！！！！需更改
    
    //判断当前像素位置信息
    int posState;
    if(cosCurCenter>cosFastCenter){
        posState=0;//处于书背
    }else{
        if(crossCurCenter.z>0.){
            posState=1;//处于当前页
        }else{
            posState=-1;//处于下一页
        }
    }
    
    //若当前像素处于书背范围，则计算对应折叠处的纹理坐标
    float angle=.5*pi-asin(disCurCenter/r);//折叠角度
    // float arcLength=r*angle;//弧长
    float arcLength=2.5*time*(r*angle);//弧长
    float texX=(iResolution.x-arcLength)/iResolution.x;
    
    float x1=peakCoord.x-peakCoord.y*directionGeneratorSlow.x/directionGeneratorSlow.y;
    float x2=peakCoord.x+(iResolution.y-peakCoord.y)*directionGeneratorSlow.x/directionGeneratorSlow.y;
    
    float texY_zero=dot(vec2(x1,0.)-peakCoord,directionGeneratorFast);
    float texY_one=dot(vec2(x2,iResolution.y)-peakCoord,directionGeneratorFast);
    float texY=(texY_zero-alongCurGeneratorFast)/(texY_zero-texY_one);
    
    // float texY=(length(fragCoord-peakCoord-disCurCenter*direction) + r*direction.y/direction.x)/iResolution.y;
    vec2 unwrappedTextureCoord=vec2(texX,texY);//折叠处的纹理坐标
    if(texY<0.){
        posState=1;
    }
    
    // fragColor=vec4(1.0,0.0,0.0,1.0);
    switch(posState){
        case 1:fragColor=texture2D(iChannel0,uv);break;//当前页
        case 0:fragColor=texture2D(iChannel0,unwrappedTextureCoord);break;//书背
        case-1:fragColor=texture2D(iChannel1,uv);break;//下一页
    }
}