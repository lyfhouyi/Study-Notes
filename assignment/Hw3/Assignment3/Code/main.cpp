#include <iostream>
#include <opencv2/opencv.hpp>

#include "global.hpp"
#include "rasterizer.hpp"
#include "Triangle.hpp"
#include "Shader.hpp"
#include "Texture.hpp"
#include "OBJ_Loader.h"

Eigen::Matrix4f get_view_matrix(Eigen::Vector3f eye_pos)
{
    Eigen::Matrix4f view = Eigen::Matrix4f::Identity();

    Eigen::Matrix4f translate;
    translate << 1,0,0,-eye_pos[0],
                 0,1,0,-eye_pos[1],
                 0,0,1,-eye_pos[2],
                 0,0,0,1;

    view = translate*view;

    return view;
}

Eigen::Matrix4f get_model_matrix(float angle)
{
    Eigen::Matrix4f rotation;
    angle = angle * MY_PI / 180.f;
    std::cout<<angle<<std::endl; // houyi 2021.12.9
    rotation << cos(angle), 0, sin(angle), 0,
                0, 1, 0, 0,
                -sin(angle), 0, cos(angle), 0,
                0, 0, 0, 1;

    Eigen::Matrix4f scale;
    scale << 2.5, 0, 0, 0,
              0, 2.5, 0, 0,
              0, 0, 2.5, 0,
              0, 0, 0, 1;

    Eigen::Matrix4f translate;
    translate << 1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1;

    return translate * rotation * scale;
}

Eigen::Matrix4f get_projection_matrix(float eye_fov, float aspect_ratio, float zNear, float zFar)
{
    // TODO: Use the same projection matrix from the previous assignments

    // houyi 2021.12.9
    Eigen::Matrix4f projection = Eigen::Matrix4f::Identity();

    // TODO: Implement this function
    // Create the projection matrix for the given parameters.
    // Then return it.

    // houyi 2021.12.2
    float t = std::abs(zNear) * std::tan(eye_fov / 2.0);
    float b = -t;
    float r = t * aspect_ratio;
    float l = -r;
    Eigen::Matrix4f persp2ortho, ortho, rotate, translate;
    persp2ortho << -zNear, 0, 0, 0, 0, -zNear, 0, 0, 0, 0, -zNear - zFar, zNear * zFar, 0, 0, 1, 0; // houyi 2021.12.5
    translate << 1, 0, 0, -0.5 * (r + l), 0, 1, 0, -0.5 * (t + b), 0, 0, 1, -0.5 * (zNear + zFar), 0, 0, 0, 1;
    rotate << 2.0 / (r - l), 0, 0, 0, 0, 2.0 / (t - b), 0, 0, 0, 0, 2.0 / (zNear - zFar), 0, 0, 0, 0, 1;
    ortho = rotate * translate;
    projection = ortho * persp2ortho * projection;
    return projection;
}

Eigen::Vector3f vertex_shader(const vertex_shader_payload& payload)
{
    return payload.position;
}

Eigen::Vector3f normal_fragment_shader(const fragment_shader_payload& payload)
{
    Eigen::Vector3f return_color = (payload.normal.head<3>().normalized() + Eigen::Vector3f(1.0f, 1.0f, 1.0f)) / 2.f;
    Eigen::Vector3f result;
    result << return_color.x() * 255, return_color.y() * 255, return_color.z() * 255;
    return result;
}

static Eigen::Vector3f reflect(const Eigen::Vector3f& vec, const Eigen::Vector3f& axis)
{
    auto costheta = vec.dot(axis);
    return (2 * costheta * axis - vec).normalized();
}

struct light
{
    Eigen::Vector3f position;
    Eigen::Vector3f intensity;
};

// houyi 2021.12.9
float myCalcDistance2(const Eigen::Vector3f& posA,const Eigen::Vector3f& posB)
{
    return (posA-posB).transpose()*(posA-posB);
}

// houyi 2021.12.9
float myCalcCosWithVectors(const Eigen::Vector3f& vecA,const Eigen::Vector3f& vecB)
{
    return vecA.normalized().transpose()*vecB.normalized();
}

