*Jack of all trades\.* Use third\-party software which covers multiple concerns\.

<ins>Aspects:</ins> those of the individual components it combines\.

<ins>Variants:</ins> 

- Message Bus \[<ins>EIP</ins>\], 
- API Gateway \[<ins>MP</ins>\], 
- Event Mediator \[<ins>FSA</ins>\], 
- Persistent Event Log / Shared Event Store,
- Front Controller \[<ins>SAHP</ins> but [not](<Ambiguous patterns#front-controller>) <ins>PEAA</ins>\],
- [Enterprise Service Bus](https://www.confluent.io/learn/enterprise-service-bus/) \[<ins>FSA</ins>\],
- Service Mesh \[<ins>FSA</ins>\],
- Middleware of Space\-Based Architecture \[<ins>SAP</ins>, <ins>FSA</ins>\]\.


<ins>Structure:</ins> Two or more \(usually\) extension patterns combined into a single component\.

<ins>Type:</ins> Extension\.

| *Benefits* | *Drawbacks* |
| --- | --- |
| Works off the shelf | Is yet another technology to learn |
| Improved latency | May not be flexible enough for your needs |
| Less DevOps effort | May become overcomplicated |


<ins>References:</ins> Mostly \[<ins>FSA</ins>\], [Microsoft](https://learn.microsoft.com/en-us/azure/architecture/microservices/design/gateway) on *API Gateway*, \[<ins>DEDS</ins>\] on *Shared Event Store*\.

Two or three metapatterns may be blended together into a *Combined Component* which is usually a ready\-to\-use framework which tries to cover \(and subtly create\) as many project needs as possible to make sure it will never be dropped from the project\. On one hand, such a framework may provide a significant boost to the speed of development\. On the other – it is going to force you into its own area of applicability and keep you bound within it\.

### Performance

A *Combined Component* tends to improve performance as it removes the network hop\(s\) and data serialization between the components it replaces\. It is also likely to be highly optimized\. However, that matters if you really need all the functionality you are provided with, otherwise you may end up running a piece of software which is too complex and slow for the tasks at hand\.

### Dependencies

A *Combined Component* has all the dependencies of its constituent patterns\.

### Applicability

*Combined patterns* <ins>work well</ins> for:

- *Series of similar projects\.* If your team is experienced with the technology and knows its pitfalls, it will be used efficiently and safely\.
- *Small\- to medium\-sized domains\.* An off\-the\-shelf framework relieves you of infrastructure concerns\. No thinking, no decisions, no time wasted\.


*Combined patterns* <ins>are better avoided</ins> in:

- *Research and development\.* You may find that the technology chosen is too limiting or a wrong fit for your needs after it has already been deeply integrated into your code and infrastructure\.
- *Large projects*\. Most of the combined patterns include an [*Orchestrator*](<Orchestrator>) which tends to grow unmanageably large \(requiring [some kind of division](<Orchestrator#variants-by-structure-can-be-combined>)\) as the project advances\.
- *Long\-running projects*\. You are very likely to step right into *vendor lock\-in*\. The industry will evolve, leaving you with the obsolete technology you have chosen and integrated\.


## Variants

Combined components vary in their structure and properties:

### Message Bus

<p align="center">
<img src="img/Variants/2/Message Bus.png" alt="Message Bus" width=100%/>
</p>

A *Message Bus* \[<ins>EIP</ins>\] is a [*Middleware*](<Middleware>) which employs an [*Adapter*](<Proxy#adapter-anticorruption-layer-open-host-service-gateway-message-translator-api-service-cell-gateway-inexact-backend-for-frontend-hardware-abstraction-layer-hal-operating-system-abstraction-layer-osal-platform-abstraction-layer-pal-database-abstraction-layer-dbal-or-dal-database-access-layer-data-mapper-repository>) per [*service*](<Services>) allowing services that differ in protocols to intercommunicate\.

### API Gateway

<p align="center">
<img src="img/Variants/2/Multifunctional - API Gateway.png" alt="Multifunctional - API Gateway" width=100%/>
</p>

*API Gateway* \[<ins>MP</ins>\] is a component which processes client requests \(and encapsulates the client protocol\(s\)\) much like a [*Gateway*](<Proxy#adapter-anticorruption-layer-open-host-service-gateway-message-translator-api-service-cell-gateway-inexact-backend-for-frontend-hardware-abstraction-layer-hal-operating-system-abstraction-layer-osal-platform-abstraction-layer-pal-database-abstraction-layer-dbal-or-dal-database-access-layer-data-mapper-repository>) \(a kind of [*Proxy*](<Proxy>)\) but it also splits each client request into multiple requests to the underlying services like an [*API Composer*](<Orchestrator#api-composer-remote-facade-gateway-aggregation-composed-message-processor-scatter-gather-mapreduce>) or a [*Process Manager*](<Orchestrator#process-manager-orchestrator>) \([*Orchestrators*](<Orchestrator>)\)\.

If the orchestration logic of an *API Gateway* needs to become more complex, it makes sense to split it into a separate *Gateway* and *Orchestrator*, rewriting the latter as a custom [*Application Service*](<Orchestrator#integration-micro-service-application-service>)\. When there are multiple types of clients that strongly differ in workflows and protocols, one *API Gateway* per client type is used, resulting in [*Backends for Frontends*](<Backends for Frontends (BFF)>)\. A [*Cell\-Based Architecture*](<Hierarchy#in-depth-hierarchy-cell-based-microservice-architecture-wso2-version-segmented-microservice-architecture-services-of-services-clusters-of-services>) relies on *API Gateways* for isolation of its [*Cells*](<Services#cell-wso2-definition-service-of-services-domain-uber-definition-cluster>)\.

Example: a thorough article from [Microsoft](https://learn.microsoft.com/en-us/azure/architecture/microservices/design/gateway)\.

### Event Mediator

<p align="center">
<img src="img/Variants/2/Multifunctional - Event Mediator.png" alt="Multifunctional - Event Mediator" width=100%/>
</p>

An *Event Mediator* \[<ins>FSA</ins>\] is an *orchestrating* [*Middleware*](<Middleware>)\. It not only receives requests from clients and turns each request into a multi\-step use case \(as does [*Orchestrator*](<Orchestrator>)\) but it also manages instances of the services and acts as the medium which calls them\. Moreover, it seems to be aware of all the kinds of messages in the system and which service each message must be forwarded to, resulting in an overwhelming complexity concentrated in a single component which does not even follow the separation of concerns principle\. \[<ins>FSA</ins>\] proposes countering that by using multiple *Event Mediators* [split over the following dimensions](<Orchestrator#variants-by-structure-can-be-combined>):

- Client applications or bounded contexts, dividing the *Event Mediator*’s responsibility by subdomain\.
- Complexity of a use case, with simple scenarios handled by a simple first\-line *Event Mediator* and the more complicated scenarios being forwarded to second\- and third\-line *Event Mediators* which employ advanced [*orchestration engines*](<Orchestrator>)\.


Either case, strangely, results in multiple *Middlewares* connected to the same set of [services](<Services>)\.

The *Event Mediator* pattern seems to be well established but, obviously, it may become quite messy for larger projects with nontrivial interactions\. Such cases may also be solved by separating the *Middleware* from the *Orchestrator* and [dividing the latter](<Orchestrator#variants-by-structure-can-be-combined>) into [*Backends for Frontends*](<Backends for Frontends (BFF)>) or [*Top\-Down Hierarchy*](<Hierarchy#top-down-hierarchy-orchestrator-of-orchestrators-presentation-abstraction-control-pac-hierarchical-model-view-controller-hmvc>)\.

Example: Mediator Topology in the \[<ins>FSA</ins>\] chapter on Event\-Driven Architecture\.

### Persistent Event Log, Shared Event Store

<p align="center">
<img src="img/Variants/2/Multifunctional - Shared Event Store.png" alt="Multifunctional - Shared Event Store" width=100%/>
</p>

When a [*Middleware*](<Middleware>) grants long\-term persistence, it becomes a [*Shared Repository*](<Shared Repository>)\. This may happen to an *Event Log* which implements interservice communication\.

On the other hand, a shared *Event Store*, which persists changes of internal state of services and replaces the services’ databases, may be extended to store interservice events, taking the role of a [*Middleware*](<Middleware>)\.

Either case makes changing the event schema troublesome because either all the services that read the event will need to support multiple \(historical\) schemas or you’ll have to overwrite the entire event history, translating the old schema into a new one\.

Example: \[<ins>DEDS</ins>\] shows this implemented with Apache Kafka\.

### Front Controller

<p align="center">
<img src="img/Variants/2/Front Controller.png" alt="Front Controller" width=100%/>
</p>

*Front Controller* \[<ins>SAHP</ins> but [not](<Ambiguous patterns#front-controller>) <ins>PEAA</ins>\] is the name for the first \(client\-facing\) service of a [*pipeline*](<Pipeline>) in [*Choreographed Event\-Driven Architecture*](<Pipeline#choreographed-broker-topology-event-driven-architecture-eda-event-collaboration>) when that service collects information about the status of each request it has processed and forwarded down the *pipeline\.* The status is received by listening for notifications from the downstream services and is readily available for the *Front Controller*’s clients, resembling the function of [*Query Service*](<Polyglot Persistence#query-service-front-controller-data-warehouse-data-lake-aggregate-data-product-quantum-dpq-of-data-mesh>) \([*Polyglot Persistence*](<Polyglot Persistence>)\) and [*Application Service*](<Orchestrator#integration-micro-service-application-service>) \([*Orchestrator*](<Orchestrator>)\)\.

### Enterprise Service Bus \(ESB\)

<p align="center">
<img src="img/Variants/2/Multifunctional - Enterprise Service Bus.png" alt="Multifunctional - Enterprise Service Bus" width=100%/>
</p>

An [*Enterprise Service Bus*](https://www.confluent.io/learn/enterprise-service-bus/) \(*ESB*\) \[<ins>FSA</ins>\] is a mixture of *Message Bus* \(with a stack of *Adapters* per service\) and *Event Mediator* \(built\-in *Orchestrator*\) which turns this kind of [*Middleware*](<Middleware>) into the core of the system\. The combination of a central role in organizations and its complexity was among the main reasons for the demise of [*Enterprise Service\-Oriented Architecture*](<Service-Oriented Architecture (SOA)>)\.

Example: Orchestration\-Driven Service\-Oriented Architecture in \[<ins>FSA</ins>\], [how it is born](http://memeagora.blogspot.com/2009/01/tactics-vs-strategy-soa-tarpit-of.html) and [how it dies](http://memeagora.blogspot.com/2009/03/triumph-of-hope-over-reason-soa-tarpit.html) by Neal Ford\.

### Service Mesh

<p align="center">
<img src="img/Variants/2/Multifunctional - Service Mesh.png" alt="Multifunctional - Service Mesh" width=100%/>
</p>

A *Service Mesh* \[<ins>FSA</ins>\] is a [*Middleware*](<Middleware>) that employs one or more [*Sidecars*](<Proxy#on-the-system-side-sidecar>) \[<ins>DDS</ins>\] per service as a place for *cross\-cutting concerns* \(logging, observability, encryption, protocol translation\)\. A service accesses its *Sidecar* without performance and stability penalties as they are running on the same machine\. The totality of deployed *Sidecars* makes a system\-wide virtual layer of shared libraries: though the *Sidecars* are physically separate, they are often identical and stateless, so that a service that accesses one *Sidecar* may be thought of as accessing all of them\.

A *Service* [*Mesh*](<Mesh>) is also responsible for dynamic scaling \(it creates new instances if the load increases and destroys them if they become idle\) and failure recovery of the services\. Last but not least, it provides a messaging infrastructure for the [*Microservices*](<Services#microservices>) to intercommunicate\.

### Middleware of Space\-Based Architecture

<p align="center">
<img src="img/Variants/2/Multifunctional - Space-Based Architecture.png" alt="Multifunctional - Space-Based Architecture" width=100%/>
</p>

[*Space\-Based Architecture*](<Mesh#space-based-architecture>) \[<ins>SAP</ins>, <ins>FSA</ins>\] relies on the most complex *Middleware* known – it incorporates all four of the *extension metapatterns*:

- The *Messaging Grid* is a [*Proxy*](<Proxy>) \(combination of [*Gateway*](<Proxy#adapter-anticorruption-layer-open-host-service-gateway-message-translator-api-service-cell-gateway-inexact-backend-for-frontend-hardware-abstraction-layer-hal-operating-system-abstraction-layer-osal-platform-abstraction-layer-pal-database-abstraction-layer-dbal-or-dal-database-access-layer-data-mapper-repository>), [*Dispatcher*](<Proxy#dispatcher-reverse-proxy-ingress-controller-edge-service-microgateway>), and [*Load Balancer*](<Proxy#load-balancer-sharding-proxy-cell-router-messaging-grid-scheduler>)\) that receives, preprocesses, and persists client requests\. Simple requests are forwarded to a less loaded *Processing Unit* \(service with business logic\) while complex ones go to the *Processing Grid*\.
- A *Processing Grid* is an [*Orchestrator*](<Orchestrator>) which manages multi\-step workflows for complex requests\.
- A [*Data Grid*](<Shared Repository#data-grid-of-space-based-architecture-sba-replicated-cache-distributed-cache>) is a [distributed](<Mesh>) in\-memory [database](<Shared Repository>)\. It is built of caching nodes which are co\-located with instances of *Processing Units*, making the database access extremely fast\. However, the speed and scalability is paid for with stability – any data in RAM is prone to disappearing\. Therefore the *Data Grid* backs up all the changes to a slower *Persistent Database*\.
- A *Deployment Manager* is a [*Middleware*](<Middleware>) that creates and destroys instances of *Processing Units* \(which are paired to the nodes of the *Data Grid*\), just like [*Service Mesh*](<Mesh#service-mesh>) does for [*Microservices*](<Services#microservices>) \(which are paired to [*Sidecars*](<Proxy#on-the-system-side-sidecar>) \[<ins>DDS</ins>\]\)\. However, in contrast to *Service Mesh*, it does not provide a messaging infrastructure because *Processing Units* communicate by [sharing data](<Arranging communication#shared-data>) via the *Data Grid*, not by sending messages\.


The four layers of the *Space\-Based Architecture*’s *Middleware* are reasonably independent\. Together they make a system that is both more scalable and more complex than *Microservices*\.

## Evolutions

The patterns that involve [*orchestration*](<Arranging communication#orchestration>) \(*API Gateway*, *Event Mediator* and *Enterprise Service Bus*\) may allow for most of the evolutions of [*Orchestrator*](<Orchestrator>) by deploying multiple instances of the *Combined Component* which differ in orchestration logic\. There is also one unique evolution:

- Replace the *Combined Component* with several specialized ones


<p align="center">
<img src="img/Evolutions/2/Multifunctional_ Split.png" alt="Multifunctional: Split" width=100%/>
</p>

## Summary

A *Combined Component* is a ready\-to\-use framework that may speed up development but will likely constrain your project to follow its guidelines with no regard to your real needs\.

| \<\< [Orchestrator](<Orchestrator>) | ^ [Part 3\. Extension Metapatterns](<Part 3. Extension Metapatterns>) ^ | [Part 4\. Fragmented Metapatterns](<Part 4. Fragmented Metapatterns>) \>\> |
| --- | --- | --- |


