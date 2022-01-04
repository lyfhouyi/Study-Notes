#include "rope.h"

#include <iostream>
#include <vector>

#include "CGL/vector2D.h"
#include "mass.h"
#include "spring.h"

namespace CGL {

Rope::Rope(Vector2D start, Vector2D end, int num_nodes, float node_mass,
           float k, vector<int> pinned_nodes) {
  // TODO (Part 1): Create a rope starting at `start`, ending at `end`, and
  // containing `num_nodes` nodes.

  // houyi 2021.12.30
  Vector2D dif((end - start) / (num_nodes - 1.0));
  for (int i = 0; i < num_nodes; i++) {
    this->masses.push_back(new Mass(start + i * dif, node_mass, false));
  }
  for (int i = 0; i < num_nodes - 1; i++) {
    this->springs.push_back(
        new Spring(this->masses[i], this->masses[i + 1], k));
  }
  // Comment-in this part when you implement the constructor
  for (auto &i : pinned_nodes) {
    masses[i]->pinned = true;
  }
}

void Rope::simulateEuler(float delta_t, Vector2D gravity) {
  for (auto &s : springs) {
    // TODO (Part 2): Use Hooke's law to calculate the force on a node

    // houyi 2021.12.30
    Vector2D f = -s->k * (s->m1->position - s->m2->position).unit() *
                 ((s->m1->position - s->m2->position).norm() - s->rest_length);
    s->m1->forces += f;
    s->m2->forces += -f;

    Vector2D f_damp = -0.08 * (s->m1->position - s->m2->position).unit() *
                      (s->m1->velocity - s->m2->velocity) *
                      (s->m1->position - s->m2->position).unit();
    s->m1->forces += -f_damp;
    s->m2->forces += f_damp;
  }

  for (auto &m : masses) {
    if (!m->pinned) {
      // TODO (Part 2): Add the force due to gravity, then compute the new
      // velocity and position

      // houyi 2021.12.30
      m->forces += gravity * m->mass;
      m->velocity += m->forces / m->mass * delta_t;
      m->position += m->velocity * delta_t;  // semi-implicit method

      // TODO (Part 2): Add global damping
    }

    // Reset all forces on each mass
    m->forces = Vector2D(0, 0);
  }
}

void Rope::simulateVerlet(float delta_t, Vector2D gravity) {
  for (auto &s : springs) {
    // TODO (Part 3): Simulate one timestep of the rope using explicit Verlet
    // （solving constraints)

    // houyi 2021.12.30
    Vector2D f = -s->k * (s->m1->position - s->m2->position).unit() *
                 ((s->m1->position - s->m2->position).norm() - s->rest_length);
    s->m1->forces += f;
    s->m2->forces += -f;
  }

  for (auto &m : masses) {
    if (!m->pinned) {
      Vector2D temp_position = m->last_position;  // houyi 2021.12.30
      // TODO (Part 3.1): Set the new position of the rope mass

      // houyi 2021.12.30
      m->forces += gravity * m->mass;
      m->last_position = m->position;
      Vector2D diff = m->position - temp_position;
      m->position +=
          (1 - 0.00005) * diff + m->forces / m->mass * delta_t * delta_t;

      // TODO (Part 4): Add global Verlet damping
    }
    m->forces = Vector2D(0, 0);
  }
}
}  // namespace CGL
