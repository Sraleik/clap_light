## Clap Light

### Launch in dev

```
docker login registry.gitlab.com
docker run --name clap_light -d -v $(pwd):/app --device=/dev/snd:/dev/snd -p 3000:8080 registry.gitlab.com/sraleik/clap_light:dev-latest
```

### requirement

node > 6.0