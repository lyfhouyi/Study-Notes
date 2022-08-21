const float durationTime=6.;//特效时长
const float pi=3.141592653;

/*
几何图形计算函数
*/

//计算正五边形顶点坐标：形心坐标 center，边长 edgeLength，以形心为轴自旋角度 theta
vec2[5]calcPentagon(vec2 center,float edgeLength,float theta){
    //原始五边形坐标（形心位于坐标原点）
    vec2 vertex_0=vec2(.5*edgeLength,-.5*edgeLength*tan(.3*pi));
    vec2 vertex_1=vec2(edgeLength*cos(.2*pi),edgeLength*sin(.4*pi)-.5*edgeLength*tan(.3*pi));
    vec2 vertex_2=vec2(0.,edgeLength*sin(.4*pi)+edgeLength*sin(.2*pi)-.5*edgeLength*tan(.3*pi));
    vec2 vertex_3=vec2(-edgeLength*cos(.2*pi),edgeLength*sin(.4*pi)-.5*edgeLength*tan(.3*pi));
    vec2 vertex_4=vec2(-.5*edgeLength,-.5*edgeLength*tan(.3*pi));
    
    //旋转、平移后的五边形坐标
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

//计算两向量的夹角（从向量 A 逆时针转到向量 B）：向量 A vecA，向量 B vecB
//返回值范围：[0,2*pi)
float calcAngle(vec2 vecA,vec2 vecB){
    vecA = normalize(vecA);
    vecB = normalize(vecB);
    float cosTheta = dot(vecA,vecB);
    float sinTheta = cross(vec3(vecA,0.0),vec3(vecB,0.0)).z;
    float theta = acos(cosTheta);
    return sinTheta>=0.0?theta:2.0*pi-theta;
}

//两图形求交
float calcIntersection(float geomA,float geomB){
    return min(geomA,geomB);
}

//两图形求并
float calcUnion(float geomA,float geomB){
    return max(geomA,geomB);
}

//两图形求差
float calcDifference(float geomA,float geomB){
    return geomA-calcIntersection(geomA,geomB);
}


/*
几何图形绘制函数
返回值为 1.0 表明给定输入点在几何图形内，返回值为 0.0 表明给定输入点在几何图形外。
如无额外说明，则输入可以为归一化坐标 uv，也可以为像素坐标 fragCoord，但需要保持一致。
*/

//绘制椭圆：椭圆心 center，长轴 majorAxis，短轴 minorAxis，过渡带是否在边界内 smoothInner
float drawEllipse(vec2 pt,vec2 center,float majorAxis,float minorAxis,bool smoothInner){
    if(majorAxis<=0.||minorAxis<=0.){
        return 0.;
    }
    pt=pt-center;
    float xDa=(pt.x*pt.x)/(majorAxis*majorAxis);
    float yDb=(pt.y*pt.y)/(minorAxis*minorAxis);
    
    float value=xDa+yDb;
    return smoothInner?(1.-smoothstep(.9,1.,value)):(1.-smoothstep(1.,1.1,value));
}

//绘制扇形：圆心 center，半径 radius，起始角 thetaStart，结束角 thetaEnd，过渡带是否在边界内 smoothInner
float drawSector(vec2 pt,vec2 center,float radius,float thetaStart,float thetaEnd,bool smoothInner){
    thetaStart=mod(thetaStart,2.*pi);
    thetaEnd=mod(thetaEnd,2.*pi);
    float theta=calcAngle(vec2(1.,0.),pt-center);
    
    //圆周过渡带
    float value=distance(pt,center)/radius;
    float ratioRound=smoothInner?(1.-smoothstep(.9,1.,value)):(1.-smoothstep(1.,1.1,value));
    
    //半径过渡带
    float thickness1=(2.*pi-thetaStart)*.005;
    float thickness2=(2.*pi-thetaEnd)*.005;
    float value1=thetaStart/theta;
    float value2=theta/thetaEnd;
    float ratio1=smoothInner?(1.-smoothstep(1.-thickness1,1.,value1)):(1.-smoothstep(1.,1.+thickness1,value1));
    float ratio2=smoothInner?(1.-smoothstep(1.-thickness2,1.,value2)):(1.-smoothstep(1.,1.+thickness2,value2));
    return thetaStart<thetaEnd?ratioRound*min(ratio1,ratio2):ratioRound*max(ratio1,ratio2);
}

//绘制凸多边形：定点个数 vertexCnt，顶点数组 vertexs
//目前只支持过渡带在边界内
float drawConvexPolygon(vec2 pt,int vertexCnt,vec2[10]vertexs,bool smoothInner){
    if(vertexCnt<3){
        return 0.;
    }
    
    float minDisEdge=iResolution.x*iResolution.y;
    float maxRange=0.;
    bool inLeft=true;
    for(int indexStart=0;indexStart<vertexCnt;indexStart++){
        int indexEnd=int(mod(float(indexStart)+1.,float(vertexCnt)));
        maxRange=max(maxRange,length(vertexs[indexEnd]-vertexs[indexStart]));//计算过渡带范围
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
    return smoothstep(0.,1.,20.*minDisEdge/maxRange);
}

//绘制圆角矩形
float drawRoundRect(vec2 pt,vec2 center,float majorAxis,float minorAxis,bool smoothInner){
    return 0.;
}

//绘制线段：起点 vertexStart，终点 vertexEnd，过渡带单侧宽度 lineWidth，过渡带是否在双侧或只在左侧 smoothBilateral
//输入应为像素坐标 fragCoord
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

//绘制几何图形-一次 pass
void mainImage(out vec4 fragColor,in vec2 fragCoord)
{
    vec2 uv=fragCoord/iResolution.xy;
    float progress=fract(iTime/durationTime);
    
    vec3 colorA=vec3(1.,1.,0.);
    vec3 colorB=vec3(1.,0.,1.);
    vec3 colorBackground=vec3(0.);
    
    // vec2 a[10] = vec2[10](vec2(0.1,0.5),vec2(0.4,0.2),vec2(0.9,0.9),vec2(1.0),vec2(1.0),vec2(1.0),vec2(1.0),vec2(1.0),vec2(1.0),vec2(1.0));
    vec2 a[10]=vec2[10](vec2(.9,.9)*iResolution.xy,vec2(.4,.2)*iResolution.xy,vec2(.1,.1)*iResolution.xy,vec2(.1,.5)*iResolution.xy,vec2(.3,1.)*iResolution.xy,vec2(1.),vec2(1.),vec2(1.),vec2(1.),vec2(1.));
    float x=drawConvexPolygon(fragCoord,5,a,true);
    
    //绘制椭圆
    float ratioEllipse=drawEllipse(fragCoord,vec2(.3,.7)*iResolution.xy,.2*iResolution.x,.2*iResolution.y,false);
    
    float ratio1=drawLineSegment(fragCoord,vec2(.6,.3)*iResolution.xy,vec2(.7,.7)*iResolution.xy,100.,true);
    float ratio2=drawLineSegment(fragCoord,vec2(.6,.3)*iResolution.xy,vec2(.7,.7)*iResolution.xy,100.,false);
    
    vec2[5]vertexsPolygon=calcPentagon(vec2(.5)*iResolution.xy,.2*iResolution.y,progress*2.*pi);
    vec2 vertexs[10]=vec2[10](vertexsPolygon[0],vertexsPolygon[1],vertexsPolygon[2],vertexsPolygon[3],vertexsPolygon[4],vec2(0.),vec2(0.),vec2(0.),vec2(0.),vec2(0.));
    
    //绘制五边形
    float ratioPolygon=drawConvexPolygon(fragCoord,5,vertexs,true);
    
    //绘制扇形
    float ratioSector=drawSector(fragCoord,vec2(.5,.5)*iResolution.xy,.4*iResolution.y,-.5*pi,1.2*pi,false);
    
    // vec3 color=mix(colorBackground,colorA,calcDifference(ratioEllipse,ratioPolygon));
    vec3 color=mix(colorBackground,colorA,ratioSector);
    // if(x ==1.0){
        //     color = colorB;
    // }
    // vec3 color = mix(colorBackground,colorA,x);
    // color = mix(color,colorBackground,round(uv));
    fragColor=vec4(color,1.);
}
