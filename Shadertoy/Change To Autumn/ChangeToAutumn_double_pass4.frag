#iChannel0"file://img2.jpg"
#iChannel1"file://RandomTexture.jpg"

const float durationTime=4.;

vec3 maxInRGB(vec3 color){
    float maxValue=max(max(color.r,color.g),color.b);
    return vec3(maxValue);
}

vec3 minInRGB(vec3 color){
    float minValue=min(min(color.r,color.g),color.b);
    return vec3(minValue);
}

// RGB 转 HSV
//输入范围：0.0~1.0
//输出范围：H:0~360  S:0~1000  V:1000
vec3 rgb2hsv(vec3 colorRGB){
    float minRGB=minInRGB(colorRGB).x;
    float maxRGB=maxInRGB(colorRGB).x;
    float deltaRGB=maxRGB-minRGB;
    float h;
    float s=maxRGB==0.?0.:deltaRGB/maxRGB;
    float v=maxRGB;
    
    if(s<=0.){
        h=-1.f;
    }else{
        if(colorRGB.r==maxRGB){
            h=(colorRGB.g-colorRGB.b)/deltaRGB;
        }else if(colorRGB.g==maxRGB){
            h=2.+(colorRGB.b-colorRGB.r)/deltaRGB;
        }else if(colorRGB.b==maxRGB){
            h=4.+(colorRGB.r-colorRGB.g)/deltaRGB;
        }
    }
    
    h=mod(h*60.+360.,360.);
    return vec3(h,s*1000.,v*1000.);
}

// HSV 转 RGB
//输入范围：H:0~360  S:0~1000  V:1000
//输出范围：0.0~1.0
vec3 hsv2rgb(vec3 colorHSV){
    float h=colorHSV.x;
    float s=colorHSV.y;
    float v=colorHSV.z;
    float RGB_min,RGB_max,RGB_Adj;
    float i,difs;
    vec3 ret;
    
    if(h>=360.){
        h=0.;
    }
    
    RGB_max=v*1.f;
    RGB_min=RGB_max*(1000.-s)/1000.f;
    
    i=floor(h/60.);
    difs=mod(h,60.);/* factorial part of h */
    
    
    /* RGB adjustment amount by hue */
    RGB_Adj=(RGB_max-RGB_min)*difs/60.f;
    
    switch(int(i)){
        case 0:
        ret.r=RGB_max;
        ret.g=RGB_min+RGB_Adj;
        ret.b=RGB_min;
        break;
        
        case 1:
        ret.r=RGB_max-RGB_Adj;
        ret.g=RGB_max;
        ret.b=RGB_min;
        break;
        
        case 2:
        ret.r=RGB_min;
        ret.g=RGB_max;
        ret.b=RGB_min+RGB_Adj;
        break;
        
        case 3:
        ret.r=RGB_min;
        ret.g=RGB_max-RGB_Adj;
        ret.b=RGB_max;
        break;
        
        case 4:
        ret.r=RGB_min+RGB_Adj;
        ret.g=RGB_min;
        ret.b=RGB_max;
        break;
        
        default:// case 5:
        ret.r=RGB_max;
        ret.g=RGB_min;
        ret.b=RGB_max-RGB_Adj;
        break;
    }
    
    ret/=1000.;
    
    clamp(ret,vec3(0.),vec3(1.));
    return ret;
}

//树叶变黄特效
void mainImage(out vec4 fragColor,in vec2 fragCoord)
{
    vec2 uv=fragCoord/iResolution.xy;
    float time=sin(iTime/durationTime)+1.;
    
    vec4 colorBase=texture2D(iChannel0,uv);
    vec3 hsv=rgb2hsv(colorBase.rgb);
    
    //色彩变换
    if(hsv.x>45.&&hsv.x<=165.){
        hsv.x=56.25-hsv.x/4.;
        hsv.y*=1.3;
        // hsv.z *= 1.2;
        // hsv.z = 0.0;
    }
    vec4 colorAutumn=vec4(1.);
    colorAutumn.rgb=hsv2rgb(hsv);
    
    //溶解显示
    float mixRatio=smoothstep(.7*time,1.*time,texture2D(iChannel1,uv).r);
    fragColor=mix(colorAutumn,colorBase,mixRatio);
    // fragColor= colorAutumn;
}