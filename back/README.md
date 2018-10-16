# ISEP Live backend

## Install (prod)
This springboot app uses the plugin `spring-boot-maven-plugin` to create an executable jar file.
It can then be used to create a service.

**Steps to install the app:**
1. Build the springboot app with the prod profile `mvn package -Dspring.profiles.active=prod -DskipTests`
2. Copy the jar inside the `tmp` folder on the host
3. Create the symlink if it doesn't exist `sudo ln -s /var/myapp/myapp.jar /etc/init.d/myapp` 
(unlink it first if the path changed)
4. Start the service `service myapp start`