// houyi 2021.12.9
Eigen::Vector3f myCalcBisector(const Eigen::Vector3f& vecA,const Eigen::Vector3f& vecB)
{
    return (vecA+vecB).normalized();
}

Eigen::Vector3f texture_fragment_shader(const fragment_shader_payload& payload)
{
    Eigen::Vector3f return_color = {0, 0, 0};
    if (payload.texture)
    {
        // TODO: Get the texture value at the texture coordinates of the current fragment
        
        // houyi 2021.12.9
        float u=1.0<payload.tex_coords.x()?1.0:payload.tex_coords.x();
        float v=1.0<payload.tex_coords.y()?1.0:payload.tex_coords.y();
        // return_color=payload.texture->getColor(u,v);
        return_color=payload.texture->getColorBilinear(u,v); // houyi 2021.12.14
    }
    Eigen::Vector3f texture_color;
    texture_color << return_color.x(), return_color.y(), return_color.z();
    Eigen::Vector3f ka = Eigen::Vector3f(0.005, 0.005, 0.005);
    Eigen::Vector3f kd = texture_color / 255.f;
    Eigen::Vector3f ks = Eigen::Vector3f(0.7937, 0.7937, 0.7937);

    auto l1 = light{{20, 20, 20}, {500, 500, 500}};
    auto l2 = light{{-20, 20, 0}, {500, 500, 500}};

    std::vector<light> lights = {l1, l2};
    Eigen::Vector3f amb_light_intensity{10, 10, 10};
    Eigen::Vector3f eye_pos{0, 0, 10};

    float p = 150;

    Eigen::Vector3f color = texture_color;
    Eigen::Vector3f point = payload.view_pos;
    Eigen::Vector3f normal = payload.normal;

    Eigen::Vector3f result_color = {0, 0, 0};

    for (auto& light : lights)
    {
        // TODO: For each light source in the code, calculate what the *ambient*, *diffuse*, and *specular* 
        // components are. Then, accumulate that result on the *result_color* object.
       
        // houyi 2021.12.9
        // calculate ambient component
        Eigen::Vector3f l_ambient=amb_light_intensity.cwiseProduct(ka);

        // calculate diffuse component
        float dis=myCalcDistance2(point,light.position);
        Eigen::Vector3f l_diffuse=light.intensity.cwiseProduct(kd)/dis*std::max(0.0f,myCalcCosWithVectors(light.position-point,normal));

        // calculate specular component
        Eigen::Vector3f h=myCalcBisector(eye_pos-point,light.position-point);
        Eigen::Vector3f l_specular=light.intensity.cwiseProduct(ks)/dis*std::pow(std::max(0.0f,myCalcCosWithVectors(h,normal)),p);   
        result_color =result_color+l_ambient+l_diffuse+l_specular;
    }

    return result_color * 255.f;
}

Eigen::Vector3f phong_fragment_shader(const fragment_shader_payload& payload)
{
    Eigen::Vector3f ka = Eigen::Vector3f(0.005, 0.005, 0.005);
    Eigen::Vector3f kd = payload.color;
    Eigen::Vector3f ks = Eigen::Vector3f(0.7937, 0.7937, 0.7937);

    auto l1 = light{{20, 20, 20}, {500, 500, 500}};
    auto l2 = light{{-20, 20, 0}, {500, 500, 500}};

    std::vector<light> lights = {l1, l2};
    Eigen::Vector3f amb_light_intensity{10, 10, 10};
    Eigen::Vector3f eye_pos{0, 0, 10};

    float p = 150;

    Eigen::Vector3f color = payload.color;
    Eigen::Vector3f point = payload.view_pos;
    Eigen::Vector3f normal = payload.normal;

    Eigen::Vector3f result_color = {0, 0, 0};
    for (auto& light : lights)
    {
        // TODO: For each light source in the code, calculate what the *ambient*, *diffuse*, and *specular* 
        // components are. Then, accumulate that result on the *result_color* object.
        
        // houyi 2021.12.9
        // calculate ambient component
        Eigen::Vector3f l_ambient=amb_light_intensity.cwiseProduct(ka);

        // calculate diffuse component
        float dis=myCalcDistance2(point,light.position);
        Eigen::Vector3f l_diffuse=light.intensity.cwiseProduct(kd)/dis*std::max(0.0f,myCalcCosWithVectors(light.position-point,normal));

        // calculate specular component
        Eigen::Vector3f h=myCalcBisector(eye_pos-point,light.position-point);
        Eigen::Vector3f l_specular=light.intensity.cwiseProduct(ks)/dis*std::pow(std::max(0.0f,myCalcCosWithVectors(h,normal)),p);   
        result_color =result_color+l_ambient+l_diffuse+l_specular;
    }

    return result_color * 255.f;
}



