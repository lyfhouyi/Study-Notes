#iChannel0"file://123.png"
#iChannel1"file://img.jpg"

const float pi=3.141592653;
const float e = 2.7182804;
const float durationTime=6.;//翻页时长

float sigmoid(float x){
    return (1.0)/(1.0 + pow(e,-x));
}

float sigmoid_1(float y){
    return -log(1.0/y-1.0);
}

float calcTan(float c){
    float s = sqrt(1.0-c*c);
    return s/c;
}

//翻页特效
void mainImage(out vec4 fragColor,in vec2 fragCoord)
{
    float time=fract(iTime/durationTime);//特效开始时长
    float process = fract(iTime/durationTime);//特效进度

    vec2 directionAxis=normalize(vec2(-0.8-0.0*process,-5.));//翻页方向-中轴线
    vec2 directionGeneratorFast=normalize(vec2(-1.0-0.0*process,-5.));//翻页方向-快母线
    
    
    vec2 directionGeneratorSlow=normalize(2.*directionAxis-directionGeneratorFast);//翻页方向-慢母线
    vec2 directionVerticalAxis = normalize(vec2(directionAxis.y,-directionAxis.x));//轴线垂向（指向快母线侧）
    vec2 directionVerticalGeneratorFast = normalize(vec2(-directionGeneratorFast.y,directionGeneratorFast.x));//快母线垂向（指向轴线侧）

    
    
    float vAxisX=-2.0*(iResolution.x*process);//中轴横向运动速度
    float vAxisY=3.0*(iResolution.y*process);//中轴纵向运动速度

    float cosFastCenter=dot(directionGeneratorFast,directionAxis);//快母线与中轴夹角余弦
    // float cosCenterSlow = dot(direction,directionGeneratorSlow);//中轴与慢母线夹角余弦
    
    // float ratio=.4*time;
    // vec2 axisCoord=vec2(iResolution.x-time*vAxis*durationTime,0.);//中轴与横轴交点坐标
    // vec2 peakCoord=vec2(1.8*iResolution.x+process*vAxisX,2.*iResolution.y+process*vAxisY);//圆锥顶点坐标
    vec2 peakCoord=vec2(1.4*iResolution.x+process*vAxisX,iResolution.y+process*vAxisY);//圆锥顶点坐标
    
    vec2 uv=fragCoord/iResolution.xy;
    float cosCurCenter=dot(normalize(fragCoord-peakCoord),directionAxis);//当前坐标与中轴夹角余弦
    vec3 crossCurCenter=cross(vec3(fragCoord-peakCoord,0.),vec3(directionAxis,0.));
    
    float alongCurCenter=dot(fragCoord-peakCoord,directionAxis);//当前坐标向中轴投影长度
    float alongCurGeneratorFast=dot(fragCoord-peakCoord,directionGeneratorFast);//当前坐标向快母线投影长度
    float disCurCenter=length(fragCoord-peakCoord-alongCurCenter*directionAxis);//当前坐标到中轴距离
    float disCurGeneratorFast=length(fragCoord-peakCoord-alongCurGeneratorFast*directionGeneratorFast);//当前坐标到快母线距离
    
    float r=disCurCenter+disCurGeneratorFast;//当前圆锥截面半径！！！！需更改
    r=alongCurCenter*calcTan(cosFastCenter);
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
    float arcLength=r*angle;//弧长（即折叠长度，从当前圆截面与快母线交点算起）
    // float arcLength=1.8*time*(r*angle);//弧长
    arcLength=disCurGeneratorFast+0.3*process*iResolution.x;
    vec2 pointSectionGeneratorFast=peakCoord+alongCurCenter*directionAxis+r*directionVerticalAxis;//当前圆截面与快母线交点
    vec2 pointUnwrapped= pointSectionGeneratorFast+arcLength*directionVerticalGeneratorFast;//对应的未折叠点

    // if(posState==0 && (any(lessThan(pointUnwrapped, vec2(0.0))) || any(greaterThan(pointUnwrapped, iResolution.xy)))){
    //     posState=1;//处于当前页
    // }
    //else{
    //     posState=0;
    // }
    ///*yuan
    float texX=(iResolution.x-arcLength)/iResolution.x;
    
    vec2 coorBottom=vec2 (peakCoord.x+(0.1*iResolution.y-peakCoord.y)*directionGeneratorSlow.x/directionGeneratorSlow.y,0.1*iResolution.y);//慢母线与屏幕下边界交点 x 坐标
    vec2 coorTop=vec2 (peakCoord.x+(iResolution.y-peakCoord.y)*directionGeneratorSlow.x/directionGeneratorSlow.y,iResolution.y);//慢母线与屏幕上边界交点 x 坐标
    
    float texY_zero=dot(coorBottom-peakCoord,directionGeneratorFast);
    float texY_one=dot(coorTop-peakCoord,directionGeneratorFast);
    float x=  disCurGeneratorFast/length(coorBottom-peakCoord-alongCurGeneratorFast*directionGeneratorFast);
    // float texY=(texY_zero-alongCurGeneratorFast)/(texY_zero-texY_one)+0.05*sin(x*2.0*pi);
    float y = (texY_zero-alongCurGeneratorFast)/(texY_zero-texY_one)+0.02*sigmoid_1(x);
    // y=clamp(y,0.2,1.0);
    float texY=(texY_zero-alongCurGeneratorFast)/(texY_zero-texY_one);

    // float texY=(length(fragCoord-peakCoord-disCurCenter*direction) + r*direction.y/direction.x)/iResolution.y;
    vec2 unwrappedTextureCoord=vec2(texX,texY);//折叠处的纹理坐标
    if(posState==0 && (y<0.||false)){
        posState=1;
    }
    //*/

    // vec3 il =vec3(1.0,0.0,0.0);
    vec3 il = vec3(dot(vec3(0.299,0.587,0.114),texture2D(iChannel0,unwrappedTextureCoord).rgb));
    // il = step(vec3(0.5),il);
    il = mix(0.8*il,vec3(1.0),0.6);
    vec3 il2 = texture2D(iChannel0,unwrappedTextureCoord).rrr;
    fragColor=vec4(1.0,0.0,0.0,1.0);
    switch(posState){
        // case 1:fragColor=vec4(il,0.1);break;//当前页
        case 1:fragColor=texture2D(iChannel0,uv);break;//当前页
        case 0:fragColor=vec4(il,0.1);break;//书背
        case-1:fragColor=texture2D(iChannel1,uv);break;//下一页
    }
}