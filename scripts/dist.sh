#!/usr/bin/env sh

stat dist || mkdir dist

zip dist/$npm_package_name.zip -r dist ../package.json ../package-lock.json