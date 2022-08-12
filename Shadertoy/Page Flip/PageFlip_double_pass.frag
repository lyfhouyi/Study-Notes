#iChannel0"file://PageFlip_pass_1.frag"

const float kernelSize=3.;//滤波核单边尺寸
const float pi=3.141592653;
const float sigma=5.;

//计算权重
float gaussianWeight(float distance){
    return(1./pow(sqrt(2.*pi*pow(sigma,2.)),2.))*exp(-((distance*distance)/(2.*pow(sigma,2.))));
}

//高斯模糊
vec4 gaussianBlur(vec2 fragCoord){
    //计算显示权重
    float greenWeight=0.;
    vec2 pixelStep=vec2(1.)/iResolution.xy;
    float weight;
    float totalWeight = 0.;
    vec4 color=vec4(0.0);

    vec2 uv = fragCoord/iResolution.xy;
    for(float j=-kernelSize;j<=kernelSize;j++){
        for(float i=-kernelSize;i<=kernelSize;i++){
            weight=gaussianWeight(abs(j)+abs(i));
            totalWeight+=weight;
            color += weight*texture2D(iChannel0,uv+vec2(i,j)*pixelStep);
        }
    }
    color /= totalWeight;
    color.a=1.0;
    return color;
}


void mainImage(out vec4 fragColor,in vec2 fragCoord)
{
    float r=.15*iResolution.x;//圆柱半径
    float vAxis=-1.6*iResolution.x;//圆柱运动速度
    float progress=fract(iTime/4.);//特效进度
    vec2 vDirection=normalize(vec2(-5.,1.));//圆柱运动方向（与圆柱轴线垂直）

    vec2 pointAxisBottom=vec2(iResolution.x+progress*vAxis,0.);//中轴与屏幕下边界交点，将第一张图 (iResolution.x, 0.0) 点与圆柱初始中轴处固接
    
    float disCurAxis=dot(fragCoord-pointAxisBottom,vDirection);//当前点到中轴距离
    
    vec2 pointProjectionAxis=fragCoord-vDirection*disCurAxis;//当前点在中轴上的投影坐标
    bool onCylinder=abs(disCurAxis)<r;//当前点是否处于圆柱区域
    
    float curNormalAngle=onCylinder?asin(disCurAxis/r):0.;//截屏面上当前点与法线夹角（转向中轴前侧为正）
    bool behindAxis=disCurAxis<0.;//当前点是否在中轴后方（运动落后于中轴）

    vec2 uv;
    float foldAngle;
    float arcLength;
    vec2 pointUnwrapped;

    foldAngle=pi+curNormalAngle;//当前点折叠角度（将当前点视为位于圆柱上远离纸面的那一侧）
    arcLength=r*foldAngle;//折叠弧长（从当前点在中轴上的投影点算起）
    pointUnwrapped=pointProjectionAxis-vDirection*arcLength;//对应的未折叠点
    
    if(pointUnwrapped.y>0.&&onCylinder&&pointUnwrapped.x>0.995*iResolution.x&&pointUnwrapped.x<1.005*iResolution.x){
        //左方抗锯齿
        fragColor=gaussianBlur(fragCoord);
    } else if(behindAxis && abs(disCurAxis)>0.995*r && abs(disCurAxis)<1.005*r){
        //右方抗锯齿
        fragColor=gaussianBlur(fragCoord);
    }
    else{
        fragColor=texture2D(iChannel0,fragCoord/iResolution.xy);
    }
    

    // fragColor=gaussianBlur(fragCoord);
}