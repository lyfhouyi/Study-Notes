//
// Created by Göksu Güvendiren on 2019-05-14.
//

#include "Scene.hpp"


void Scene::buildBVH() {
    printf(" - Generating BVH...\n\n");
    this->bvh = new BVHAccel(objects, 1, BVHAccel::SplitMethod::NAIVE);
}

Intersection Scene::intersect(const Ray &ray) const
{
    return this->bvh->Intersect(ray);
}

void Scene::sampleLight(Intersection &pos, float &pdf) const
{
    float emit_area_sum = 0;
    for (uint32_t k = 0; k < objects.size(); ++k) {
        if (objects[k]->hasEmit()){
            emit_area_sum += objects[k]->getArea();
        }
    }
    float p = get_random_float() * emit_area_sum;
    emit_area_sum = 0;
    for (uint32_t k = 0; k < objects.size(); ++k) {
        if (objects[k]->hasEmit()){
            emit_area_sum += objects[k]->getArea();
            if (p <= emit_area_sum){
                objects[k]->Sample(pos, pdf);
                break;
            }
        }
    }
}

bool Scene::trace(
        const Ray &ray,
        const std::vector<Object*> &objects,
        float &tNear, uint32_t &index, Object **hitObject)
{
    *hitObject = nullptr;
    for (uint32_t k = 0; k < objects.size(); ++k) {
        float tNearK = kInfinity;
        uint32_t indexK;
        Vector2f uvK;
        if (objects[k]->intersect(ray, tNearK, indexK) && tNearK < tNear) {
            *hitObject = objects[k];
            tNear = tNearK;
            index = indexK;
        }
    }
    return (*hitObject != nullptr);
}

// Implementation of Path Tracing
Vector3f Scene::castRay(const Ray &ray, int depth) const
{
    // TO DO Implement Path Tracing Algorithm here

    // houyi 2021.12.24
    Intersection inter_ray =this->intersect(ray);
    if (inter_ray.happened==false)
        return Vector3f(0.0,0.0,0.0);
    
    Vector3f hitPoint=inter_ray.coords;
    
    Vector3f L_emi=Vector3f(0.0,0.0,0.0);
    if(depth==0 && inter_ray.obj->hasEmit())
    {
        L_emi=inter_ray.emit;
    }

    Vector3f L_dir=Vector3f(0.0,0.0,0.0);
    Intersection inter_light;
    float lightPdf;
    this->sampleLight(inter_light,lightPdf);
    Vector3f lightPos=inter_light.coords;
    Ray p2x(hitPoint,normalize(lightPos-hitPoint));
    Intersection inter_p2x =this->intersect(p2x);
    if(inter_p2x.happened && inter_p2x.obj->hasEmit());
    {
        L_dir=inter_light.emit*inter_ray.m->eval(ray.direction,p2x.direction,inter_ray.normal)*dotProduct(p2x.direction,inter_ray.normal)*dotProduct(-p2x.direction,inter_p2x.normal)/dotProduct(hitPoint-lightPos,hitPoint-lightPos)/lightPdf;
    }

    Vector3f L_indir=Vector3f(0.0,0.0,0.0);
    if(get_random_float()<this->RussianRoulette)
    {
        Vector3f wi_p2q = inter_ray.m->sample(ray.direction,inter_ray.normal);
        Ray p2q(hitPoint,wi_p2q);
        Intersection inter_p2q =this->intersect(p2q);
        if(inter_p2q.happened &&!inter_p2q.obj->hasEmit())
        {
            L_indir = castRay(p2q,depth+1)*inter_ray.m->eval(ray.direction,wi_p2q,inter_ray.normal)*dotProduct(wi_p2q,inter_ray.normal)/inter_ray.m->pdf(ray.direction,wi_p2q,inter_ray.normal)/RussianRoulette;
        }
    }
    return L_emi+L_dir+L_indir;
}