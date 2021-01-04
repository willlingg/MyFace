#!/bin/sh

if [ ! -d "venv" ]
then
    python3 -m venv venv
fi

source venv/bin/activate

pip install --upgrade pip
pip install wheel
pip install -r requirements.txt
cd myface
python3 manage.py migrate
Python3 manage.py runserver

