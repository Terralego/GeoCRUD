<p align="center">
  <a href="" rel="noopener">
 <img width=200px height=200px src="https://i.imgur.com/6wj0hh6.jpg" alt="Project logo"></a>
</p>


<h3 align="center">GeoCRUD</h3>

<div align="center">

  [![Status](https://img.shields.io/badge/status-active-success.svg)]()
  [![GitHub Issues](https://img.shields.io/github/issues/Terralego/GeoCRUD.svg)](https://github.com/terralego/geocrud/issues)
  [![GitHub Pull Requests](https://img.shields.io/github/issues-pr/terralego/geocrud.svg)](https://github.com/terralego/geocrud/pulls)
  [![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)
  
</div>

---

<p align="center">
    GeoCRUD is a Geographic data editor based on <a href="https://github.com/Terralego">Terralego tools</a>.
</p>

# 📝 Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Deployment](#deployment)
- [Usage](#usage)
- [Built Using](#built_using)


# 🧐 About <a name = "about"></a>

GeoCRUD is a configurable Geographic data editor

# 🏁 Getting Started <a name = "getting_started"></a>

This section take you by the hand through a series of steps to install a
working version of the GeoCRUD application.
Start here if you want a working version of the platform.

## Prerequisites

In order to install the server application, you need to fulfil
the following requirements:

* A linux server with a recent kernel
* [docker](https://docs.docker.com/install/) >= 18.6 installed
* [docker-compose](https://docs.docker.com/compose/install/) >= 1.23.0 installed
* Any load balancer (HaProxy, Traefik, ...)
* A hostname pointing to the server
* Optional (recommended): a set of extra subdomains also pointing to the backend
  server to serve tiles from the same server but bypass the browser limit.
  Drastically improve performances
* Optional: you can use an instance of [sentry](https://sentry.io/welcome/)
  to track server errors

## Installation

These instructions will guide you to install the application for dvelopment or on a production server.

To install it we need to achieve the following steps:

- Get the latest version
- Configure the application
- Bootstrap the instance
- Populate initial database

### Get the latest version

### Production

```bash
mkdir -p /opt/geocrud
cd geocrud
# download docker-compose.yml file
wget https://raw.githubusercontent.com/Terralego/GeoCRUD/master/docker-compose.yml
# download envionment file
wget https://raw.githubusercontent.com/Terralego/GeoCRUD/master/.env.dist
# then, pull docker images
docker-compose pull
```

```bash
git clone https://github.com/Terralego/GeoCRUD.git
cd GeoCRUD
git submodule init
git submodule update
```

### Configuration

Create environment file from template

```bash
cp .env.dist .env
```

* edit .env and set your custom configuration (at least choose a password, and change default user "geocrud" for postgres container)

* As you want, you can customize your GeoCRUD instance
  * By adding dependencies in requirements.txt (we recommend to use [pip-tools](https://pypi.org/project/pip-tools/) / edit requirements.in / generate requirements.txt / rebuild with docker-compose)
  * By adding your own code in conf/custom.py (add django apps, customize code and functions, all settings variables are accessible and editable)
  * By editing basic values in .env file (see project/settings/{base.py | prod.py} to see available environment variables or make yours with custom.py file)
  * By access /api/admin with a super user access to create and set Crud views / Data layers / Map base layers et set some other settings.


### Bootstrap the instance

After a last verification of the files, to run with docker, just type:

```bash
docker-compose up
```

### Development

```bash
docker-compose -f docker-compose.yml -f dev.yml build
docker-compose -f docker-compose.yml -f dev.yml up
```

Note that django-debug-toolbar and API documentation /api/swagger and /api/redoc are auto enabled in development mode.

## Create a superuser

```bash
docker-compose run --rm django ./manage.py createsuperuser
```

## Load demo data

```bash
docker-compose run --rm django ./manage.py loaddata /app/public/data/fixtures/demo.json
```

## Access

* By default and without frontend proxy, you should able to access by going to :
  * http://127.0.0.1:3000 for frontend application
  * http://127.0.0.1:3000/api/admin for API admin configuration


## Production

### Recommended settings

* choose port to bind to host

FRONT_PORT can be overrided in .env file

* enable ssl in backend

Once SSL configuration and / or frontend proxy configuration enabled, add

SSL_ENABLE=True in your .env field and restart stack

* add SENTRY_DSN or configure error tracking by email (configure EMAIL_ variables and set ADMINS tuple in custom.py)


### Backup

* We recommend to backup your database and your data local folder periodically

#### Troubleshooting

* Always define at least one property and sync schemas for crud views
* Always keep at least one map base layer functional
* MapBox base layer will crash if you don't define MAPBOX_TOKEN. So don't use mapbox base layers without it
* In local environment, some feature are unavailable
  * Access media urls in templates. That's because django container can't deals with nginx 127.0.0.1 based urls or relative urls.
  It will be working if you use a public DNS. If you use private DNS, make sure django container can resolve it (ex: by adding an extra_host entry)
* Some map base layers are not available in mapbox-gl-renderer container because they are only allowed by referer.
  * In this case, add a location in conf/nginx/nginx.conf that proxify request to tile url with good referer, and use this new local URL in mapbox base layer config.
* Keep care of HAProxy
  * In some cases, django container should make request on public DNS. The network stack should be ok for resolving DNS in django containers.Some nginx headers are used to says django if https is enabled or not, so in some case you should force it in nginx.conf file.

#### Next ?

- Fix lack permissions system (Unifying and configuring to link them to groups or users)
- Open to custom User model
- Make GeoCRUD configurable in frontend
- Plug DataSource to manage data import and synchronisation
- Plug "Visu" to generate Read only interfaces
- Improve django-terra-geocrud (multiple layout by layer, show and define relations, Generate DOCX and PDF sheets)

 
# ⛏️ Built Using <a name = "built_using"></a> 
  * [![Build Status](https://img.shields.io/gitlab/pipeline/terralego/terra-admin)]()
[**terra-admin**](https://github.com/Terralego/terra-admin)

  * [![Build Status](https://travis-ci.org/Terralego/django-terra-geocrud.svg?branch=master)](https://travis-ci.org/Terralego/django-terra-geocrud)
[**django-terra-geocrud**](https://github.com/Terralego/django-terra-geocrud)
  
  * [![Build Status](https://travis-ci.org/Terralego/django-geostore.svg?branch=master)](https://travis-ci.org/Terralego/django-terra-geocrud)
[**django-geostore**](https://github.com/Terralego/django-geostore)

# ✍️ Authors <a name = "authors"></a>
- [@terralego](https://github.com/terralego) - Idea & Initial work
* powered by 
  
  <img src="https://avatars2.githubusercontent.com/u/546696?s=200&v=4" width="100" />
