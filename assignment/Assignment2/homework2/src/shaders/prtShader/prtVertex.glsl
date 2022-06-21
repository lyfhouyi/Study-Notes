// 在顶点着色器中计算颜色，插值后送入片元着色器 houyi 2022.6.21
attribute vec3 aVertexPosition;
attribute mat3 aPrecomputeLT; // 矩阵的9个元素分别对应9个基函数系数。

uniform mat4 uModelMatrix;
uniform mat4 uViewMatrix;
uniform mat4 uProjectionMatrix;

uniform mat3 uPrecomputeLR; // 矩阵的9个元素分别对应红色值的9个基函数系数。
uniform mat3 uPrecomputeLG; // 矩阵的9个元素分别对应绿色值的9个基函数系数。
uniform mat3 uPrecomputeLB; // 矩阵的9个元素分别对应蓝色值的9个基函数系数。

varying vec3 vColor;

vec3 SHrecon(mat3 uPrecomputeLR, mat3 uPrecomputeLG, mat3 uPrecomputeLB, mat3 aPrecomputeLT){
    // result 的计算方式为：逐通道，uPrecomputeL* 与 aPrecomputeLT 矩阵元素值对应相乘。
    vec3 result = vec3(uPrecomputeLR[0][0], uPrecomputeLG[0][0], uPrecomputeLB[0][0]) * aPrecomputeLT[0][0] +
        vec3(uPrecomputeLR[0][1], uPrecomputeLG[0][1], uPrecomputeLB[0][1]) * aPrecomputeLT[0][1] +
        vec3(uPrecomputeLR[0][2], uPrecomputeLG[0][2], uPrecomputeLB[0][2]) * aPrecomputeLT[0][2] +
        vec3(uPrecomputeLR[1][0], uPrecomputeLG[1][0], uPrecomputeLB[1][0]) * aPrecomputeLT[1][0] +
        vec3(uPrecomputeLR[1][1], uPrecomputeLG[1][1], uPrecomputeLB[1][1]) * aPrecomputeLT[1][1] +
        vec3(uPrecomputeLR[1][2], uPrecomputeLG[1][2], uPrecomputeLB[1][2]) * aPrecomputeLT[1][2] +
        vec3(uPrecomputeLR[2][0], uPrecomputeLG[2][0], uPrecomputeLB[2][0]) * aPrecomputeLT[2][0] +
        vec3(uPrecomputeLR[2][1], uPrecomputeLG[2][1], uPrecomputeLB[2][1]) * aPrecomputeLT[2][1] +
        vec3(uPrecomputeLR[2][2], uPrecomputeLG[2][2], uPrecomputeLB[2][2]) * aPrecomputeLT[2][2];
    return result;
}


void main(void){
  gl_Position = uProjectionMatrix * uViewMatrix * uModelMatrix *
                vec4(aVertexPosition, 1.0);
  vec3 color = SHrecon(uPrecomputeLR, uPrecomputeLG, uPrecomputeLB, aPrecomputeLT);
  vColor = color;
}