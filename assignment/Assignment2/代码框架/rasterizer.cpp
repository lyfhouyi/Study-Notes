// clang-format off
//
// Created by goksu on 4/6/19.
//

#include <algorithm>
#include <vector>
#include "rasterizer.hpp"
#include <opencv2/opencv.hpp>
#include <math.h>


rst::pos_buf_id rst::rasterizer::load_positions(const std::vector<Eigen::Vector3f> &positions)
{
    auto id = get_next_id();
    pos_buf.emplace(id, positions);

    return {id};
}

rst::ind_buf_id rst::rasterizer::load_indices(const std::vector<Eigen::Vector3i> &indices)
{
    auto id = get_next_id();
    ind_buf.emplace(id, indices);

    return {id};
}

rst::col_buf_id rst::rasterizer::load_colors(const std::vector<Eigen::Vector3f> &cols)
{
    auto id = get_next_id();
    col_buf.emplace(id, cols);

    return {id};
}

auto to_vec4(const Eigen::Vector3f& v3, float w = 1.0f)
{
    return Vector4f(v3.x(), v3.y(), v3.z(), w);
}


static int insideTriangle(float x, float y, const Vector3f* _v)
{   
    // TODO : Implement this function to check if the point (x, y) is inside the triangle represented by _v[0], _v[1], _v[2]

    // houyi 2021.12.6
    Vector3f ab=_v[1]-_v[0];
    ab[2]=0;
    Vector3f bc=_v[2]-_v[1];
    bc[2]=0;
    Vector3f ca=_v[0]-_v[2];
    ca[2]=0;
    
    Vector3f ap;
    ap<<x-_v[0][0],y-_v[0][1],0.0;

    Vector3f bp;
    bp<<x-_v[1][0],y-_v[1][1],0.0;

    Vector3f cp;
    cp<<x-_v[2][0],y-_v[2][1],0.0;

    Vector3f ab_ap=ab.cross(ap);
    Vector3f bc_bp=bc.cross(bp);
    Vector3f ca_cp=ca.cross(cp);

    if((ab_ap[2]>0 && bc_bp[2]>0 && ca_cp[2]>0)||(ab_ap[2]<0 && bc_bp[2]<0 && ca_cp[2]<0))
    {
        return 1;
    }
    else
    {
        return 0;
    }
}

static std::tuple<float, float, float> computeBarycentric2D(float x, float y, const Vector3f* v)
{
    float c1 = (x*(v[1].y() - v[2].y()) + (v[2].x() - v[1].x())*y + v[1].x()*v[2].y() - v[2].x()*v[1].y()) / (v[0].x()*(v[1].y() - v[2].y()) + (v[2].x() - v[1].x())*v[0].y() + v[1].x()*v[2].y() - v[2].x()*v[1].y());
    float c2 = (x*(v[2].y() - v[0].y()) + (v[0].x() - v[2].x())*y + v[2].x()*v[0].y() - v[0].x()*v[2].y()) / (v[1].x()*(v[2].y() - v[0].y()) + (v[0].x() - v[2].x())*v[1].y() + v[2].x()*v[0].y() - v[0].x()*v[2].y());
    float c3 = (x*(v[0].y() - v[1].y()) + (v[1].x() - v[0].x())*y + v[0].x()*v[1].y() - v[1].x()*v[0].y()) / (v[2].x()*(v[0].y() - v[1].y()) + (v[1].x() - v[0].x())*v[2].y() + v[0].x()*v[1].y() - v[1].x()*v[0].y());
    return {c1,c2,c3};
}

void rst::rasterizer::draw(pos_buf_id pos_buffer, ind_buf_id ind_buffer, col_buf_id col_buffer, Primitive type)
{
    auto& buf = pos_buf[pos_buffer.pos_id];
    auto& ind = ind_buf[ind_buffer.ind_id];
    auto& col = col_buf[col_buffer.col_id];

    float f1 = (50 - 0.1) / 2.0;
    float f2 = (50 + 0.1) / 2.0;

    Eigen::Matrix4f mvp = projection * view * model;
    for (auto& i : ind)
    {
        Triangle t;
        Eigen::Vector4f v[] = {
                mvp * to_vec4(buf[i[0]], 1.0f),
                mvp * to_vec4(buf[i[1]], 1.0f),
                mvp * to_vec4(buf[i[2]], 1.0f)
        };
        //Homogeneous division
        for (auto& vec : v) {
            vec /= vec.w();
        }
        //Viewport transformation
        for (auto & vert : v)
        {
            vert.x() = 0.5*width*(vert.x()+1.0);
            vert.y() = 0.5*height*(vert.y()+1.0);
            vert.z() = -vert.z() * f1 + f2;
        }

        for (int i = 0; i < 3; ++i)
        {
            t.setVertex(i, v[i].head<3>());
            t.setVertex(i, v[i].head<3>());
            t.setVertex(i, v[i].head<3>());
        }

        auto col_x = col[i[0]];
        auto col_y = col[i[1]];
        auto col_z = col[i[2]];

        t.setColor(0, col_x[0], col_x[1], col_x[2]);
        t.setColor(1, col_y[0], col_y[1], col_y[2]);
        t.setColor(2, col_z[0], col_z[1], col_z[2]);

        rasterize_triangle(t);
    }
}

