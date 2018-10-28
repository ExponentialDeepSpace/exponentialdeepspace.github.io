# The Exponential Deep Space

## Requirements

0. Ruby
1. Jekyll

## How to Run and Test

1. `bundle install`
2. `bundle exec jekyll serve`

## Content Management

### How to Add New Meeting Notes

`_meeting/`

### How to Change or Add Topics

1. Everything is in `_topics/`
2. Images are placed in `_topics/imgs`



### Change `index.html`

The layout design is located at `_layouts/home.html`.

1. `home/header.html` contains the navigation of the whole site
2. `home/splash.html` contains the splash screen of the home page
3. `home/intro.html` contains the introduction section, which is basically the three divs in the beginning of the page
4. blablabla

### How to change nav

`_data/nav.yml`: 

1. `type` can be `home` (for homepage navigation only), `main` (navigation used in the whole site), `top-right` (nav floating on the right)

```
- type: home
  navs:
    - name: Topics
      description: 
      link: "/topics"
      showsub: true
      sub:
        - name: Solar Furnace
          description: Solar Energy Focus
          link: "/topics/solar-focus"
        - name: Asteroid
          description: Locate and Research
          link: "/topics/target-asteroids"
        - name: All
          description: List of Topics
          link: "/topics/topics"
    - name: Meetup
      description: 
      link: "/meeting"
      showsub: true
      sub:
        - name: How
          description: Online, GitHub
          link: "/meeting"
        - name: Archive
          description: Notes
          link: "/meeting"
    
- type: main
  navs:
    - name: Topics
      description: 
      link: "/topics"
      showsub: true
      sub:
        - name: Solar Furnace
          description: Solar Energy Focus
          link: "/topics/solar-focus"
        - name: Asteroid
          description: Locate and Research
          link: "/topics/target-asteroid"
        - name: All
          description: List of Topics
          link: "/topics/topics"
    - name: Meetup
      description: 
      link: "/meeting"
      showsub: true
      sub:
        - name: How
          description: Online, GitHub
          link: "/meeting"
        - name: Archive
          description: Notes
          link: "/meeting"
    
   

- type: "top-right"
  navs:
    - name: Join Us
      description: We are the legion
      fa-icon: "fa fa-bullhorn"
      displayname: Join Us
      link: "#join-us"
    - name: GitHub
      description:
      fa-icon: "fa fa-github"
      link: "https://github.com/exponentialdeepspace"
```

### How to change team

`_data/team.yml` has all the team names, groups, and descriptions.