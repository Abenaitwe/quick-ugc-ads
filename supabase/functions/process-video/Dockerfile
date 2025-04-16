
FROM debian:bullseye-slim

# Install FFmpeg and other required dependencies
RUN apt-get update && apt-get install -y \
    ffmpeg \
    wget \
    unzip \
    && rm -rf /var/lib/apt/lists/*

# Install Deno
RUN wget https://github.com/denoland/deno/releases/download/v1.37.0/deno-x86_64-unknown-linux-gnu.zip \
    && unzip deno-x86_64-unknown-linux-gnu.zip \
    && mv deno /usr/local/bin/ \
    && rm deno-x86_64-unknown-linux-gnu.zip

# Set working directory
WORKDIR /app

# Copy the application code
COPY . .

# Set environment variables
ENV DENO_DIR=/app/cache

# Command to run the application
CMD ["deno", "run", "--allow-net", "--allow-read", "--allow-env", "--allow-write", "--allow-run", "index.ts"]
