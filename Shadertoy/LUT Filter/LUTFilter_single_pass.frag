#iChannel0"file://test5.jpg"
#iChannel1"file://lut_autumn.jpg"


// LUT 滤镜-一次 pass
void mainImage(out vec4 fragColor,in vec2 fragCoord)
{
    vec2 uv=fragCoord/iResolution.xy;
    vec4 colorRaw = texture2D(iChannel0,uv);

    //取出两个蓝色通道方格
    float blueColor = colorRaw.b * 63.0;
    vec2 quad1;
    quad1.y = floor(floor(blueColor) / 8.0);
    quad1.x = floor(blueColor) - (quad1.y * 8.0);

    vec2 quad2;
    quad2.y = floor(ceil(blueColor) / 7.9999);
    quad2.x = ceil(blueColor) - (quad2.y * 8.0);

    //找到原图颜色对应的 LUT 纹理坐标。
    vec2 texPos1;
    texPos1.x = (quad1.x * 0.125) + 0.5/512.0 + ((0.125 - 1.0/512.0) * colorRaw.r);
    texPos1.y =1.0-((quad1.y * 0.125) + 0.5/512.0 + ((0.125 - 1.0/512.0) * colorRaw.g)) ;

    vec2 texPos2;
    texPos2.x = (quad2.x * 0.125) + 0.5/512.0 + ((0.125 - 1.0/512.0) * colorRaw.r);
    texPos2.y =1.0-((quad2.y * 0.125) + 0.5/512.0 + ((0.125 - 1.0/512.0) * colorRaw.g)) ;

    //查 LUT 表
    vec4 lutColor1 = texture2D(iChannel1, texPos1);
    vec4 lutColor2 = texture2D(iChannel1, texPos2);

    //使用 Mix 方法对 2 个边界像素值进行混合
    vec4 lutColor = mix(lutColor1, lutColor2, fract(blueColor));
    fragColor = mix(colorRaw, vec4(lutColor.rgb, colorRaw.a), 1.0);
}