Eigen::Vector3f displacement_fragment_shader(const fragment_shader_payload& payload)
{
    
    Eigen::Vector3f ka = Eigen::Vector3f(0.005, 0.005, 0.005);
    Eigen::Vector3f kd = payload.color;
    Eigen::Vector3f ks = Eigen::Vector3f(0.7937, 0.7937, 0.7937);

    auto l1 = light{{20, 20, 20}, {500, 500, 500}};
    auto l2 = light{{-20, 20, 0}, {500, 500, 500}};

    std::vector<light> lights = {l1, l2};
    Eigen::Vector3f amb_light_intensity{10, 10, 10};
    Eigen::Vector3f eye_pos{0, 0, 10};

    float p = 150;

    Eigen::Vector3f color = payload.color; 
    Eigen::Vector3f point = payload.view_pos;
    Eigen::Vector3f normal = payload.normal;

    float kh = 0.2, kn = 0.1;
    
    // TODO: Implement displacement mapping here
    // Let n = normal = (x, y, z)
    // Vector t = (x*y/sqrt(x*x+z*z),sqrt(x*x+z*z),z*y/sqrt(x*x+z*z))
    // Vector b = n cross product t
    // Matrix TBN = [t b n]
    // dU = kh * kn * (h(u+1/w,v)-h(u,v))
    // dV = kh * kn * (h(u,v+1/h)-h(u,v))
    // Vector ln = (-dU, -dV, 1)
    // Position p = p + kn * n * h(u,v)
    // Normal n = normalize(TBN * ln)
   
    // houyi 2021.12.9
    Eigen::Vector3f t(normal[0]*normal[1]/std::sqrt(normal[0]*normal[0]+normal[2]*normal[2]),std::sqrt(normal[0]*normal[0]+normal[2]*normal[2]),normal[2]*normal[1]/std::sqrt(normal[0]*normal[0]+normal[2]*normal[2]));
    Eigen::Vector3f b=normal.cross(t);
    
    float u=1.0<payload.tex_coords.x()?1.0:payload.tex_coords.x();
    float v=1.0<payload.tex_coords.y()?1.0:payload.tex_coords.y();
    float u_1=1.0<(payload.tex_coords.x()+1.0/payload.texture->width)?1.0:(payload.tex_coords.x()+1.0/payload.texture->width);
    float v_1=1.0<(payload.tex_coords.y()+1.0/payload.texture->height)?1.0:(payload.tex_coords.y()+1.0/payload.texture->height);

    float dU = kh * kn *(payload.texture->getColor(u_1,v).norm()-payload.texture->getColor(u,v).norm());
    float dV = kh * kn *(payload.texture->getColor(u,v_1).norm()-payload.texture->getColor(u,v).norm());
    Eigen::Matrix3f TBN;
    TBN.col(0)=t;
    TBN.col(1)=b;
    TBN.col(2)=normal;
    Eigen::Vector3f ln(-dU, -dV, 1.0);
    point = point + kn * normal * payload.texture->getColor(u,v).norm();
    normal=(TBN*ln).normalized();

    Eigen::Vector3f result_color = {0, 0, 0};
    for (auto& light : lights)
    {
        // TODO: For each light source in the code, calculate what the *ambient*, *diffuse*, and *specular* 
        // components are. Then, accumulate that result on the *result_color* object.
       
        // houyi 2021.12.9
        // calculate ambient component
        Eigen::Vector3f l_ambient=amb_light_intensity.cwiseProduct(ka);

        // calculate diffuse component
        float dis=myCalcDistance2(point,light.position);
        Eigen::Vector3f l_diffuse=light.intensity.cwiseProduct(kd)/dis*std::max(0.0f,myCalcCosWithVectors(light.position-point,normal));

        // calculate specular component
        Eigen::Vector3f h=myCalcBisector(eye_pos-point,light.position-point);
        Eigen::Vector3f l_specular=light.intensity.cwiseProduct(ks)/dis*std::pow(std::max(0.0f,myCalcCosWithVectors(h,normal)),p);   
        result_color =result_color+l_ambient+l_diffuse+l_specular;
    }
    return result_color * 255.f;
}


