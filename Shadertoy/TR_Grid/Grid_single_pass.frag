#iChannel0"file://asset/img10.jpg"
#iChannel1"file://asset/img11.jpg"
#iChannel2"file://asset/img12.jpg"
#iChannel3"file://asset/img13.jpg"
#iChannel4"file://asset/img14.jpg"
#iChannel5"file://asset/img15.jpg"
#iChannel6"file://asset/img16.jpg"
#iChannel7"file://asset/img17.jpg"
#iChannel8"file://asset/img18.jpg"
#iChannel9"file://asset/img19.jpg"

const float durationTime=36.;
const float pi=3.141592653;
const float rowCnt=3.;//行数
const float colCnt=4.;//列数

//网格-一次 pass
void mainImage(out vec4 fragColor,in vec2 fragCoord)
{
    vec2 uv=fragCoord/iResolution.xy;
    float progress=fract(iTime/durationTime);
    float time=progress;
    
    //行优先遍历各网格块
    float selectRowIndex=floor(rowCnt-time*rowCnt);//选中的行索引
    float selectColIndex=floor(fract(time*rowCnt)*colCnt);//选中的列索引
    float selectProgress=1.-(.5+.5*cos(2.*pi*time*rowCnt*colCnt));//单次选中进度
    
    float selectWidth=mix(1./colCnt,1.,selectProgress);//选中的宽度
    float unSelectWidth=(1.-selectWidth)/(colCnt-1.);//未被选中的宽度
    float selectHeight=mix(1./rowCnt,1.,selectProgress);//选中的高度
    float unSelectHeight=(1.-selectHeight)/(rowCnt-1.);//未被选中的高度
    
    float curRowIndex;//当前的行索引
    float curColIndex;//当前的列索引
    
    float edgeRowLeft=0.;
    float edgeRowRight=0.;
    float edgeColDown=0.;
    float edgeColUp=0.;
    //判断当前像素所属块的行索引
    for(float i=0.;i<rowCnt;i++){
        edgeColDown=edgeColUp;
        edgeColUp=edgeColDown+(i==selectRowIndex?selectHeight:unSelectHeight);
        if(uv.y>=edgeColDown&&uv.y<edgeColUp){
            curRowIndex=i;
            uv.y=(uv.y-edgeColDown)/(edgeColUp-edgeColDown);//基于块纵向尺寸矫正纵向纹理坐标
            break;
        }
    }
    //判断当前像素所属块的列索引
    for(float i=0.;i<colCnt;i++){
        edgeRowLeft=edgeRowRight;
        edgeRowRight=edgeRowLeft+(i==selectColIndex?selectWidth:unSelectWidth);
        if(uv.x>=edgeRowLeft&&uv.x<edgeRowRight){
            curColIndex=i;
            uv.x=(uv.x-edgeRowLeft)/(edgeRowRight-edgeRowLeft);//基于块横向尺寸矫正横向纹理坐标
            break;
        }
    }
    
    float colorIndex=mod(curRowIndex*colCnt+curColIndex,10.);
    vec2 textureResolution=iChannelResolution[int(colorIndex)].xy;//纹理尺寸
    vec2 blockResolution=vec2((edgeRowRight-edgeRowLeft)*iResolution.x,(edgeColUp-edgeColDown)*iResolution.y);//所属块尺寸
    float textureAspect=textureResolution.x/textureResolution.y;//纹理宽高比
    float curBlockAspect=blockResolution.x/blockResolution.y;//所属块宽高比
    
    //根据所属块宽高比调整纹理尺寸，使纹理充分平铺于所属块
    if(curBlockAspect>textureAspect){
        textureResolution.x=blockResolution.x;
        textureResolution.y=textureResolution.x/textureAspect;
    }else{
        textureResolution.y=blockResolution.y;
        textureResolution.x=textureResolution.y*textureAspect;
    }
    
    //调整当前像素基于所属块的相对坐标，使纹理在所属块中居中显示
    vec2 fragCoord_blockResolutionBased=uv*blockResolution;//当前像素基于所属块的相对坐标
    vec2 diffResolution=blockResolution-textureResolution;
    vec2 foregroundCoord=fragCoord_blockResolutionBased-.5*diffResolution;
    vec2 foregroundUv=foregroundCoord/textureResolution;
    
    vec3[]colors=vec3[10](texture2D(iChannel0,foregroundUv).rgb,texture2D(iChannel1,foregroundUv).rgb,texture2D(iChannel2,foregroundUv).rgb,texture2D(iChannel3,foregroundUv).rgb,texture2D(iChannel4,foregroundUv).rgb,texture2D(iChannel5,foregroundUv).rgb,texture2D(iChannel6,foregroundUv).rgb,texture2D(iChannel7,foregroundUv).rgb,texture2D(iChannel8,foregroundUv).rgb,texture2D(iChannel9,foregroundUv).rgb);
    vec3 color=colors[int(colorIndex)];
    
    fragColor=vec4(color,1.);
}