#iChannel0"file://img2.jpg"

#define r 0.3
#define rep 3.0
//高斯模糊-一次 pass
void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    float R = r * iResolution.x; // radius of rolling cylinder
    
    float v = 1.5 * iResolution.x / rep;
    
    float time = fract(iTime / rep);
    // time = 0.9;÷
    vec2 s = fragCoord; // pixel coordinates
    
    vec2 u = normalize(vec2(5.0, 1.0)); // direction of movement
    
    vec2 o = vec2(time *rep* v, 0.0); // origin of cylinder
    
    float d = dot(s - o, u); // distance to generator of cylinder
    
    vec2 h = s - u * d; // projection on generator
    
    bool onCylinder = abs(d) < R;
    // if(onCylinder){
    //     fragColor=vec4(1.0,0.0,0.0,1.0);
    // }else{
    //     fragColor=vec4(0.0,1.0,0.0,1.0);
    // }

    
    float angle = onCylinder ? asin(d / R) : 0.0;
    
    bool neg = d < 0.0;
    
    float a0 = 3.141592653 + angle;
    
    float a = onCylinder ? (neg ? -angle : (3.141592653 + angle)) : 0.0; // angle
    
    float l = R * a; // length of arc
    
    vec2 p = h - u * l; // unwrapped point from cylinder to plane
    
    bool outside = any(lessThan(p, vec2(0.0))) || any(greaterThan(p, iResolution.xy));
    
    // if(outside){
    //     fragColor=vec4(1.0,0.0,0.0,1.0);
    // }else{
    //     fragColor=vec4(0.0,1.0,0.0,1.0);
    // }


    bool previous = (!onCylinder ||outside) && neg;
    
    vec4 color = (previous ? mix(0.1, 1.0, time): 1.0) * texture(iChannel0, (!onCylinder || outside ? fragCoord : p) / iResolution.xy);
 
    l = R * a0; // length of arc
    
    p = h - u * l; // unwrapped point from cylinder to plane
    
    outside = any(lessThan(p, vec2(0.0))) || any(greaterThan(p, iResolution.xy));
    
    color = outside || !onCylinder ? color : texture(iChannel0, p / iResolution.xy);
    
    // Output to screen
    
    fragColor = color;
    if(outside)
        fragColor=vec4(1.0,0.0,0.0,0.3);

}