Eigen::Vector3f bump_fragment_shader(const fragment_shader_payload& payload)
{
    Eigen::Vector3f ka = Eigen::Vector3f(0.005, 0.005, 0.005);
    Eigen::Vector3f kd = payload.color;
    Eigen::Vector3f ks = Eigen::Vector3f(0.7937, 0.7937, 0.7937);

    auto l1 = light{{20, 20, 20}, {500, 500, 500}};
    auto l2 = light{{-20, 20, 0}, {500, 500, 500}};

    std::vector<light> lights = {l1, l2};
    Eigen::Vector3f amb_light_intensity{10, 10, 10};
    Eigen::Vector3f eye_pos{0, 0, 10};

    float p = 150;

    Eigen::Vector3f color = payload.color; 
    Eigen::Vector3f point = payload.view_pos;
    Eigen::Vector3f normal = payload.normal;

    float kh = 0.2, kn = 0.1;

    // TODO: Implement bump mapping here
    // Let n = normal = (x, y, z)
    // Vector t = (x*y/sqrt(x*x+z*z),sqrt(x*x+z*z),z*y/sqrt(x*x+z*z))
    // Vector b = n cross product t
    // Matrix TBN = [t b n]
    // dU = kh * kn * (h(u+1/w,v)-h(u,v))
    // dV = kh * kn * (h(u,v+1/h)-h(u,v))
    // Vector ln = (-dU, -dV, 1)
    // Normal n = normalize(TBN * ln)
    
    // houyi 2021.12.9
    Eigen::Vector3f t(normal[0]*normal[1]/std::sqrt(normal[0]*normal[0]+normal[2]*normal[2]),std::sqrt(normal[0]*normal[0]+normal[2]*normal[2]),normal[2]*normal[1]/std::sqrt(normal[0]*normal[0]+normal[2]*normal[2]));
    Eigen::Vector3f b=normal.cross(t);
    
    float u=1.0<payload.tex_coords.x()?1.0:payload.tex_coords.x();
    float v=1.0<payload.tex_coords.y()?1.0:payload.tex_coords.y();
    float u_1=1.0<(payload.tex_coords.x()+1.0/payload.texture->width)?1.0:(payload.tex_coords.x()+1.0/payload.texture->width);
    float v_1=1.0<(payload.tex_coords.y()+1.0/payload.texture->height)?1.0:(payload.tex_coords.y()+1.0/payload.texture->height);

    float dU = kh * kn *(payload.texture->getColor(u_1,v).norm()-payload.texture->getColor(u,v).norm());
    float dV = kh * kn *(payload.texture->getColor(u,v_1).norm()-payload.texture->getColor(u,v).norm());
    Eigen::Matrix3f TBN;
    TBN.col(0)=t;
    TBN.col(1)=b;
    TBN.col(2)=normal;
    Eigen::Vector3f ln(-dU, -dV, 1.0);
    normal=(TBN*ln).normalized();

    Eigen::Vector3f result_color = normal;
    return result_color * 255.f;
}

