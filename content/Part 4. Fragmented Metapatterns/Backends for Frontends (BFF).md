<p align="center">
<img src="img/Main/Backends for Frontends.png" alt="Backends for Frontends" width=100%/>
</p>

*Hire a local guide\.* Dedicate a service for every kind of client\.

<ins>Known as:</ins> Backends for Frontends \(BFF\), [Layered Microservice Architecture](https://github.com/wso2/reference-architecture/blob/master/api-driven-microservice-architecture.md)\.

<ins>Aspects:</ins>

- [Proxy](<Proxy>),
- [Orchestrator](<Orchestrator>)\.


<ins>Variants:</ins> 

Applicable to:

- Proxies, 
- Orchestrators,
- Proxy \+ Orchestrator pairs,
- API Gateways,
- Event Mediators\.


<ins>Structure:</ins> A layer of integration services over a shared layer of core services\.

<ins>Type:</ins> Extension, derived from [*Orchestrator*](<Orchestrator>) and/or [*Proxy*](<Proxy>)\.

| *Benefits* | *Drawbacks* |
| --- | --- |
| Clients become independent in protocols, workflows, and, to an extent, forces | No single place for cross\-cutting concerns |
| A specialized team and technology per client may be employed | More work for the DevOps team |
| The multiple *Orchestrators* are smaller and more cohesive than the original universal one |  |


<ins>References:</ins> The [original article](https://samnewman.io/patterns/architectural/bff/), a [smaller one](https://learn.microsoft.com/en-us/azure/architecture/patterns/backends-for-frontends) from Microsoft and an [excerpt](https://microservices.io/patterns/apigateway.html) from \[<ins>MP</ins>\]\. Here are [reference diagrams](https://github.com/wso2/reference-architecture/blob/master/api-driven-microservice-architecture.md) from WSO2 \(notice multiple *Microgateway* \+ *Integration Microservice* pairs\)\.

If some aspect\(s\) of serving our system’s clients strongly vary by client type \(e\.g\. OLAP vs OLTP, user vs admin, buyer vs seller vs customer support\), it makes sense to use a dedicated component \(the titular *Backend for Frontend* or *BFF*\) per client type to encapsulate the variation\. Protocol variations call for multiple [*Proxies*](<Proxy>), workflow variations – for several [*Orchestrators*](<Orchestrator>), both coming together – for [*API Gateways*](<Combined Component#api-gateway>) or *Proxy \+ Orchestrator* pairs\. It is even possible to vary the *BFF*’s programming language on a per client basis\. The drawback is that once the clients get their dedicated *BFFs* it becomes hard to share a common functionality between them, unless you are willing to add yet another new utility [*service*](<Services>) or [*layer*](<Layers>) that can be used by each of them \(and that will strongly smell of [*SOA*](<Service-Oriented Architecture (SOA)>)\)\.

### Performance

As the multiple *Orchestrators* of *BFF* don’t intercommunicate, the pattern’s performance is identical to that of an [*Orchestrator*](<Orchestrator>): it also slows down request processing in the general case but allows for several [specific optimizations](<Orchestrator#performance>), including direct communication channels between orchestrated [services](<Services>)\.

### Dependencies

Each *BFF* depends on all the services it uses \(usually every service in the system\)\. The services themselves are likely to be independent, as is common in [*orchestrated* systems](<Arranging communication#orchestration>)\.

<p align="center">
<img src="img/Dependencies/Backends for Frontends.png" alt="Backends for Frontends" width=91%/>
</p>

### Applicability

*Backends for Frontends* are <ins>good</ins> for:

- *Multiple client protocols\.* Deploying a [*Gateway*](<Proxy#adapter-anticorruption-layer-open-host-service-gateway-message-translator-api-service-cell-gateway-inexact-backend-for-frontend-hardware-abstraction-layer-hal-operating-system-abstraction-layer-osal-platform-abstraction-layer-pal-database-abstraction-layer-dbal-or-dal-database-access-layer-data-mapper-repository>) per protocol hides the variation from the underlying system\.
- *Multiple UIs\.* When you have one team per UI, each of them may [want to have](https://netflixtechblog.com/embracing-the-differences-inside-the-netflix-api-redesign-15fd8b3dc49d) an API which they feel comfortable with\.
- *Drastically different workflows\.* Let each client\-facing development team own a component and choose the best fitting technologies and practices\.


*Backends for Frontends* <ins>should be avoided</ins> when:

- *The clients are mostly similar\.* It is hard to share code and functionality between *BFF*s\. If the clients have much in common, the shared aspects either find their place in a shared monolithic layer \(e\.g\. multiple client protocols call for multiple [*Gateways*](<Proxy#adapter-anticorruption-layer-open-host-service-gateway-message-translator-api-service-cell-gateway-inexact-backend-for-frontend-hardware-abstraction-layer-hal-operating-system-abstraction-layer-osal-platform-abstraction-layer-pal-database-abstraction-layer-dbal-or-dal-database-access-layer-data-mapper-repository>) but a shared [*Orchestrator*](<Orchestrator>)\) or are duplicated\. *BFF* may not be the best choice – use OOD \(conditions, factories, strategies, inheritance\) instead to handle the clients’ differences within a single codebase\.


### Relations

<p align="center">
<img src="img/Relations/BFF.png" alt="BFF" width=100%/>
</p>

*Backends for Frontends*:

- Extends [*Services*](<Services>) or rarely [*Monolith*](<Monolith>), [*Layers*](<Layers>), or [*Shards*](<Shards>)\.
- Is derived from a client\-facing extension metapattern: [*Gateway*](<Proxy#adapter-anticorruption-layer-open-host-service-gateway-message-translator-api-service-cell-gateway-inexact-backend-for-frontend-hardware-abstraction-layer-hal-operating-system-abstraction-layer-osal-platform-abstraction-layer-pal-database-abstraction-layer-dbal-or-dal-database-access-layer-data-mapper-repository>), [*Orchestrator*](<Orchestrator>), [*API Gateway*](<Combined Component#event-mediator>), or [*Event Mediator*](<Combined Component#event-mediator>)\.


## Variants

*Backends for Frontends* vary in the kind of component that gets dedicated to each client:

### Proxies

<p align="center">
<img src="img/Variants/3/BFF - Gateways.png" alt="BFF - Gateways" width=100%/>
</p>

Dedicating a [*Gateway*](<Proxy#adapter-anticorruption-layer-open-host-service-gateway-message-translator-api-service-cell-gateway-inexact-backend-for-frontend-hardware-abstraction-layer-hal-operating-system-abstraction-layer-osal-platform-abstraction-layer-pal-database-abstraction-layer-dbal-or-dal-database-access-layer-data-mapper-repository>) per client is useful when the clients differ in the mode of access to the system \(protocols / encryption / authorization\) but not in workflows\.

Multiple *Adapters* match the literal meaning of *Backends for Frontends* – each UI team \([backend, mobile, desktop](https://www.thoughtworks.com/insights/blog/bff-soundcloud); or [end\-device\-specific](https://netflixtechblog.com/embracing-the-differences-inside-the-netflix-api-redesign-15fd8b3dc49d) teams\) gets some code on the backend side to adapt the system’s API to its needs by building a new, probably more high\-level specialized API on top of it\.

### Orchestrators

<p align="center">
<img src="img/Variants/3/BFF - Orchestrators.png" alt="BFF - Orchestrators" width=100%/>
</p>

An [*Orchestrator*](<Orchestrator>) per client makes sense if the clients use the system in completely unrelated ways, e\.g\. a shop’s customers have little to share with its administrators\.

### Proxy \+ Orchestrator pairs

<p align="center">
<img src="img/Variants/3/BFF - Gateways + Orchestrators.png" alt="BFF - Gateways + Orchestrators" width=100%/>
</p>

Clients vary in both access mode \(protocol\) and workflow\. [*Orchestrators*](<Orchestrator>) or [*Proxies*](<Proxy>) may be reused if some kinds of clients share only protocol or application logic\.

### API Gateways

<p align="center">
<img src="img/Variants/3/BFF - API gateways.png" alt="BFF - API gateways" width=100%/>
</p>

Clients vary in access mode \(protocol\) and workflow and there is a third\-party [*API Gateway*](<Combined Component#api-gateway>) framework which seems to fit your requirements off the shelf\.

### Event Mediators

<p align="center">
<img src="img/Variants/3/BFF - Event mediators.png" alt="BFF - Event mediators" width=100%/>
</p>

\[<ins>FSA</ins>\] mentions that multiple [*Event Mediators*](<Combined Component#event-mediator>) may be deployed in [*Event\-Driven Architecture*](<Pipeline#choreographed-broker-topology-event-driven-architecture-eda-event-collaboration>) to split the codebase and improve stability\.

## Evolutions

*BFF*\-specific evolutions aim at sharing logic between the *BFF*s:

- The *BFF*s can be merged into a single [*Orchestrator*](<Orchestrator>) if their functionality becomes mostly identical\.
- A shared *orchestration* [*layer*](<Layers>) with common functionality may be added for use by the *BFF*s\.
- A layer of *Integration Services* under the *BFF*s simplifies them by providing shared high\-level APIs for the resulting [*Cells*](<Services#cell-wso2-definition-service-of-services-domain-uber-definition-cluster>)\.
- [*Sidecars*](<Proxy#on-the-system-side-sidecar>) \[<ins>DDS</ins>\] \(of [*Service Mesh*](<Mesh#service-mesh>)\) are a way to share libraries among the *BFF*s\.


<p align="center">
<img src="img/Evolutions/3/BFF.png" alt="BFF" width=100%/>
</p>

## Summary

*Backends for Frontends* assigns a [*Proxy*](<Proxy>) and/or an [*Orchestrator*](<Orchestrator>) per each kind of a system’s client to encapsulate client\-specific use cases and protocols\. The drawback is that there is no decent way for sharing functionality between the *BFF*s\.

| \<\< [Polyglot Persistence](<Polyglot Persistence>) | ^ [Part 4\. Fragmented Metapatterns](<Part 4. Fragmented Metapatterns>) ^ | [Service\-Oriented Architecture \(SOA\)](<Service-Oriented Architecture (SOA)>) \>\> |
| --- | --- | --- |


