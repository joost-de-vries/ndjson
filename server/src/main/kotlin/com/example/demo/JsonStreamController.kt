package com.example.demo

import kotlinx.coroutines.delay
import kotlinx.coroutines.flow.flow
import kotlinx.coroutines.reactor.asFlux
import org.springframework.http.MediaType
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import reactor.core.publisher.Flux
import java.time.Instant

@RestController
@RequestMapping("/")
class JsonStreamController {
    @RequestMapping("/stream", produces = [MediaType.APPLICATION_NDJSON_VALUE])
    fun stream(): Flux<StreamKey> =
        flow {
            emit(AEntry(A(3)))
            println("emitted A")
            delay(5000)
            emit(BEntry(B(Instant.now())))
//            println("emitted B")
            emit(CEntry(C("some")))
            println("emitted B and C")
        }.asFlux()
}

interface StreamKey

data class AEntry(val a: A) : StreamKey
data class A(val someNumber: Int)

data class BEntry(val b: B) : StreamKey
data class B(val someInstant: Instant)

data class CEntry(val c: C) : StreamKey
data class C(val someString: String)