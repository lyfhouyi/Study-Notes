//
// Created by LEI XU on 4/27/19.
//

#ifndef RASTERIZER_TEXTURE_H
#define RASTERIZER_TEXTURE_H
#include "global.hpp"
#include <eigen3/Eigen/Eigen>
#include <opencv2/opencv.hpp>
class Texture{
private:
    cv::Mat image_data;

public:
    Texture(const std::string& name)
    {
        image_data = cv::imread(name);
        cv::cvtColor(image_data, image_data, cv::COLOR_RGB2BGR);
        width = image_data.cols;
        height = image_data.rows;
    }

    int width, height;

    Eigen::Vector3f getColor(float u, float v)
    {
        auto u_img = u * width;
        auto v_img = (1 - v) * height;
        auto color = image_data.at<cv::Vec3b>(v_img, u_img);
        return Eigen::Vector3f(color[0], color[1], color[2]);
    }

    // houyi 2021.12.14
    Eigen::Vector3f getColorBilinear(float u, float v)
    {
        auto u_img = u * width;
        auto v_img = (1 - v) * height;
        int uf=floor(u_img);
        int uc=ceil(u_img);
        int vf=floor(v_img);
        int vc=ceil(v_img);
        // std::cout<<"================="<<std::endl;
        // std::cout<<"u = %f"<<u_img<<std::endl;
        // std::cout<<"uc = %d"<<uc<<std::endl;
        // std::cout<<"uf = %d"<<uf<<std::endl;
        // std::cout<<"v = %f"<<v_img<<std::endl;
        // std::cout<<"vc = %d"<<vc<<std::endl;
        // std::cout<<"vf = %d"<<vf<<std::endl;

        auto color_11 = image_data.at<cv::Vec3b>(vc, uc);
        auto color_10 = image_data.at<cv::Vec3b>(vf, uc);
        auto color_01 = image_data.at<cv::Vec3b>(vc, uf);
        auto color_00 = image_data.at<cv::Vec3b>(vf, uf);

        float s = u_img-uf;
        float t = v_img-vf;
        auto color_0= myLerp(s,color_00,color_10);
        auto color_1= myLerp(s,color_01,color_11);
        auto color= myLerp(t,color_0,color_1);

        return Eigen::Vector3f(color[0], color[1], color[2]);
    }

private:
    // houyi 2021.12.14
    cv::Vec3b myLerp(float x, cv::Vec3b colorA, cv::Vec3b colorB)
    {
        return colorA+x*(colorB-colorA);
    }
};
#endif //RASTERIZER_TEXTURE_H
