<h3 align="center">GeoCRUD - Template</h3>

<div align="center">

  [![Status](https://img.shields.io/badge/status-active-success.svg)]()
  [![GitHub Issues](https://img.shields.io/github/issues/terralego/visu-back.svg)](https://github.com/terralego/geocrud/issues)
  [![GitHub Pull Requests](https://img.shields.io/github/issues-pr/terralego/visu-back.svg)](https://github.com/terralego/geocrud/pulls)
  [![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

</div>

---

<p align="center"> GeoCRUD is a Geographic CRUD editor base on terralego.
    <br>
    @powered with <strong>django-geostore</strong>
</p>

## Prerequisites

In order to install the backend server application, you need to fulfil
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
* Make command available  (optional)

## Installation

```bash
git clone ****
cd ***
git submodule init
git submodule update
make all  (or docker-compose build)
make up (or docker-compose up)
```

### Configuration & Customization

* As you want, you can customize your GeoCRUD instance
  * By adding dependencies in requirements.txt (we recommend to use pip-tools / edit requirements.in / generate requirements.txt / rebuild with docker-compose)
  * By editing basic values in .env file (see project/settings/{base.py | prod.py} to see available environment variables)
  * By adding your own code in conf/custom.py (add django apps, customize code and functions, all settings variables are accessible and editable)
  * By access /config endpoint with a super user access to create and set Crud views / Data layers / Map base layers et set some other settings

## Create a 1rst superuser

docker-compose run --rm django ./manage.py createsuperuser

## Load demo

* docker-compose run --rm django ./manage.py loaddata /app/fixtures/demo.json



## Recommended production settings

* enable ssl in backend

Once SSL configuration and / or frontend proxy configuration enabled, add
SSL_ENABLE=True in your .env field and restart stack

* add SENTRY_DSN or configure error tracking by email (configure EMAIL_ variables and set ADMINS tuple in custom.py)

## Backup

* We recommend to backup your database and your data local folder periodically

#### Next ?

- Fix lack permissions system (Unifying and configuring to link them to groups or users)
- Open to custom User model
- Make GeoCRUD configurable in frontend
- Plug DataSource to manage data import and synchronisation
- Plug "Visu" to generate Read only interfaces
- Improve django-terra-geocrud (multiple layout by layer, show and define relations, Generate DOCX and PDF sheets)


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
