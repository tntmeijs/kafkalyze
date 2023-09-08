# Kafkalyze
Welcome to the Kafkalyze project!
We're creating a one-stop-shop for all your Kafka debugging needs.

Once the project matures, this readme will be updated with more information.

For now, you can just compile the application and run it like any other Java application.
To make it easier to set up all required infrastructure, a Docker Compose file has been provided in the `/server` directory.

Run `docker compose -f docker-compose-local.yaml up -d` from the root folder to start the stack.

To stop the stack, simple run `docker compose -f docker-compose-local.yaml stop` from the root folder.

# Technology stack
| Technology | Use-case |
| ---------- | -------- |
| Spring Boot | backend server |
| ReactJS | user-interface |
| Prometheus | monitoring |
| Grafana | data visualisation |
