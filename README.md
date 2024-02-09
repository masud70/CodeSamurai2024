# Code Samurai 2024 (Team CU_CODECONQUEST)

## Team Members

- Md. Masud Mazumder (Email: mdmasud.csecu@gmail.com)
- Atanu Kumar Dey (Email: To be added)
- Tonmoy Chandro Das (Email: To be added)

## Run the System

We can easily run the whole with only a single command:
```bash
docker compose up --build
```

To run in detached mode run the command:
```bash
docker compose up -d --build
```

## Stop the System

Stopping all the running containers is also simple with a single command:
```bash
docker compose down
```

If you need to stop and remove all containers, networks, and all images used by any service in <em>docker-compose.yml</em> file, use the command:
```bash
docker compose down --rmi all
```