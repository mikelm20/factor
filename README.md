# factor

Speech-to-text benchmark from 2021. Upload a video, the backend extracts the audio and transcribes it in parallel through five engines so the transcripts can be compared side by side: AWS Transcribe, Google Cloud Speech, IBM Watson, Azure Cognitive Services, and self-hosted Mozilla DeepSpeech 0.9.3 running inside the container.

Built as a graduate project at Illinois Institute of Technology. Not maintained.

## Layout

```
factor-back-end/    Node.js + Express + Mongoose. One service module per engine behind a common transcript controller.
factor-front-end/   React with Auth0 login (an earlier Angular frontend is in history).
Deployment/         docker-compose stacks: local, Azure Container Instances testing, Azure backend. nginx serves the frontend, mongo-express as a DB UI.
```

## How it works

1. `ffmpeg` extracts audio; `sox` resamples to what each engine requires.
2. The five services run concurrently and each writes its transcript back to MongoDB.
3. The frontend shows the transcripts next to each other for the same clip.

DeepSpeech is installed with `pip` inside the image and runs the `.pbmm` model plus scorer from the CLI, which made a self-hosted engine directly comparable with four managed APIs.

## Running

Copy `Deployment/FactorAzureBack/.back.env.example` to `.back.env` and fill in the provider credentials, then:

```
docker compose -f Deployment/docker-compose.yml up --build
```

The `wait-for.sh` entrypoint holds the API until MongoDB answers.

## License

MIT.
