#!/usr/bin/bash

# Can we connect to the desired port?
if  ! nc -z localhost 81 ; then
	# if not, start the program
	cd /var/www/html/
	nohup node grassworld-backend.js &
fi
