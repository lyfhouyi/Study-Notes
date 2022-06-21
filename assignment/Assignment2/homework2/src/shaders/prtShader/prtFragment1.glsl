// 在片元着色器中计算颜色 houyi 2022.6.20
#ifdef GL_ES
precision mediump float;
#endif

uniform mat3 uPrecomputeLR; // 矩阵的9个元素分别对应红色值的9个基函数系数。
uniform mat3 uPrecomputeLG; // 矩阵的9个元素分别对应绿色值的9个基函数系数。
uniform mat3 uPrecomputeLB; // 矩阵的9个元素分别对应蓝色值的9个基函数系数。

varying highp mat3 vPrecomputeLT; // 矩阵的9个元素分别对应9个基函数系数。

vec3 SHrecon(mat3 uPrecomputeLR, mat3 uPrecomputeLG, mat3 uPrecomputeLB, mat3 vPrecomputeLT){
    // result 的计算方式为：逐通道，uPrecomputeL* 与 vPrecomputeLT 矩阵元素值对应相乘。
    vec3 result = vec3(uPrecomputeLR[0][0], uPrecomputeLG[0][0], uPrecomputeLB[0][0]) * vPrecomputeLT[0][0] +
        vec3(uPrecomputeLR[0][1], uPrecomputeLG[0][1], uPrecomputeLB[0][1]) * vPrecomputeLT[0][1] +
        vec3(uPrecomputeLR[0][2], uPrecomputeLG[0][2], uPrecomputeLB[0][2]) * vPrecomputeLT[0][2] +
        vec3(uPrecomputeLR[1][0], uPrecomputeLG[1][0], uPrecomputeLB[1][0]) * vPrecomputeLT[1][0] +
        vec3(uPrecomputeLR[1][1], uPrecomputeLG[1][1], uPrecomputeLB[1][1]) * vPrecomputeLT[1][1] +
        vec3(uPrecomputeLR[1][2], uPrecomputeLG[1][2], uPrecomputeLB[1][2]) * vPrecomputeLT[1][2] +
        vec3(uPrecomputeLR[2][0], uPrecomputeLG[2][0], uPrecomputeLB[2][0]) * vPrecomputeLT[2][0] +
        vec3(uPrecomputeLR[2][1], uPrecomputeLG[2][1], uPrecomputeLB[2][1]) * vPrecomputeLT[2][1] +
        vec3(uPrecomputeLR[2][2], uPrecomputeLG[2][2], uPrecomputeLB[2][2]) * vPrecomputeLT[2][2];
    return result;
}

void main(void){    
    vec3 result = SHrecon(uPrecomputeLR, uPrecomputeLG, uPrecomputeLB, vPrecomputeLT);
    gl_FragColor = vec4(result,1);
}