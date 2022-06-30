#include "denoiser.h"

Denoiser::Denoiser() : m_useTemportal(false) {}

void Denoiser::Reprojection(const FrameInfo &frameInfo) {
    int height = m_accColor.m_height;
    int width = m_accColor.m_width;
    Matrix4x4 preWorldToScreen =
        m_preFrameInfo.m_matrix[m_preFrameInfo.m_matrix.size() - 1];
    Matrix4x4 preWorldToCamera =
        m_preFrameInfo.m_matrix[m_preFrameInfo.m_matrix.size() - 2];
#pragma omp parallel for
    for (int y = 0; y < height; y++) {
        for (int x = 0; x < width; x++) {
            // TODO: Reproject
            m_valid(x, y) = false;
            m_misc(x, y) = Float3(0.f);
        }
    }
    std::swap(m_misc, m_accColor);
}

void Denoiser::TemporalAccumulation(const Buffer2D<Float3> &curFilteredColor) {
    int height = m_accColor.m_height;
    int width = m_accColor.m_width;
    int kernelRadius = 3;
#pragma omp parallel for
    for (int y = 0; y < height; y++) {
        for (int x = 0; x < width; x++) {
            // TODO: Temporal clamp
            Float3 color = m_accColor(x, y);
            // TODO: Exponential moving average
            float alpha = 1.0f;
            m_misc(x, y) = Lerp(color, curFilteredColor(x, y), alpha);
        }
    }
    std::swap(m_misc, m_accColor);
}

Buffer2D<Float3> Denoiser::Filter(const FrameInfo &frameInfo) {
    int height = frameInfo.m_beauty.m_height;
    int width = frameInfo.m_beauty.m_width;
    Buffer2D<Float3> filteredImage = CreateBuffer2D<Float3>(width, height);
    int kernelRadius = 16;
#pragma omp parallel for
    for (int y = 0; y < height; y++) {
        for (int x = 0; x < width; x++) {
            // TODO: Joint bilateral filter
            // houyi 2022.6.30
            // filteredImage(x, y) = frameInfo.m_beauty(x, y);
            int jXStart = std::max(0,x-kernelRadius);
            int jXEnd = std::min(width-1,x+kernelRadius);
            int jYStart = std::max(0,y-kernelRadius);
            int jYEnd = std::min(height-1,y+kernelRadius);
            float weights_sum = 0.0;
            for(int jx = jXStart;jx<=jXEnd;jx++)
            {
                for(int jy=jYStart;jy<=jYEnd;jy++)
                {
                    // 像素距离权重
                    float weight_distance = -SqrDistance(frameInfo.m_position(jx,jy),frameInfo.m_position(x,y))/(2*m_sigmaCoord*m_sigmaCoord);
                    
                    // 像素颜色权重
                    float weight_color = -SqrDistance(frameInfo.m_beauty(jx,jy),frameInfo.m_beauty(x,y))/(2*m_sigmaColor*m_sigmaColor);
                    
                    // 像素法线权重
                    float weight_normal = SafeAcos(Dot(frameInfo.m_normal(jx,jy),frameInfo.m_normal(x,y)));
                    weight_normal = (weight_normal*weight_normal)/(-2*m_sigmaNormal*m_sigmaNormal);
                    
                    // 像素深度权重
                    float weight_plane = 0.0;
                    float distance = Distance(frameInfo.m_position(jx,jy),frameInfo.m_position(x,y));
                    if (distance>0)
                    {
                        weight_plane=std::max(0.0f, Dot(frameInfo.m_normal(x,y),(frameInfo.m_position(jx,jy)-frameInfo.m_position(x,y))/distance));
                    }
                    weight_plane = (weight_plane*weight_plane)/(-2*m_sigmaPlane*m_sigmaPlane);
                    
                    // 像素总 权重
                    float weight = std::exp(weight_distance+weight_color+weight_normal+weight_plane);

                    weights_sum+=weight;
                    filteredImage(x, y) += frameInfo.m_beauty(jx, jy) * weight;
                }
            }

            // 归一化
            if(weights_sum==0)
            {
                filteredImage(x, y) = frameInfo.m_beauty(x, y);
            }
            else
            {
                filteredImage(x, y) /=weights_sum;
            }
        }
    }
    return filteredImage;
}

void Denoiser::Init(const FrameInfo &frameInfo, const Buffer2D<Float3> &filteredColor) {
    m_accColor.Copy(filteredColor);
    int height = m_accColor.m_height;
    int width = m_accColor.m_width;
    m_misc = CreateBuffer2D<Float3>(width, height);
    m_valid = CreateBuffer2D<bool>(width, height);
}

void Denoiser::Maintain(const FrameInfo &frameInfo) { m_preFrameInfo = frameInfo; }

Buffer2D<Float3> Denoiser::ProcessFrame(const FrameInfo &frameInfo) {
    // Filter current frame
    Buffer2D<Float3> filteredColor;
    filteredColor = Filter(frameInfo);

    // Reproject previous frame color to current
    if (m_useTemportal) {
        Reprojection(frameInfo);
        TemporalAccumulation(filteredColor);
    } else {
        Init(frameInfo, filteredColor);
    }

    // Maintain
    Maintain(frameInfo);
    if (!m_useTemportal) {
        m_useTemportal = true;
    }
    return m_accColor;
}
