---
title: Meetings
layout: page
exclude: true
---

{% assign meetups = site.meeting | sort: "order" %}

{% for post in meetups %}

{% if post.exclude != true %}

<div class="card shadow shadow-lg--hover mt-5">
              <div class="card-body">
                <div class="d-flex px-3">
                  <div>
                    <div class="icon icon-shape bg-gradient-info rounded-circle text-white">
                      <i class="ni ni-chat-round"></i>
                    </div>
                  </div>
                  <div class="pl-4">
                    <h5 class="title text-info">{{ post.title }}</h5>
                    <p>{{ post.summary }}</p>
                    <a href="{{ post.url | prepend: site.baseurl }}" class="text-info">Learn More</a>
                  </div>
                </div>
              </div>
            </div>
{% endif %}
  
{% endfor %}