// houyi 2021.12.6
float myMin(float a,float b,float c)
{
    float minAB=a<b?a:b;
    return minAB<c?minAB:c;
}

// houyi 2021.12.6
float myMax(float a,float b,float c)
{
    float maxAB=a>b?a:b;
    return maxAB>c?maxAB:c;
}

//Screen space rasterization
void rst::rasterizer::rasterize_triangle(const Triangle& t) {
    auto v = t.toVector4();
    
    // TODO : Find out the bounding box of current triangle.
    // iterate through the pixel and find if the current pixel is inside the triangle

    // If so, use the following code to get the interpolated z value.
    //auto[alpha, beta, gamma] = computeBarycentric2D(x, y, t.v);
    //float w_reciprocal = 1.0/(alpha / v[0].w() + beta / v[1].w() + gamma / v[2].w());
    //float z_interpolated = alpha * v[0].z() / v[0].w() + beta * v[1].z() / v[1].w() + gamma * v[2].z() / v[2].w();
    //z_interpolated *= w_reciprocal;

    // TODO : set the current pixel (use the set_pixel function) to the color of the triangle (use getColor function) if it should be painted.

    // houyi 2021.12.6
    int xMin=int(myMin(t.v[0][0],t.v[1][0],t.v[2][0]));
    int xMax=int(myMax(t.v[0][0],t.v[1][0],t.v[2][0])+1);
    int yMin=int(myMin(t.v[0][1],t.v[1][1],t.v[2][1]));
    int yMax=int(myMax(t.v[0][1],t.v[1][1],t.v[2][1])+1);


    for(int x=xMin;x<xMax;x++)
    {
        for(int y=yMin;y<yMax;y++)
        {
            // improved
            int inside=0;
            float depth=0.0;
            for(int i=0;i<4;i++)
            {
                inside += insideTriangle(x+0.33*(i%2+1),y+0.33*(i/2+1),t.v);
            }
            float percent = inside / 4.0;
            if(inside>0)
            {
                for(int i=0;i<4;i++)
                {
                    std::tuple<float, float, float>foo =computeBarycentric2D(x+0.33*(i%2+1),y+0.33*(i/2+1), t.v);
                    float alpha=std::get<0>(foo);
                    float beta=std::get<1>(foo);
                    float gamma=std::get<2>(foo);
                    float w_reciprocal = 1.0/(alpha / v[0].w() + beta / v[1].w() + gamma / v[2].w());
                    float z_interpolated = alpha * v[0].z() / v[0].w() + beta * v[1].z() / v[1].w() + gamma * v[2].z() / v[2].w();
                    z_interpolated *= w_reciprocal;
                    depth += z_interpolated;
                }
                depth /= 4;
                if(depth<depth_buf[get_index(x,y)])
                {
                    set_pixel(Vector3f(x,y,0.0),percent*t.getColor());
                    depth_buf[get_index(x,y)]=depth;
                }
            }

            // // original
            // if(insideTriangle(x+0.5,y+0.5,t.v))
            // {
            //     std::tuple<float, float, float>foo =computeBarycentric2D(x+0.5,y+0.5, t.v);
            //     float alpha=std::get<0>(foo);
            //     float beta=std::get<1>(foo);
            //     float gamma=std::get<2>(foo);
            //     float w_reciprocal = 1.0/(alpha / v[0].w() + beta / v[1].w() + gamma / v[2].w());
            //     float z_interpolated = alpha * v[0].z() / v[0].w() + beta * v[1].z() / v[1].w() + gamma * v[2].z() / v[2].w();
            //     z_interpolated *= w_reciprocal;

            //     if(z_interpolated<depth_buf[get_index(x,y)])
            //     {
            //         set_pixel(Vector3f(x,y,0.0),t.getColor());
            //         depth_buf[get_index(x,y)]=z_interpolated;
            //     }

            // }
        }
    }
}

void rst::rasterizer::set_model(const Eigen::Matrix4f& m)
{
    model = m;
}

void rst::rasterizer::set_view(const Eigen::Matrix4f& v)
{
    view = v;
}

void rst::rasterizer::set_projection(const Eigen::Matrix4f& p)
{
    projection = p;
}

void rst::rasterizer::clear(rst::Buffers buff)
{
    if ((buff & rst::Buffers::Color) == rst::Buffers::Color)
    {
        std::fill(frame_buf.begin(), frame_buf.end(), Eigen::Vector3f{0, 0, 0});
    }
    if ((buff & rst::Buffers::Depth) == rst::Buffers::Depth)
    {
        std::fill(depth_buf.begin(), depth_buf.end(), std::numeric_limits<float>::infinity());
    }
}

rst::rasterizer::rasterizer(int w, int h) : width(w), height(h)
{
    frame_buf.resize(w * h);
    depth_buf.resize(w * h);
}

int rst::rasterizer::get_index(int x, int y)
{
    return (height-1-y)*width + x;
}

void rst::rasterizer::set_pixel(const Eigen::Vector3f& point, const Eigen::Vector3f& color)
{
    //old index: auto ind = point.y() + point.x() * width;
    auto ind = (height-1-point.y())*width + point.x();
    frame_buf[ind] = color;

}

// clang-format on