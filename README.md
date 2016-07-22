# .io Domain Scanner

<img width="594" alt="screen shot 2016-07-21 at 23 37 12" src="https://cloud.githubusercontent.com/assets/818400/17039745/2361715e-4f9c-11e6-8757-cb59b07a7984.png">

#Intro

I was looking recently for free .io domains for some of my OSS projects and than I thought it will be nice to have spme commandline utility to scan for domain names by list of brainstormed words

# Install

``npm install``

# How it works?

Just put your ideas for domains in "list_of_words.txt" and run ```npm start```

# Config

Use the ```.nic.io-scannerrc``` to configure the app. Please, keep in mind that tweaking the ```minimumSeconds``` and ```maximumSeconds``` affect the time, that you execute a query to https://nic.io, and if you put too short interval, they will block your access to the site.
