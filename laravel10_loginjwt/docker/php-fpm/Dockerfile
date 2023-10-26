FROM php:8.1-fpm-alpine

LABEL maintainer="Douglas Ramos <dougarainfo@gmail.com>"

RUN apt-get update \
    && docker-php-ext-install pdo_mysql
