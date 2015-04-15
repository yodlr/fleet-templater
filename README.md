## Fleet Templater

Fleet Templater is a simple program that will process Fleet unit files through
a templating system.

In other words, you can take a file named ```myservice-{{env}}.service``` which
contains the following content:
```
[Unit]
Description=myservice-{{env}}
Requires=docker.service
After=docker.service

[Service]
TimeoutStartSec=0
ExecStartPre=-/usr/bin/docker kill %p-%i
ExecStartPre=-/usr/bin/docker rm %p-%i
ExecStartPre=/usr/bin/docker pull myservice:{{env}}
ExecStart=/usr/bin/docker run -e ENV={{env}} myservice:{{env}}
ExecStop=/usr/bin/docker kill %p-%i
```

and then process it with env=production to produce ```myservice-production.service```
containing the following completed data:
```
[Unit]
Description=myservice-production
Requires=docker.service
After=docker.service

[Service]
TimeoutStartSec=0
ExecStartPre=-/usr/bin/docker kill %p-%i
ExecStartPre=-/usr/bin/docker rm %p-%i
ExecStartPre=/usr/bin/docker pull myservice:production
ExecStart=/usr/bin/docker run -e ENV=production myservice:production
ExecStop=/usr/bin/docker kill %p-%i
```


### Installing and running with NodeJS

```
npm install -g node-templater
node-templater --help
```

```
node-templater render test.service ./ myval=thing
```


### Running as a docker container
```
docker pull yodlr/fleet-templater
docker run --rm -ti -v ${PWD}:/tmp fleet-templater render /tmp/test.service /tmp/ myval=thing
```
