#iChannel0"file://asset/img8.jpg"
#iChannel1"file://asset/img0.jpg"

const float pi=3.141592653;

//翻页转场-第一次 pass，翻页效果
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
    
    vec4 color;
    vec2 uv;
    
    //贴图当前页和下一页
    float foldAngle=-curNormalAngle;//当前点折叠角度（将当前点视为位于圆柱上靠近纸面的那一侧）
    float arcLength=r*foldAngle;//折叠弧长（从当前点在中轴上的投影点算起）
    vec2 pointUnwrapped=pointProjectionAxis-vDirection*arcLength;//对应的未折叠点
    bool outside=any(lessThan(pointUnwrapped,vec2(0.)))||any(greaterThan(pointUnwrapped,iResolution.xy));//对应的未折叠点是否在视口外
    if(!behindAxis||(onCylinder&&!outside)){
        //当前页
        uv=(behindAxis?pointUnwrapped:fragCoord)/iResolution.xy;
        color=texture2D(iChannel0,uv);
    }else{
        //下一页
        color=texture2D(iChannel1,fragCoord/iResolution.xy);
    }
    
    if(behindAxis&&pointUnwrapped.x>iResolution.x){
        //右方阴影
        // color.rgb=vec3(0.,1.,0.);
        // float mixRatio= mix(1.,smoothstep(0.,.03,pointUnwrapped.x/iResolution.x-1.0),.8);
        float mixRatio=mix(1.,pointUnwrapped.x/iResolution.x-1.,.6);
        color.rgb=mix(vec3(0.),color.rgb,mixRatio);
    }
    
    //贴图书背
    foldAngle=pi+curNormalAngle;//当前点折叠角度（将当前点视为位于圆柱上远离纸面的那一侧）
    arcLength=r*foldAngle;//折叠弧长（从当前点在中轴上的投影点算起）
    pointUnwrapped=pointProjectionAxis-vDirection*arcLength;//对应的未折叠点
    outside=any(lessThan(pointUnwrapped,vec2(0.)))||any(greaterThan(pointUnwrapped,iResolution.xy));//对应的未折叠点是否在视口外
    if(onCylinder&&!outside){
        //书背
        uv=pointUnwrapped/iResolution.xy;
        color.rgb=vec3(dot(vec3(.299,.587,.114),texture2D(iChannel0,uv).rgb));
        color.rgb=mix(color.rgb,vec3(1.),.7);
    }
    
    if(pointUnwrapped.y>0.&&onCylinder&&pointUnwrapped.x>iResolution.x){
        //左方阴影
        // color.rgb=vec3(1.,0.,0.);
        float mixRatio=mix(1.,smoothstep(0.,.03,(pointUnwrapped.x-iResolution.x)/iResolution.x),.3);
        color.rgb=mix(vec3(0.),color.rgb,mixRatio);
    }
    
    if(!onCylinder&&behindAxis){
        //右方阴影
        // color.rgb=vec3(0.,1.,0.);
        float mixRatio=mix(1.,smoothstep(0.,.3,abs(disCurAxis)/r-1.),.6);
        color.rgb=mix(vec3(0.),color.rgb,mixRatio);
    }
    
    if(pointUnwrapped.x<iResolution.x&&onCylinder&&pointUnwrapped.y<0.){
        //下方阴影
        // color.rgb=vec3(.0,0.,1.);
        float mixRatio=mix(1.,smoothstep(0.,1.,20.*abs(pointUnwrapped.y/iResolution.y)),.4);
        color.rgb=mix(vec3(0.),color.rgb,mixRatio);
    }
    
    fragColor=color;
}