#ifdef GL_ES
precision highp float;
#endif

uniform vec3 uLightDir;
uniform vec3 uCameraPos;
uniform vec3 uLightRadiance;
uniform sampler2D uGDiffuse;
uniform sampler2D uGDepth;
uniform sampler2D uGNormalWorld;
uniform sampler2D uGShadow;
uniform sampler2D uGPosWorld;

varying mat4 vWorldToScreen;
varying highp vec4 vPosWorld;

#define M_PI 3.1415926535897932384626433832795
#define TWO_PI 6.283185307
#define INV_PI .31830988618
#define INV_TWO_PI .15915494309

float Rand1(inout float p){
  p=fract(p*.1031);
  p*=p+33.33;
  p*=p+p;
  return fract(p);
}

vec2 Rand2(inout float p){
  return vec2(Rand1(p),Rand1(p));
}

float InitRand(vec2 uv){
  vec3 p3=fract(vec3(uv.xyx)*.1031);
  p3+=dot(p3,p3.yzx+33.33);
  return fract((p3.x+p3.y)*p3.z);
}

vec3 SampleHemisphereUniform(inout float s,out float pdf){
  vec2 uv=Rand2(s);
  float z=uv.x;
  float phi=uv.y*TWO_PI;
  float sinTheta=sqrt(1.-z*z);
  vec3 dir=vec3(sinTheta*cos(phi),sinTheta*sin(phi),z);
  pdf=INV_TWO_PI;
  return dir;
}

vec3 SampleHemisphereCos(inout float s,out float pdf){
  vec2 uv=Rand2(s);
  float z=sqrt(1.-uv.x);
  float phi=uv.y*TWO_PI;
  float sinTheta=sqrt(uv.x);
  vec3 dir=vec3(sinTheta*cos(phi),sinTheta*sin(phi),z);
  pdf=z*INV_PI;
  return dir;
}

void LocalBasis(vec3 n,out vec3 b1,out vec3 b2){
  float sign_=sign(n.z);
  if(n.z==0.){
    sign_=1.;
  }
  float a=-1./(sign_+n.z);
  float b=n.x*n.y*a;
  b1=vec3(1.+sign_*n.x*n.x*a,sign_*b,-sign_*n.x);
  b2=vec3(b,sign_+n.y*n.y*a,-n.y);
}

vec4 Project(vec4 a){
  return a/a.w;
}

float GetDepth(vec3 posWorld){
  float depth=(vWorldToScreen*vec4(posWorld,1.)).w;
  return depth;
}

/*
* Transform point from world space to screen space([0, 1] x [0, 1])
*
*/
vec2 GetScreenCoordinate(vec3 posWorld) {
  vec2 uv = Project(vWorldToScreen * vec4(posWorld, 1.0)).xy * 0.5 + 0.5;
  return uv;
}

float GetGBufferDepth(vec2 uv) {
  float depth = texture2D(uGDepth, uv).x;
  if (depth < 1e-2) {
    depth = 1000.0;
  }
  return depth;
}

vec3 GetGBufferNormalWorld(vec2 uv) {
  vec3 normal = texture2D(uGNormalWorld, uv).xyz;
  return normal;
}

vec3 GetGBufferPosWorld(vec2 uv) {
  vec3 posWorld = texture2D(uGPosWorld, uv).xyz;
  return posWorld;
}

float GetGBufferuShadow(vec2 uv) {
  float visibility = texture2D(uGShadow, uv).x;
  return visibility;
}

vec3 GetGBufferDiffuse(vec2 uv) {
  vec3 diffuse = texture2D(uGDiffuse, uv).xyz;
  diffuse = pow(diffuse, vec3(2.2));
  return diffuse;
}

/*
* Evaluate diffuse bsdf value.
*
* wi, wo are all in world space.
* uv is in screen space, [0, 1] x [0, 1].
*
*/
vec3 EvalDiffuse(vec3 wi, vec3 wo, vec2 uv) {
  vec3 L = vec3(0.0);
  
  // houyi 2022.6.23
  L = GetGBufferDiffuse(uv);
  L *= uLightRadiance;

  vec3 normal = GetGBufferNormalWorld(uv);
  normal = normalize(normal);
  wi = normalize(wi);

  return L * dot(normal, wi) / M_PI;
}

