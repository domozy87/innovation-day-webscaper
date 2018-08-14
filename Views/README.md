Overview
========

This is a repository for WE News Flow Framework Application Distribution. It is integrated with PHP 7.0

Local Development Installation with Docker
==========================================

Make sure you have `docker` and `docker-compose` installed in your local machine.
See <https://confluence.web-essentials.asia/display/QA/Docker%3A+Installation> for instructions.

(Tested with `Ubuntu` 14.04 LTS, `docker` version >= 1.11 and `docker-compose` version >= 1.6)

Installation Steps:
-------------------

* Clone the project to your local development workspace

	```bash
	git clone git@git.web-essentials.asia:014-701/innovation.git ~/dev/innovation
	```

* Navigate into the newly cloned project and install its dependencies with composer (requires php version >= 7.0 on local machine)

	```bash
	cd ~/dev/innovation/projects/news
	composer install
	```

* Configure the database connection

Adjust the template for your local docker environment

	cp Configuration/Development/Settings.yaml.example Configuration/Development/Settings.yaml

Edit `Configuration/Development/Settings.yaml` and adjust the database settings to the following:

```
TYPO3:
  Flow:
    persistence:
      backendOptions:
        driver: 'pdo_mysql'
        host: db
        dbname: dockerflow
        user: root
        password: root
```

* Start docker containers

	```bash
	bin/dockerflow up -d
	```

* Syncontent [TBC]

Working with `grunt`
====================

You need to have compass and some other gems installed on your computer. This step can be skip if
`compass`, `bower` and `npm` are already installed on your machine.

	sudo gem install compass stitch susy
	sudo apt-get install npm
	sudo npm install -g grunt-cli bower

Install node dependencies and compile resources:

	cd Packages/Application/WE.News
	npm install
	bower install
	grunt build

* When working on *.scss files

Run `grunt` in the directory `Packages/Application/WE.News` to watch the changes and do auto compile.

Last part
=========

* There is a known issue with file permission generated inside container, so fix it by giving yourself owner of everything

	```bash
	sudo chown -R ${USER}:${USER} ~/dev/innovation/projects/news/
	```

* You now can access the introduction site with <http://news:8080/>

Testing environment
===================

Note: we assume that you use the default database created by Dockerflow.

* Create the `Development/Testing` folder. Run this command from your root project directory:

```
mkdir Configuration/Development/Testing
```

* Copy Setting.yml file to configure database connection for testing context

```
cp Configuration/Development/Settings.yaml.example Configuration/Development/Testing/Settings.yaml
```

* Edit Configuration/Development/Testing/Settings.yaml and make sure that you have dbname, user, password, host and force MySQL driver.

```
TYPO3:
  Flow:
    persistence:
      backendOptions:
        driver: 'pdo_mysql'
        dbname: 'dockerflow_test'     # adjust to your database name
        user: 'root'             # adjust to your database user
        password: 'root'         # adjust to your database password
        host: 'db'
```

* Create the route file `Configuration/Development/Testing/Routes.yaml` to handle request from `WE.Testing`

```
##
# Testing subroutes
#
-
  name: 'WE Testing'
  uriPattern: '<WETestingSubroutes>'
  defaults:
    '@package':    'WE.Testing'
    '@format':     'html'
  subRoutes:
    WETestingSubroutes:
      package: WE.Testing
```

* Create the `Testing/Behat` folder. Run this command from your root project directory:

```
mkdir Configuration/Testing/Behat
```

* Copy Settings.yaml file from Testing to configure database connection for behat testing context.

```
cp Configuration/Development/Testing/Settings.yaml Configuration/Testing/Behat/Settings.yaml
```

* Login to the app container and run database migration

```
bin/dockerflow run app /bin/bash

FLOW_CONTEXT=Development/Testing ./flow flow:cache:flush --force
FLOW_CONTEXT=Development/Testing ./flow doctrine:migrate
```

How to run behaviour tests (behat)
==================================

* Login to the app container (needed because of database access)

```
bin/dockerflow run app /bin/bash
```

* Flush and warmup caches before running to make sure you start from a clear state

```
FLOW_CONTEXT=Development/Testing ./flow flow:cache:flush --force
FLOW_CONTEXT=Development/Testing ./flow cache:warmup
```

* Run tests with the chrome profile (needs selenium server running on host machine)

```
FLOW_CONTEXT=Development/Testing bin/behat -c Packages/Application/WE.News/Tests/Behaviour/Behat.yml -p chrome --suite=default
```

* Run specific test or feature by name

```
FLOW_CONTEXT=Development/Testing bin/behat -c Packages/Application/WE.News/Tests/Behaviour/Behat.yml -p chrome --suite=default --name="Homepage"
```

* Run SmokeTests (optional)

```
FLOW_CONTEXT=Development/Testing bin/behat -c Packages/Application/WE.News/Tests/Behaviour/Behat.yml -p chrome --suite=SmokeSuite
```

How to run unit test
====================

* Execute the phpunit command to run tests (either inside container or on host machine)

```
bin/phpunit -c Build/BuildEssentials/PhpUnit/UnitTests.xml Packages/Application/WE.News/Tests/Unit/
```

How to run functional test
==========================

* Login to the app container (needed because of database access)

```
bin/dockerflow run app /bin/bash
```

* Flush and warmup caches before running to make sure you start from a clear state

```
FLOW_CONTEXT=Testing ./flow flow:cache:flush --force
FLOW_CONTEXT=Testing ./flow cache:warmup
```

* Execute the phpunit command to run tests

```
FLOW_CONTEXT=Testing bin/phpunit -c Build/BuildEssentials/PhpUnit/FunctionalTests.xml Packages/Application/WE.News/Tests/Functional/
```
