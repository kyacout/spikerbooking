# SPIKERBOOKING

## Table of Contents

- [Setup Environment](#setupenvironment)
- [install dependencies](#installdependencies)
- [running project after installation](#runningprojectafterinstallation)
- [development cycle](#developmentcycle)
- [pull request](#pullrequest)

<a name="setupenvironment"/>

## Setup Environment

1. First of all you need to install Node.js on your machine and make sure node version is 16.13.2
   - you can use nvm if you have different versions of node installed , after installing nvm open terminal and run
   ```bash
   nvm use 16.13.2
   ```
2. install yarn

3. Install rails using rbenv make sure rails version is 6

   - install rbenv
   - install ruby using rbenv
   - work with gem to install bundle
   - work with gem to install rails -- make sure its version is 6

4. Install postgreSQL

   - try to connect it with rails which installed previously if it works correctly move to next step

5. Install Elasticsearch

   - configure it to its default port which is 9200,

6. Now you can clone the repo

   - use ssh in cloning , http is not supported now by github
   - create a ssh key on your machine and add it to your github

7. create development.key file
   - follow this path `FOLDER_WHERE_YOU_CLONED_REPO/spikerbooking/config/credentials/`
   - now create new file and name it `development.key`
   - open file and copy the given credentials

<a name="installdependencies"/>

## install dependencies

1. Open terminal in main folder path `FOLDER_WHERE_YOU_CLONED_REPO/spikerbooking`

   - make sure the version of node is 16.13.2

   ```bash
   $ node --version
   > 16.13.2
   ```

   - if it wasn't this version switch to it using

   ```bash
   $ nvm use 16.13.2
   ```

   - now use yarn to install all dependencies

   ```bash
   $ yarn install
   ```

   - use bundle

   ```bash
   $ bundle
   ```

   - make sure that Elasticsearch service is working

   ```bash
   curl localhost:9200
   ```

   if it curl successfully so it's running if not start elasticsearch service

   - now create db using rake

   ```bash
   $ rake db:create
   $ rake db:migrate
   $ rake db: seed
   ```

   - now you can run rails server

   ```bash
   $ rails s
   ```

   - open `http://127.0.0.1:3000/` in your browser

<a name="runningprojectafterinstallation"/>

## running project after installation

1. open terminal in main folder path `FOLDER_WHERE_YOU_CLONED_REPO/spikerbooking` to start server
   - run
   ```bash
   $ rails s
   ```
2. open another terminal in main folder path `FOLDER_WHERE_YOU_CLONED_REPO/spikerbooking` to start webpack development server
   - run
   ```bash
   $ ./bin/webpack-dev-server
   ```
3. open another terminal in main folder path `FOLDER_WHERE_YOU_CLONED_REPO/spikerbooking` to interact with db using rails CLI
   - run
   ```bash
   $ rails c
   ```
   - then interact with db

<a name="developmentcycle"/>

## development cycle

1. check out main
   - run
   ```bash
   git checkout main
   git pull origin main
   ```
2. check out `feature-branch` if it already exits if not create a new branch by the assigned task name on jira and skip steps 3 and 4
   - run
   ```bash
   git checkout <feature-branch>
   ```
3. merge main into `feature-branch`
   - run
   ```bash
   git merge main
   ```
4. fix any conflict - if any happens

5. before pushing you can check your code circleci test

   - open new terminal in main folder path `FOLDER_WHERE_YOU_CLONED_REPO/spikerbooking`
   - run

   ```bash
   yarn lint
   ```

   - if there is any errors fix them and then run the previous command again

6. push `feature-branch` to origin
   - run
   ```bash
   git push origin <feature-branch>
   ```

<a name="pullrequest"/>

## pull request

1.  push `feature-branch` to origin after making the development cycle
2.  create pull request
