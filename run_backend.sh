#!/bin/sh

if [ ! -d "venv" ]
then
    python3 -m venv venv
fi

source venv/bin/activate

pip3 install -r requirements.txt
pip3 install --upgrade pip
pip3 install wheel
cd myface
python3 manage.py migrate
Python3 manage.py runserver

