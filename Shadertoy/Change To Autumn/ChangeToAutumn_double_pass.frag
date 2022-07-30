#iChannel0"file://ChangeToAutumn_green_cutout.frag"
#iChannel1"file://img3.jpg"

const vec3 rgbRatio=vec3(1.5608,.7608,.7608);//色彩调节参数
const float exposure=3.;//过曝参数
const float pi=3.141592653;
const float durationTime=3.;
const int centerCnt=100;

//树叶变黄特效
void mainImage(out vec4 fragColor,in vec2 fragCoord)
{
    vec2 centerCoords[centerCnt];
    centerCoords[0]=vec2(.023975421652507246,.07137818893887209);
    centerCoords[10]=vec2(.020808364886550336,.15652018143191423);
    centerCoords[20]=vec2(.03273875931127098,.23763772566542666);
    centerCoords[30]=vec2(.06035220198742147,.38911967105691264);
    centerCoords[40]=vec2(.09893181190505736,.4773222376690483);
    centerCoords[50]=vec2(.015845128359640893,.5709304627204048);
    centerCoords[60]=vec2(.07193143391423308,.6602133882025758);
    centerCoords[70]=vec2(.005963461100803991,.740895882424638);
    centerCoords[80]=vec2(.026272049875551363,.8152062427191566);
    centerCoords[90]=vec2(.08433384187677785,.9302063821834902);
    
    for(float i=0.;i<10.;i++){
        centerCoords[int(i)]=centerCoords[0]+vec2(.1*i,0.);
        centerCoords[int(i)+10]=centerCoords[10]+vec2(.1*i,0.);
        centerCoords[int(i)+20]=centerCoords[20]+vec2(.1*i,0.);
        centerCoords[int(i)+30]=centerCoords[30]+vec2(.1*i,0.);
        centerCoords[int(i)+40]=centerCoords[40]+vec2(.1*i,0.);
        centerCoords[int(i)+50]=centerCoords[50]+vec2(.1*i,0.);
        centerCoords[int(i)+60]=centerCoords[60]+vec2(.1*i,0.);
        centerCoords[int(i)+70]=centerCoords[70]+vec2(.1*i,0.);
        centerCoords[int(i)+80]=centerCoords[80]+vec2(.1*i,0.);
        centerCoords[int(i)+90]=centerCoords[90]+vec2(.1*i,0.);
    }
    
    vec2 uv=fragCoord/iResolution.xy;
    
    //树叶变黄
    vec4 colorBase=texture2D(iChannel1,uv);
    vec4 colorGreen=texture2D(iChannel0,uv);
    colorGreen.rgb*=rgbRatio;
    vec4 colorAutumn=mix(colorBase,colorGreen,colorGreen.a);
    
    // //过曝特效
    // float exposure =1.0*sin(2.0*pi/durationTime*iTime)+1.0;
    // colorAutumn.rgb=colorAutumn.rgb * (exposure+1.0);
    
    //动态窗
    bool autumn=false;
    for(int i=0;i<centerCnt;i++){
        float dis=length(uv-centerCoords[i]);
        if(dis<.07*mod(iTime,durationTime)/durationTime){
            autumn=true;
            if(dis>.05*mod(iTime,durationTime)/durationTime){
                colorAutumn.rgb=colorAutumn.rgb*(exposure+1.);
                break;
            }
        }
    }
    
    fragColor=autumn?colorAutumn:colorBase;
}