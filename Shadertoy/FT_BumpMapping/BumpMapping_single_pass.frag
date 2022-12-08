#iChannel0"file://asset/img21.jpg"

const float durationTime=6.;
const float pi=3.141592653;
const float ambient=.3;//环境光系数
const float diffuse=1.;//漫反射系数

//通过颜色估计高度
float calcHeight(vec3 color){
    float avg=.5*(color.r+color.g);
    return mix(avg,.5,.985);
}

//估计像素位置法向量
vec3 calcNormal(vec2 pt){
    
    //构建以 pt 为形心的正三角形顶点
    vec2 p0=pt+vec2(0.,.001);
    vec2 p1=pt+vec2(-.000866,-.0005);
    vec2 p2=pt+vec2(.000866,-.0005);
    
    //估计定点高度
    float h0=calcHeight(texture2D(iChannel0,p0).rgb);
    float h1=calcHeight(texture2D(iChannel0,p1).rgb);
    float h2=calcHeight(texture2D(iChannel0,p2).rgb);
    
    //估计像素法向量
    return normalize(cross(vec3(p1,h1)-vec3(p0,h0),vec3(p2,h2)-vec3(p0,h0)));
}

//凹凸映射-一次 pass
void mainImage(out vec4 fragColor,in vec2 fragCoord)
{
    vec2 uv=fragCoord/iResolution.xy;
    float progress=fract(iTime/durationTime);
    float time=progress;
    // time=0.;
    
    // vec3 lightPosition = vec3(iMouse.xy/iResolution.xy,1.);//光源位置
    vec3 lightPosition=vec3(.5+.5*sin(time*2.*pi),.5+.5*cos(time*2.*pi),1.);//光源位置
    
    vec3 color=vec3(0.);
    vec3 colorBase=texture2D(iChannel0,uv).rgb;
    float curHeight=calcHeight(colorBase);
    vec3 curPosition=vec3(uv,curHeight);//当前位置
    vec3 curNormal=calcNormal(uv);//当前位置法向量
    vec3 curToLight=normalize(lightPosition-curPosition);
    float disCurToLight=distance(lightPosition,curPosition);
    float NdotL=max(dot(curNormal,curToLight),0.);
    color+=ambient*colorBase;
    // color+=diffuse*NdotL*colorBase;
    color+=diffuse*NdotL*colorBase/(disCurToLight*disCurToLight);
    
    fragColor=vec4(color,1.);
}