#iChannel0"file://asset/img7.jpg"
#iChannel1"file://asset/img8.jpg"

const float durationTime=3.;//特效时长
const float pi=3.141592653;

//计算正五边形顶点坐标：形心坐标 center，边长 edgeLength，以形心为轴自旋角度 theta
vec2[5]calcPentagon(vec2 center,float edgeLength,float theta){
    vec2 vertex_0=vec2(.5*edgeLength,-.5*edgeLength*tan(.3*pi));
    vec2 vertex_1=vec2(edgeLength*cos(.2*pi),edgeLength*sin(.4*pi)-.5*edgeLength*tan(.3*pi));
    vec2 vertex_2=vec2(0.,edgeLength*sin(.4*pi)+edgeLength*sin(.2*pi)-.5*edgeLength*tan(.3*pi));
    vec2 vertex_3=vec2(-edgeLength*cos(.2*pi),edgeLength*sin(.4*pi)-.5*edgeLength*tan(.3*pi));
    vec2 vertex_4=vec2(-.5*edgeLength,-.5*edgeLength*tan(.3*pi));
    
    mat2 rotateMatrix=mat2(cos(theta),sin(theta),-sin(theta),cos(theta));
    vertex_0=rotateMatrix*vertex_0+center;
    vertex_1=rotateMatrix*vertex_1+center;
    vertex_2=rotateMatrix*vertex_2+center;
    vertex_3=rotateMatrix*vertex_3+center;
    vertex_4=rotateMatrix*vertex_4+center;
    return vec2[5](vertex_0,vertex_1,vertex_2,vertex_3,vertex_4);
}

//计算两直线交点：直线 A 上两点 lineAP1、lineAP2，直线 B 上两点 lineBP1、lineBP2
vec2 calcInterPoint(vec2 lineAP1,vec2 lineAP2,vec2 lineBP1,vec2 lineBP2){
    vec3 dirA=vec3(normalize(lineAP2-lineAP1),0.);
    vec3 dirB=vec3(normalize(lineBP2-lineBP1),0.);
    vec3 tmp=vec3(lineBP1-lineAP1,0.);
    float t=cross(tmp,dirB).z/cross(dirA,dirB).z;
    return lineAP1+dirA.xy*t;
}

//绘制凸多边形：定点个数 vertexCnt，顶点数组 vertexs，目前只支持过渡带在边界内
float drawConvexPolygon(vec2 pt,int vertexCnt,vec2[10]vertexs,bool smoothInner){
    if(vertexCnt<3){
        return 0.;
    }
    
    float minDisEdge=iResolution.x*iResolution.y;
    float maxRange=0.;
    bool inLeft=true;
    for(int indexStart=0;indexStart<vertexCnt;indexStart++){
        int indexEnd=int(mod(float(indexStart)+1.,float(vertexCnt)));
        maxRange=max(maxRange,length(vertexs[indexEnd]-vertexs[indexStart]));
        vec3 edgePolygon=normalize(vec3(vertexs[indexEnd]-vertexs[indexStart],0.));
        vec3 edgePt=normalize(vec3(pt-vertexs[indexStart],0.));
        float sinTheta=cross(edgePolygon,edgePt).z;
        float disEdge=length(pt-vertexs[indexStart])*sinTheta;
        minDisEdge=min(minDisEdge,abs(disEdge));
        
        inLeft=indexStart==0?(sinTheta>0.?true:false):inLeft;
        if(inLeft!=(sinTheta>0.)){
            return 0.;
        }
    }
    return smoothstep(0.,0.,20.*minDisEdge/maxRange);
}

//绘制线段：起点 vertexStart，终点 vertexEnd，过渡带单侧宽度 lineWidth，过渡带是否在双侧或只在左侧 smoothBilateral
float drawLineSegment(vec2 pt,vec2 vertexStart,vec2 vertexEnd,float lineWidth,bool smoothBilateral){
    vec3 edgeRay=normalize(vec3(vertexEnd-vertexStart,0.));
    vec3 edgePtStart=normalize(vec3(pt-vertexStart,0.));
    vec3 edgePtEnd=normalize(vec3(pt-vertexEnd,0.));
    float sinThetaStart=cross(edgeRay,edgePtStart).z;
    float cosThetaStart=dot(edgeRay,edgePtStart);
    float cosThetaEnd=dot(edgeRay,edgePtEnd);
    float disEdge=length(pt-vertexStart)*sinThetaStart;
    // if(cosThetaStart<0.0 ||cosThetaEnd>0.0||(smoothLeft&&sinThetaStart<0.0)||(!smoothLeft&&sinThetaStart>0.0)){
        //     return 0.0;
    // }
    if(cosThetaStart<0.||cosThetaEnd>0.){
        return 0.;
    }
    if(!smoothBilateral&&sinThetaStart<0.){
        //非双侧过渡，则需去除右侧过渡带
        return 0.;
    }
    return 1.-smoothstep(0.,1.,abs(disEdge)/lineWidth);
}

//快门转场-一次 pass
void mainImage(out vec4 fragColor,in vec2 fragCoord)
{
    vec2 uv=fragCoord/iResolution.xy;
    float progress=fract(iTime/durationTime);
    float time=2.*sign(progress-.5)*(progress-.5);
    
    //计算正五边形顶点坐标
    float edgeLength=max(iResolution.x,iResolution.y)*time;
    vec2[5]vertexsPolygon=calcPentagon(vec2(.5)*iResolution.xy,edgeLength,-time*.4*pi);
    vec2 vertexs[10]=vec2[10](vertexsPolygon[0],vertexsPolygon[1],vertexsPolygon[2],vertexsPolygon[3],vertexsPolygon[4],vec2(0.),vec2(0.),vec2(0.),vec2(0.),vec2(0.));
    
    //绘制五边形
    float ratioPolygon=drawConvexPolygon(fragCoord,5,vertexs,true);
    
    //绘制射线
    float ratioRay=drawLineSegment(fragCoord,vertexsPolygon[0],calcInterPoint(vertexsPolygon[0],vertexsPolygon[1],vec2(0.,1.)*iResolution.xy,vec2(1.,1.)*iResolution.xy),10.,false)+
    +drawLineSegment(fragCoord,vertexsPolygon[1],calcInterPoint(vertexsPolygon[1],vertexsPolygon[2],vec2(0.,1.)*iResolution.xy,vec2(1.,1.)*iResolution.xy),10.,false)+
    +drawLineSegment(fragCoord,vertexsPolygon[2],calcInterPoint(vertexsPolygon[2],vertexsPolygon[3],vec2(0.,0.)*iResolution.xy,vec2(0.,1.)*iResolution.xy),10.,false)+
    +drawLineSegment(fragCoord,vertexsPolygon[3],calcInterPoint(vertexsPolygon[3],vertexsPolygon[4],vec2(0.,0.)*iResolution.xy,vec2(1.,0.)*iResolution.xy),10.,false)+
    +drawLineSegment(fragCoord,vertexsPolygon[4],calcInterPoint(vertexsPolygon[4],vertexsPolygon[0],vec2(1.,0.)*iResolution.xy,vec2(1.,1.)*iResolution.xy),10.,false);
    
    vec3 colorBase=progress<.5?texture2D(iChannel0,uv).rgb:texture2D(iChannel1,uv).rgb;
    vec3 colorBackground=vec3(.18);
    vec3 color=mix(colorBackground,colorBase,ratioPolygon);
    color=mix(color,vec3(0.),.3*ratioRay);
    fragColor=vec4(color,1.);
}
