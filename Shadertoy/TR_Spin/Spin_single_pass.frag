#iChannel0"file://asset/img8.jpg"
#iChannel1"file://asset/img0.jpg"

const float durationTime=16.;
const float pi=3.141592653;
const float d=0.5;


//自旋转场-一次 pass
void mainImage(out vec4 fragColor,in vec2 fragCoord)
{
    vec2 uv=fragCoord/iResolution.xy;
    float progress=fract(iTime/durationTime);
    float time=progress;
    float theta = 2.0*pi*time;//自旋角度
    float disCenterAxis = abs(uv.x - 0.5);//当前点到中轴距离
    float pointUnwrappedX =0.5+(uv.x - 0.5)/cos(theta);//对应的未折叠点_X
    bool outside = pointUnwrappedX>1.0 || pointUnwrappedX<0.0;//对应的未折叠点是否在视口外
    vec3 colorCur = texture2D(iChannel0,vec2(pointUnwrappedX,uv.y)).rgb;//当前页正面
    vec3 colorCurBack = vec3(dot(vec3(.299,.587,.114),texture2D(iChannel0,vec2(pointUnwrappedX,uv.y)).rgb));//当前页背面
    colorCurBack=mix(colorCurBack,vec3(1.),.7);
    vec3 colorNext = texture2D(iChannel1,vec2(pointUnwrappedX,uv.y)).rgb;//下一页正面

   
    vec3 color=vec3(0.);
    color = texture2D(iChannel1,uv).rgb;
    if(!outside){
        if(theta<0.5*pi){
            color = colorCur;
        }else if(theta<1.5*pi){
            color = colorCurBack;
        }else{
            color = colorNext;
        }
    }
    fragColor=vec4(color,1.);
}