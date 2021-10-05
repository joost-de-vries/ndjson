# ndjson
An experiment with streaming json as [new line delimited json](http://ndjson.org/) (ndjson). Using Spring Flux and Typescript fetch [ReadableStream](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API/Using_readable_streams).

Open `/server` in IntelliJ and run the Spring Boot application.

Open `/client` in Visual Code with the Deno extension installed. And run 
`deno run -A stream.ts`

