---
title: Client
---

`Client` is a gRPC client that can interact with a gRPC server.

>  ⚠️ **Note**: Only unary RPCs are currently supported, ie. there is no support for client, server or bidirectional streaming.

| Method | Description |
|--------|-------------|
| [Client.load(importPaths, ...protoFiles)](/javascript-api/k6-net-grpc/client/client-load-importpaths----protofiles) | Loads and parses the given protocol buffer definitions to be made available for RPC requests. |
| [Client.connect(address [,params])](/javascript-api/k6-net-grpc/client/client-connect-address-params) | Opens a connection to the given gRPC server. |
| [Client.invoke(url, request [,params])](/javascript-api/k6-net-grpc/client/client-invoke-url-request-params) | Makes a unary RPC for the given service/method and returns a [Response](/javascript-api/k6-net-grpc/response). |


### Examples

<div class="code-group" data-props='{"labels": ["Simple example"], "lineNumbers": [true]}'>

```js
import grpc from "k6/net/grpc";

let client = new grpc.Client();
// Download addsvc.proto for https://grpcb.in/, located at:
// https://raw.githubusercontent.com/moul/pb/master/addsvc/addsvc.proto
// and put it in the current folder ("./" is an optional import path).
client.load(["./"], "addsvc.proto")

export default () => {
    client.connect("grpcb.in:9001", { timeout: "5s" });

    let response = client.invoke("addsvc.Add/Sum", {
        a: 1,
        b: 2
    })
    console.log(response.message.v) // should print 3

    client.close()
}
```

</div>

<div class="code-group" data-props='{"labels": ["Authorization"], "lineNumbers": [true]}'>

```js
import grpc from "k6/net/grpc";
import { check } from "k6";

const client = new grpc.Client();
client.load([], "authorization.proto", "route_guide.proto")

export function setup() {
    client.connect("auth.googleapis.com:443");
    const resp = client.invoke("google.cloud.authorization.v1.AuthService/GetAccessToken", {
        username: "john.smith@k6.io",
        password: "its-a-secret",
    });
    client.close();
    return resp.message.accessToken;

}

export default (token) => {
    client.connect("route.googleapis.com:443")
    const headers = {
        authorization: `bearer ${token}`,
    }
    const response = client.invoke("google.cloud.route.v1.RoutingService/GetFeature", {
        latitude: 410248224,
        longitude: -747127767

    }, { headers })
    check(response, { "status is OK": (r) => r && r.status === grpc.StatusOK });
    client.close()
}
```

</div>

<div class="code-group" data-props='{"labels": ["Single connection"], "lineNumbers": [true]}'>

```js
import grpc from "k6/net/grpc";
import { check } from "k6";

const client = new grpc.Client();
client.load([], "language_service.proto")

export default () => {
    if (__ITER == 0) {
        client.connect("language.googleapis.com:443")
    }
    const response = client.invoke("google.cloud.language.v1.LanguageService/AnalyzeSentiment", {})
    check(response, { "status is OK": (r) => r && r.status === grpc.StatusOK });
    // Do NOT close the client
}
```

</div>