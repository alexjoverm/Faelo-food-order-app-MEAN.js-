# MEANJS stack

I've stopped MEAN.io development (it was at the beginning, so lucky me) because some reasons:

* Strict and "strange" way to organise the app. You should put everything in a package
* Impossibility of configuration for developing locally and pushing to OpenShift. Just one or another (yes, I've tried almost everything)

So from now I'm using **MEAN.js** with the **angular-fullstack** yeoman generator. Since the beginning, I've found:

* Organisation more flexible and logic
* Easier and possible to make it work
* Cool scaffolding


### 1. Installation and configuration

I've just followed the steps on the [example of MEAN on OpenShift](https://developers.openshift.com/en/node-js-example-meanstack.html)







.

------------
------------
.

# MEAN.io + OpenShift logging

**NOTE: this development has been abandoned**

Here I'll write the commands I've found out and the steps for creating the app.

### Useful commands

**Most used**:
* `ssh 55356745fcf933dbdc000215@mean-alextest.rhcloud.com`: connect to the app

**App info**:
* `rhc show-app APP_NAME`: display info about the app
* `rhc show-app APP_NAME --gears quota`: display info about the quota used by the app

**App management**:
* `rhc app tidy APP_NAME`: runs a clean-up
* `rhc app restart -a APP_NAME`

**Cartridge management**:
* `rhc cartridge add CARTRIDGE_NAME -a APP_NAME`
* `rhc cartridge restart CARTRIDGE_NAME -a APP_NAME`



## 1. First steps

Install MongoDB and the [Openshift command line](https://developers.openshift.com/en/managing-client-tools.html) (rhc). Of course, first create an Openshift account.

```
sudo brew install mongodb
gem install rhc
```

And run `rhc setup`.


Then create the MEAN.IO ready boilerplate app:

```
rhc app create APP_NAME nodejs-0.10 mongodb-2.4 --env NODE_ENV=production --from-code https://github.com/linnovate/mean-on-openshift.git
```

Adds **rockmongo**:
```
rhc cartridge add rockmongo -a mean
```
Now you can access the interface by going to this url:
```
APP_NAME-DOMAIN_NAME.rhcloud.com/rockmongo
    // In my case: mean-alextest.rhcloud.com/rockmongo
```

### 1.1 MongoDB excessive space usage

MongoDB uses **preallocations**, which is some kind of optimisations and security. But they take so much space. 

After create the app, it takes 0.7GB out of 1GB. That's a problem because we only have 300MB left.

To gain some space, we can remove the defaults preallocations by running, on a ***ssh connection***:

```
rm -rf mongodb/data/journal/*
```

Then from a host terminal:
```
rhc cartridge restart mongodb-2.4 -a APP_NAME
```

Now we should have around 700MB free. 

**Note**: by default, OpenShift have disabled preallocations. There is no need to change the `mongodb.conf` file



