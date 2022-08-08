#iChannel0"file://RandomTexture.jpg"

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    float progress = fract(iTime/5.0);
    vec2 uv = fragCoord/iResolution.xy;
    float mask = texture2D(iChannel0,uv).r;
    float mixRatio = smoothstep(1.0*progress,1.0*progress,mask);

    fragColor=mix(vec4(vec3(1.0),1.0),vec4(vec3(0.0),1.0),mixRatio);

}