int main(int argc, const char** argv)
{
    std::vector<Triangle*> TriangleList;

    float angle = 140.0;
    bool command_line = false;

    std::string filename = "output.png";
    objl::Loader Loader;
    std::string obj_path = "../models/spot/";

    // Load .obj File
    bool loadout = Loader.LoadFile("../models/spot/spot_triangulated_good.obj");
    for(auto mesh:Loader.LoadedMeshes)
    {
        for(int i=0;i<mesh.Vertices.size();i+=3)
        {
            Triangle* t = new Triangle();
            for(int j=0;j<3;j++)
            {
                t->setVertex(j,Vector4f(mesh.Vertices[i+j].Position.X,mesh.Vertices[i+j].Position.Y,mesh.Vertices[i+j].Position.Z,1.0));
                t->setNormal(j,Vector3f(mesh.Vertices[i+j].Normal.X,mesh.Vertices[i+j].Normal.Y,mesh.Vertices[i+j].Normal.Z));
                t->setTexCoord(j,Vector2f(mesh.Vertices[i+j].TextureCoordinate.X, mesh.Vertices[i+j].TextureCoordinate.Y));
            }
            TriangleList.push_back(t);
        }
    }

    rst::rasterizer r(700, 700);

    auto texture_path = "hmap.jpg";
    r.set_texture(Texture(obj_path + texture_path));

    std::function<Eigen::Vector3f(fragment_shader_payload)> active_shader = texture_fragment_shader; // houyi 2021.12.9
    texture_path = "spot_texture.png";
    r.set_texture(Texture(obj_path + texture_path));
    
    if (argc >= 2)
    {
        command_line = true;
        filename = std::string(argv[1]);

        if (argc == 3 && std::string(argv[2]) == "texture")
        {
            std::cout << "Rasterizing using the texture shader\n";
            active_shader = texture_fragment_shader;
            texture_path = "spot_texture.png";
            r.set_texture(Texture(obj_path + texture_path));
        }
        else if (argc == 3 && std::string(argv[2]) == "normal")
        {
            std::cout << "Rasterizing using the normal shader\n";
            active_shader = normal_fragment_shader;
        }
        else if (argc == 3 && std::string(argv[2]) == "phong")
        {
            std::cout << "Rasterizing using the phong shader\n";
            active_shader = phong_fragment_shader;
        }
        else if (argc == 3 && std::string(argv[2]) == "bump")
        {
            std::cout << "Rasterizing using the bump shader\n";
            active_shader = bump_fragment_shader;
        }
        else if (argc == 3 && std::string(argv[2]) == "displacement")
        {
            std::cout << "Rasterizing using the bump shader\n";
            active_shader = displacement_fragment_shader;
        }
    }

    Eigen::Vector3f eye_pos = {0,0,10};
    r.set_vertex_shader(vertex_shader);
    r.set_fragment_shader(active_shader);

    int key = 0;
    int frame_count = 0;

    if (command_line)
    {
        r.clear(rst::Buffers::Color | rst::Buffers::Depth);
        r.set_model(get_model_matrix(angle));
        r.set_view(get_view_matrix(eye_pos));
        r.set_projection(get_projection_matrix(45.0, 1, 0.1, 50));

        r.draw(TriangleList);
        cv::Mat image(700, 700, CV_32FC3, r.frame_buffer().data());
        image.convertTo(image, CV_8UC3, 1.0f);
        cv::cvtColor(image, image, cv::COLOR_RGB2BGR);

        cv::imwrite(filename, image);

        return 0;
    }

    while(key != 27)
    {
        r.clear(rst::Buffers::Color | rst::Buffers::Depth);
        std::cout<<"angle = "<<angle<<std::endl; // houyi 2021.12.9
        r.set_model(get_model_matrix(angle));
        r.set_view(get_view_matrix(eye_pos));
        r.set_projection(get_projection_matrix(45.0, 1, 0.1, 50));

        //r.draw(pos_id, ind_id, col_id, rst::Primitive::Triangle);
        r.draw(TriangleList);
        cv::Mat image(700, 700, CV_32FC3, r.frame_buffer().data());
        image.convertTo(image, CV_8UC3, 1.0f);
        cv::cvtColor(image, image, cv::COLOR_RGB2BGR);

        cv::imshow("image", image);
        cv::imwrite(filename, image);
        key = cv::waitKey(10);
        std::cout << "frame count: " << frame_count++ << '\n';

        if (key == 'a' )
        {
            angle -= 15;
        }
        else if (key == 'd')
        {
            angle += 15;
        }
    }
    return 0;
}
