#iChannel0"file://PageFlip_pass_1.png"
// #iChannel0"file://img.jpg"

const float contrastThreshold=.3;
const float relativeThreshold=.3;
const float searchSteps=150.;//搜索步长
const float guessEdge=8.;//未搜索到边界时，猜测的边界距离

//计算亮度
float calcLuma(vec3 color){
    return dot(vec3(.213,.715,.072),color);
}

// FXAA-一次 pass
void mainImage(out vec4 fragColor,in vec2 fragCoord)
{
    vec2 uv=fragCoord/iResolution.xy;
    vec2 texelSize=vec2(3.)/iResolution.xy;
    
    //计算周围八点亮度
    vec4 origin=texture2D(iChannel0,uv);
    float lumaM=calcLuma(origin.rgb);
    float lumaE=calcLuma(texture2D(iChannel0,uv+vec2(texelSize.x,0)).rgb);
    float lumaN=calcLuma(texture2D(iChannel0,uv+vec2(0,texelSize.y)).rgb);
    float lumaW=calcLuma(texture2D(iChannel0,uv+vec2(-texelSize.x,0)).rgb);
    float lumaS=calcLuma(texture2D(iChannel0,uv+vec2(0,-texelSize.y)).rgb);
    float lumaNW=calcLuma(texture2D(iChannel0,uv+vec2(-texelSize.x,texelSize.y)).rgb);
    float lumaNE=calcLuma(texture2D(iChannel0,uv+vec2(texelSize.x,texelSize.y)).rgb);
    float lumaSW=calcLuma(texture2D(iChannel0,uv+vec2(-texelSize.x,-texelSize.y)).rgb);
    float lumaSE=calcLuma(texture2D(iChannel0,uv+vec2(texelSize.x,-texelSize.y)).rgb);
    
    float maxLuma=max(max(max(lumaN,lumaS),max(lumaW,lumaE)),lumaM);
    float minLuma=min(min(min(lumaN,lumaS),min(lumaW,lumaE)),lumaM);
    float contrast=maxLuma-minLuma;
    
    //通过确定水平和垂直方向上像素点的亮度差，来计算对比度。当对比度较大时，认为处于边缘，需要进行抗锯齿处理。
    if(contrast<max(contrastThreshold,maxLuma*relativeThreshold)){
        fragColor=origin;
        // fragColor = vec4(0.0,0.0,0.0,1.0);
    }else{
        //计算混合方向（如果水平方向的亮度变化较大，则锯齿边界是垂直的，应沿水平方向进行混合；如果垂直方向的亮度变化较大，则锯齿边界是水平的，应沿垂直方向进行混合）
        float vertical=abs(lumaN+lumaS-2.*lumaM)*2.+abs(lumaNE+lumaSE-2.*lumaE)+abs(lumaNW+lumaSW-2.*lumaW);
        float horizontal=abs(lumaE+lumaW-2.*lumaM)*2.+abs(lumaNE+lumaNW-2.*lumaN)+abs(lumaSE+lumaSW-2.*lumaS);
        bool isHorizontal=vertical>horizontal;
        vec2 lumaStep=isHorizontal?vec2(0.,texelSize.y):vec2(texelSize.x,0.);
        
        float positive=abs((isHorizontal?lumaN:lumaE)-lumaM);
        float negative=abs((isHorizontal?lumaS:lumaW)-lumaM);
        
        //计算锯齿两侧的亮度变化的梯度值
        float gradient,oppositeLuminance;
        if(positive>negative){
            gradient=positive;
            oppositeLuminance=isHorizontal?lumaN:lumaE;
        }else{
            lumaStep=-lumaStep;
            gradient=negative;
            oppositeLuminance=isHorizontal?lumaS:lumaW;
        }
        
        //计算基于亮度的混合系数
        float lumaAvg=2.*(lumaN+lumaE+lumaS+lumaW)+lumaNE+lumaNW+lumaSE+lumaSW;
        lumaAvg=lumaAvg/12.;
        float lumaBlendRatio=clamp(abs(lumaAvg-lumaM)/contrast,0.,1.);
        lumaBlendRatio=smoothstep(0.,1.,lumaBlendRatio);
        lumaBlendRatio=lumaBlendRatio*lumaBlendRatio;
        
        //计算基于边界的混合系数
        vec2 uvEdge=uv;
        uvEdge+=lumaStep*.5f;
        vec2 edgeStep=isHorizontal?vec2(texelSize.x,0):vec2(0,texelSize.y);
        
        //沿着锯齿边界两侧，进行搜索，找到锯齿的边界
        float edgeLuminance=(lumaM+oppositeLuminance)*.5;
        float gradientThreshold=gradient*.25;
        float pLuminanceDelta,nLuminanceDelta,pDistance,nDistance;
        float i;
        //沿着锯齿方向搜索
        for(i=1.;i<=searchSteps;i++){
            pLuminanceDelta=calcLuma(texture2D(iChannel0,uvEdge+i*edgeStep).rgb)-edgeLuminance;
            if(abs(pLuminanceDelta)>gradientThreshold){
                pDistance=i*(isHorizontal?edgeStep.x:edgeStep.y);
                break;
            }
        }
        if(i==searchSteps+1.){
            pDistance=(isHorizontal?edgeStep.x:edgeStep.y)*guessEdge;
        }
        //沿着另一侧锯齿方向搜索
        for(i=1.;i<=searchSteps;i++){
            nLuminanceDelta=calcLuma(texture2D(iChannel0,uvEdge-i*edgeStep).rgb)-edgeLuminance;
            if(abs(nLuminanceDelta)>gradientThreshold){
                nDistance=i*(isHorizontal?edgeStep.x:edgeStep.y);
                break;
            }
        }
        if(i==searchSteps+1.){
            nDistance=(isHorizontal?edgeStep.x:edgeStep.y)*guessEdge;
        }
        
        float edgeBlendRatio;
        //根据相对距离计算基于边界的混合系数
        if(pDistance<nDistance){
            if(sign(pLuminanceDelta)==sign(lumaM-edgeLuminance)){
                edgeBlendRatio=0.;
            }else{
                edgeBlendRatio=.5-pDistance/(pDistance+nDistance);
            }
        }else{
            if(sign(nLuminanceDelta)==sign(lumaM-edgeLuminance)){
                edgeBlendRatio=0.;
            }else{
                edgeBlendRatio=.5-nDistance/(pDistance+nDistance);
            }
        }
        
        float blendRatio=max(lumaBlendRatio,edgeBlendRatio);
        fragColor=texture2D(iChannel0,uv+lumaStep*blendRatio);
        // fragColor=vec4(1.,0.,0.,1.);
    }
}