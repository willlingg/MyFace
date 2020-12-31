#!/bin/sh

cd myface/frontend
npm install
export PORT=3000
export BROWSER=chromium
npm start
