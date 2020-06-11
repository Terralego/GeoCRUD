update_front:
	git submodule init
	git submodule update

front: update_front
	docker-compose build --build-arg NODE=$(shell cat ./front/.nvmrc | tr -d 'v') front

back:
	docker-compose build django

all: front back

run:
	docker-compose up
