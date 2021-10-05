const debug = console.log
const ndJsonMimeType = "application/x-ndjson"

const response = await fetch("localhost:8080/stream", {
  headers: {"Content-Type": "application/x-ndjson" },
})

const jsonStream = ndJsonStream(response)

for await (const value of jsonStream) {
  debug(`value=${JSON.stringify(value)}`)
}

// uses es2018.asyncgenerator

// using ReadableStream
async function* ndJsonStream<A>(response: Response): AsyncGenerator<A, void> {
    const decoder = new TextDecoder()
    const bodyStream = response.body
    if (bodyStream === null) {
        throw Error(`Expected ${ndJsonMimeType} response body`)
    }

    for await(const value of bodyStream) {
        const chunk = decoder.decode(value, { stream: true }).trim()

        if (chunk.length > 0) {
            yield JSON.parse(chunk)
        } 
    }
    return
}

// using ReadableStreamDefaultReader
async function* ndJsonReader<A>(response: Response): AsyncGenerator<A, void> {
  const decoder = new TextDecoder()
  const bodyReader = response.body?.getReader()
  if (bodyReader === undefined) {
    throw Error(`Expected ${ndJsonMimeType} response body`)
  }

  try {
    while (true) {
      const result = await bodyReader.read()
      switch (result.done) {
        case true:
          return;
        case false: {
          const chunk = decoder.decode(result.value, { stream: true }).trim();
          debug(`chunk=${chunk}`)

          if (chunk.length > 0) {
            debug(`parsing chunk '${chunk}'`)
            yield JSON.parse(chunk)
          }
        }
      }
    }
  } finally {
    bodyReader.releaseLock();
  }
}
