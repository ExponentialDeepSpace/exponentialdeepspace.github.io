---
title: Meetings
layout: page
exclude: true
---

{% for post in site.meeting | sort: "order" %}

{% if post.exclude != true %}

<div class="card shadow shadow-lg--hover mt-5">
              <div class="card-body">
                <div class="d-flex px-3">
                  <div>
                    <div class="icon icon-shape bg-gradient-success rounded-circle text-white">
                      <i class="ni ni-bulb-61"></i>
                    </div>
                  </div>
                  <div class="pl-4">
                    <h5 class="title text-success">{{ post.title }}</h5>
                    <p>{{ post.summary }}</p>
                    <a href="{{ post.url | prepend: site.baseurl }}" class="text-success">Learn More</a>
                  </div>
                </div>
              </div>
            </div>
{% endif %}
  
{% endfor %}