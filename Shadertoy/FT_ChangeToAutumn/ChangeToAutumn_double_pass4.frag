#iChannel0"file://asset/img0.jpg"
#iChannel1"file://RandomTexture.jpg"

const float durationTime=30.;
const float kernelSize=12.;//滤波核单边尺寸
const float pi=3.141592653;
const float sigma=5.;

vec3 maxInRGB(vec3 color){
    float maxValue=max(max(color.r,color.g),color.b);
    return vec3(maxValue);
}

vec3 minInRGB(vec3 color){
    float minValue=min(min(color.r,color.g),color.b);
    return vec3(minValue);
}

//计算权重
float gaussianWeight(float distance){
    return(1./pow(sqrt(2.*pi*pow(sigma,2.)),2.))*exp(-((distance*distance)/(2.*pow(sigma,2.))));
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
        h=-1.;
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
    
    RGB_max=v*1.;
    RGB_min=RGB_max*(1000.-s)/1000.;
    
    i=floor(h/60.);
    difs=mod(h,60.);/* factorial part of h */
    
    
    /* RGB adjustment amount by hue */
    RGB_Adj=(RGB_max-RGB_min)*difs/60.;
    
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

//计算绿色部分的颜色变换
vec4 calcGreen(vec4 colorBase){
    vec4 color_changed=vec4(1.);
    vec3 hsv_changed=rgb2hsv(colorBase.rgb);
    hsv_changed.x=45.+(hsv_changed.x-45.)/10.3;
    hsv_changed.y*=2.5;
    hsv_changed.y=clamp(hsv_changed.y,0.,1000.);
    hsv_changed.z=mix(hsv_changed.z,600.+.4*hsv_changed.z,.4);
    hsv_changed.z*=1.2;
    hsv_changed.z=clamp(hsv_changed.z,0.,1000.);
    color_changed.rgb=hsv2rgb(hsv_changed);
    color_changed.g*=.8;
    color_changed.b*=.8;
    color_changed.rgb*=1.1;
    return color_changed;
}

//计算非绿色部分的颜色变换
vec4 calcUnGreen(vec4 colorBase){
    vec4 color_changed=vec4(1.);
    vec3 hsv_changed=rgb2hsv(colorBase.rgb);
    // hsv_change.y *=1.0;
    // hsv_change.y = clamp(hsv_change.y,0.0,1000.0);
    hsv_changed.z=mix(hsv_changed.z,600.+.4*hsv_changed.z,.4);
    hsv_changed.z=clamp(hsv_changed.z,0.,1000.);
    color_changed.rgb=hsv2rgb(hsv_changed);
    color_changed.rgb*=1.2;
    return color_changed;
}

//判断当前像素是否为绿色部分
float isGreen(vec4 colorBase){
    vec3 hsv=rgb2hsv(colorBase.rgb);
    float ret = 0.0;
    if(hsv.x>45.&&hsv.x<=200.){
        ret = smoothstep(100.0,300.0,hsv.y);
    }
    return ret;
    // return(hsv.x>45.&&hsv.x<=200.&&hsv.y>200.?1.0:0.0);
    // return(hsv.x>45.&&hsv.x<=200.?1.0:0.0);
}

//树叶变黄特效
void mainImage(out vec4 fragColor,in vec2 fragCoord)
{
    vec2 uv=fragCoord/iResolution.xy;
    float progress=fract(iTime/durationTime);
    float time;

    if(progress<0.1){
        time = 0.5*progress;
    }else if(progress<0.9){
        time = 0.05+(progress-0.1)*0.45/0.8;
    }else{
        time = 0.5 + 5.0*(progress - 0.9);
    }
    // time = 0.5;

    //计算显示权重
    float greenWeight=0.;
    vec2 pixelStep=vec2(1.)/iResolution.xy;
    float weight;
    float totalWeight = 0.;
    for(float j=-kernelSize;j<=kernelSize;j++){
        for(float i=-kernelSize;i<=kernelSize;i++){
            weight=gaussianWeight(abs(j)+abs(i));
            totalWeight+=weight;
            greenWeight+=isGreen(texture2D(iChannel0,uv+vec2(i,j)*pixelStep))*weight;
        }
    }
    
    vec4 colorBase=texture2D(iChannel0,uv);
    vec4 colorAutumn=mix(calcUnGreen(colorBase),calcGreen(colorBase),greenWeight/totalWeight);
    
    float mask =texture2D(iChannel1,uv.yx).r;
    // mask = pow(mask,0.5);
    mask=uv.y;
    mask = pow(mask,0.5);
    mask *= smoothstep(-0.5,0.5,time);
    // mask *=time;

    mask  =1.0-mask;
    float mixRatio = smoothstep(1.0*time,5.0*time,1.0*mask);//对于归一化的mask，第一个参数应该与第三个参数保持一致，其与第二个参数的相对大小决定了mask变化的尾部时长
    // float mixRatio = smoothstep(time - 0.3,time,1.0*mask-0.3);//对于归一化的mask，第一个参数应该与第三个参数保持一致，其与第二个参数的相对大小决定了mask变化的尾部时长
    //    float mixRatio = smoothstep(0.3*time,0.5*time,mask);
    //     float mixRatio = step(time,mask);
    // mixRatio = mixRatio* smoothstep(-0.5,0.5,time);
    // mixRatio = 1.0;
    fragColor= mix(colorAutumn,colorBase,mixRatio);

    // fragColor= mix(vec4(vec3(1.0),1.0),vec4(vec3(0.0),1.0),mixRatio);

    // if(mixRatio<=0.1){
    // fragColor=vec4(0.0,1.0,0.0,1.0);
    // }

    // if(mixRatio<=0.0){
    // fragColor=vec4(1.0,0.0,0.0,1.0);
    // }
    // if(mixRatio>=1.0){
    // fragColor=vec4(0.0,0.0,1.0,1.0);
    // }

    // fragColor = vec4(vec3(mask),1.0);

    // fragColor=colorAutumn;
    // fragColor= colorBase;
}