/*
* Evaluate directional light with shadow map
* uv is in screen space, [0, 1] x [0, 1].
*
*/
vec3 EvalDirectionalLight(vec2 uv){
  vec3 Le=vec3(0.);
  // houyi 2022.6.23
  float visibility = GetGBufferuShadow(uv); // 计算可见性

  //vec3 posWorld = GetGBufferPosWorld(uv); // 计算世界坐标下的位置

  Le = EvalDiffuse(uLightDir,vec3(0.0),uv);
  Le *= visibility;
  return Le;
}

// houyi 2022.6.24
// 判断位置（世界坐标）是否离开屏幕范围
bool outScreen(vec3 posWorld){
  vec2 uv = GetScreenCoordinate(posWorld);
  return any(greaterThan(uv,vec2(1.0))) || any(lessThan(uv,vec2(0.0)));
}

// houyi 2022.6.24
// 判断位置（世界坐标）是否在物体外部/通过深度测试。
bool atFront(vec3 posWorld){
  return GetDepth(posWorld)<GetGBufferDepth(GetScreenCoordinate(posWorld.xyz));
}

// bool RayMarch(vec3 ori,vec3 dir,out vec3 hitPos){
//   // houyi 2022.6.24
//   float stepRatio = 1.0 / 30.0;
//   vec3 netPos = ori + stepRatio * dir;

//   for(int i=0;i<1;i+=0)
//   {
//     if(!atFront(netPos))
//     {
//       // 未通过深度测试
//       hitPos = netPos - stepRatio * dir;
//       return true;
//     }
//     if(outScreen(netPos))
//     {
//       // 不相交
//       return false;
//     }
//     netPos += stepRatio * dir;
//   }
// }

// houyi 2022.6.25
bool RayMarch(vec3 ori, vec3 dir, out vec3 hitPos) {
  dir /= 30.0;
  for (int i = 0; i < 150; i++) {
    vec2 uv = GetScreenCoordinate(ori);
    float curDepth = GetDepth(ori);
    float recordDepth = GetGBufferDepth(uv);
    if (curDepth - 0.01 > recordDepth) {
      hitPos = ori;
      return true;
    }
    ori += dir;
  }
  return false;
}

#define SAMPLE_NUM 1

// houyi 2022.6.25 
// void main(){
//   float s = InitRand(gl_FragCoord.xy);
  
//   vec3 L = vec3(0.);

//   // houyi 2022.6.23
//   L = EvalDirectionalLight(GetScreenCoordinate(vPosWorld.xyz));
//   vec3 color = pow(clamp(L,vec3(0.),vec3(1.)),vec3(1./2.2));
//   gl_FragColor = vec4(vec3(color.rgb),1.);
// }


void main() {
  // houyi 2022.6.25 
  float s = InitRand(gl_FragCoord.xy);
  vec2 uv = GetScreenCoordinate(vPosWorld.xyz);
  vec3 L_indir = vec3(0.0);
  vec3 b1, b2, bufferNormal;
  bufferNormal = GetGBufferNormalWorld(uv);
  LocalBasis(bufferNormal, b1, b2);
  mat3 worldToLocal = mat3(bufferNormal, b1, b2);
  for (int i = 0; i < SAMPLE_NUM; i++) {
    float pdf;
    vec3 worldPos = GetGBufferPosWorld(uv);
    vec3 light2Cam = uCameraPos - worldPos;
    vec3 dir = normalize(worldToLocal * SampleHemisphereUniform(s, pdf));
    // vec3 dir = normalize(reflect(-light2Cam, GetGBufferNormalWorld(uv)));
    vec3 hitPos;
    if (dot(dir, bufferNormal) > 0.0 && RayMarch(worldPos, dir, hitPos)) {
      vec3 lightReflect = worldPos - hitPos;
      vec2 uvReflect = GetScreenCoordinate(hitPos);
      L_indir += (EvalDiffuse(uLightDir, light2Cam, uv) / pdf) * EvalDiffuse(uLightDir, lightReflect, uvReflect) * EvalDirectionalLight(uvReflect);
      // L_indir += EvalDirectionalLight(uvReflect);
    }
    
  }
  L_indir /= float(SAMPLE_NUM);
  vec3 L = EvalDirectionalLight(uv);
  L += L_indir;
  vec3 color = pow(clamp(L, vec3(0.0), vec3(1.0)), vec3(1.0 / 2.2));
  gl_FragColor = vec4(vec3(color.rgb), 1.0);
}
