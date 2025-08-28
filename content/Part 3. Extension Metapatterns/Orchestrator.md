<p align="center">
<img src="img/Main/Orchestrator.png" alt="Orchestrator" width=100%/>
</p>

*One ring to rule them all\.* Make a service to integrate other services\.

<ins>Known as:</ins> Orchestrator \[<ins>MP</ins>, <ins>FSA</ins>\], Orchestrated Services, Service Layer \[<ins>PEAA</ins>\], Application Layer \[[DDD](<Appendix B. Books referenced>)\], Wrapper Facade \[<ins>POSA4</ins>\], Multi\-Worker \[<ins>DDS</ins>\], Controller / Control, Workflow Owner \[<ins>FSA</ins>\] of [Microservices](<Services#microservices>), and Processing Grid \[<ins>FSA</ins>\] of [Space\-Based Architecture](<Combined Component#middleware-of-space-based-architecture>)\.

<ins>Aspects:</ins>

- Mediator \[<ins>GoF</ins>, <ins>SAHP</ins>\],
- Facade \[<ins>GoF</ins>\]\.


<ins>Variants:</ins> 

By transparency:

- Closed or strict,
- Open or relaxed\.


By structure \(not exclusive\):

- Monolithic,
- Sharded, 
- Layered \[<ins>FSA</ins>\],
- A service per client type \([*Backends for Frontends*](<Backends for Frontends (BFF)>)\),
- A service per subdomain \[<ins>FSA</ins>\] \([*Hierarchy*](<Hierarchy>)\),
- A service per use case \[<ins>SAHP</ins>\] \([*SOA*](<Service-Oriented Architecture (SOA)>)\-style\)\.


By function:

- API Composer \[<ins>MP</ins>\] / Remote Facade \[<ins>PEAA</ins>\] / [Gateway Aggregation](https://learn.microsoft.com/en-us/azure/architecture/patterns/gateway-aggregation) / Composed Message Processor \[<ins>EIP</ins>\] / [Scatter\-Gather](https://docs.aws.amazon.com/prescriptive-guidance/latest/cloud-design-patterns/scatter-gather.html) \[<ins>EIP</ins>, <ins>DDS</ins>\] / [MapReduce](https://en.wikipedia.org/wiki/MapReduce) \[<ins>DDS</ins>\],
- Process Manager \[<ins>EIP</ins>, <ins>LDDD</ins>\] / Orchestrator \[<ins>FSA</ins>\], 
- \(Orchestrated\) Saga \[<ins>LDDD</ins>\] / Saga Orchestrator \[<ins>MP</ins>\] / [Saga Execution Component](https://www.cs.cornell.edu/andru/cs711/2002fa/reading/sagas.pdf) / Transaction Script \[<ins>PEAA</ins>, <ins>LDDD</ins>\] / Coordinator \[<ins>POSA3</ins>\],
- [Integration \(Micro\-\)Service](https://github.com/wso2/reference-architecture/blob/master/event-driven-api-architecture.md) / Application Service,
- \(with a [*Gateway*](<Proxy#adapter-anticorruption-layer-open-host-service-gateway-message-translator-api-service-cell-gateway-inexact-backend-for-frontend-hardware-abstraction-layer-hal-operating-system-abstraction-layer-osal-platform-abstraction-layer-pal-database-abstraction-layer-dbal-or-dal-database-access-layer-data-mapper-repository>)\) API Gateway \[<ins>MP</ins>\] / Microgateway, 
- \(with a [*Middleware*](<Middleware>)\) Event Mediator \[<ins>FSA</ins>\], 
- \(with a [*Middleware*](<Middleware>) and [*Adapters*](<Proxy#adapter-anticorruption-layer-open-host-service-gateway-message-translator-api-service-cell-gateway-inexact-backend-for-frontend-hardware-abstraction-layer-hal-operating-system-abstraction-layer-osal-platform-abstraction-layer-pal-database-abstraction-layer-dbal-or-dal-database-access-layer-data-mapper-repository>)\) Enterprise Service Bus \(ESB\) \[<ins>FSA</ins>\]\.


<ins>Structure:</ins> A layer of high\-level business logic built on top of lower\-level services\.

<ins>Type:</ins> Extension\.

| *Benefits* | *Drawbacks* |
| --- | --- |
| Separates integration concerns from the services – decouples the services’ APIs | May increase latency for global use cases |
| Global use cases can be changed and deployed independently from the services | Qualities of the services become coupled to an extent |
| Decouples the services from the system’s clients | API design is an extra step before implementation |


<ins>References:</ins> \[<ins>FSA</ins>\] discusses orchestration in its chapters on *Event\-Driven Architecture*, *Service\-Oriented Architecture*, and *Microservices*\. \[<ins>MP</ins>\] describes orchestration\-based *Sagas* and its Order Service acts as an *Application Service* without explicitly naming the pattern\. \[<ins>POSA4</ins>\] defines several variants of *Facade*\.

An *Orchestrator* takes care of global use cases \(those involving multiple services\) thus allowing each service to specialize in its own subdomain and, ideally, forget about the existence of all the other services\. This way the entire system’s high\-level logic \(which is subject to frequent changes\) is kept \(and deployed\) together, isolated from usually more complex subdomain\-specific services\. Dedicating a [layer](<Layers>) to global scenarios makes them relatively easy to implement and debug, while the corresponding development team that communicates with clients shelters other narrow\-focused teams from disruptions\. The cost of employing an *Orchestrator* is both degraded performance when compared to basic [*Services*](<Services>) that rely on [*choreography*](<Arranging communication#choreography>) \[<ins>FSA</ins>, <ins>MP</ins>\] and some coupling of the properties of the orchestrated services as the *Orchestrator* usually treats every service in the same way\.

An *Orchestrator* fulfills two closely related roles:

- As a *Mediator* \[<ins>GoF</ins>, <ins>SAHP</ins>\] it keeps the states of the underlying components \(services\) consistent by propagating changes that originate in one component to the rest of the system\. This role is prominent in [*control* software](<Four kinds of software#control-real-time-hardware-input>), pervading automotive, aerospace, and IoT industries\. The *Mediator* role also emerges as [*Saga*](#orchestrated-saga-saga-orchestrator-saga-execution-component-transaction-script-coordinator) \[<ins>MP</ins>\]\.
- As a *Facade* \[<ins>GoF</ins>\] it builds high\-level scenarios out of smaller steps provided by the services or modules it controls\. This role is obvious for [*processing* systems](<Four kinds of software#computational-single-run-user-input>) where clients communicate with the *Facade*, but it is also featured in *control* software, because sometimes a simple event may trigger a complex multi\-component scenario managed by the system’s *Orchestrator*\.


<p align="center">
<img src="img/Misc/Orchestrator.png" alt="Orchestrator" width=100%/>
</p>

[Data *processing*](<Four kinds of software#computational-single-run-user-input>) systems, such as backends, may deploy multiple [instances](<Shards#stateless-pool-instances-replicated-stateless-services-work-queue>) of stateless *Orchestrators* to improve stability and performance\. In contrast, an *Orchestrator* in [*control* software](<Four kinds of software#control-real-time-hardware-input>) incorporates the highest\-level view of the system’s state thus it cannot be easily replicated \(as any replicated state must be kept synchronized, introducing delay or inconsistency in decision\-making\)\.

### Performance

When compared to [*choreography*](<Arranging communication#choreography>), [*orchestration*](<Arranging communication#orchestration>) usually worsens latency as it involves extra steps of communication between the *Orchestrator* and orchestrated components\. However, the effects should be estimated on case by case basis, as there are exceptions in at least the following cases:

- An *Orchestrator* may cache the state of the orchestrated system, gaining the ability to immediately respond to read requests with no need to query the underlying components\. This is very common with [*control* systems](<Four kinds of software#control-real-time-hardware-input>)\.
- An *Orchestrator* may persist a write request, respond to the client, and then start the actual processing\. Persistence grants that the request will eventually be completed as it can be restarted\.
- An *Orchestrator* may run multiple subrequests in parallel, reducing latency compared to a chain of choreographed events\.
- In a highly loaded or latency\-critical system, orchestrated services may establish direct data streams that bypass the *Orchestrator*\. A classic example is [VoIP](https://en.wikipedia.org/wiki/Voice_over_IP) where the call establishment logic \(SIP\) goes through an orchestrating server while the voice or video \(RTP\) is streaming directly between the clients\.


<p align="center">
<img src="img/Performance/Orchestrator.png" alt="Orchestrator" width=100%/>
</p>

I don’t see how orchestration can affect throughput as in most cases the *Orchestrator* can be scaled\. However, scaling weakens consistency as then no instance of the *Orchestrator* has exclusive control over the system’s state\.

### Dependencies

An *Orchestrator* may depend on the *APIs* of the services it orchestrates or define *SPIs* for them to implement, with the first mode being natural for its *Facade* \[<ins>GoF</ins>\] aspect and the second one for the *Mediator* \[<ins>GoF</ins>\]:

<p align="center">
<img src="img/Dependencies/Orchestrator.png" alt="Orchestrator" width=100%/>
</p>

If an *Orchestrator* is added to integrate existing components, it will use their APIs\.

In large projects, where each service gets a separate team, the APIs need to be negotiated beforehand, and will likely be owned by the orchestrated services\.

Smaller \(single\-team\) systems tend to be developed top\-down, with the *Orchestrator* being the first component to implement, thus it defines the interfaces it uses\. 

Likewise, [control systems](<Four kinds of software#control-real-time-hardware-input>) tend to reverse the dependencies, with their services depending on the orchestrator’s SPI – either because their events originate with the services \(so the services must have an easy way to contact the *Orchestrator*\) or to provide for polymorphism between the low\-level components\. See the [chapter on *orchestration*](<Arranging communication#orchestration>) for more details\.

### Applicability

*Orchestrators* <ins>shine</ins> with:

- *Large projects\.* The partition of business logic into a high\-level application \(*Orchestrator*\) and the multiple [subdomain *Services*](<Services#whole-subdomain-sub-domain-services>) it relies on provides perfect code decoupling and team specialization\.
- *Specialized teams\.* As an improvement over [*Services*](<Services>), the teams which develop deep knowledge of subdomains will delegate communication with customers to the application team\.
- *Complex and unstable requirements*\. The *integration* layer \(*Orchestrator*\) should be high\-level and simple enough to be easily extended or modified to cover most of the customer requests or marketing experiments without much help from the domain teams\.


*Orchestrators* <ins>fail</ins> in:

- *Huge projects\.* At least one aspect of complexity is going to hurt\. Either the number of the subdomain services and the size of their APIs will make it impossible for an *Orchestrator* programmer to find the correct methods to call, or the *Orchestrator* itself will become unmanageable due to the number and length of its use cases\. This can be addressed by dividing the *Orchestrator* into a layer of services \(resulting in [*Backends for Frontends*](<Backends for Frontends (BFF)>) or [*Cell\-Based Architecture*](<Hierarchy#in-depth-hierarchy-cell-based-microservice-architecture-wso2-version-segmented-microservice-architecture-services-of-services-clusters-of-services>)\) or multiple layers \(often yielding [*Top\-Down Hierarchy*](<Hierarchy#top-down-hierarchy-orchestrator-of-orchestrators-presentation-abstraction-control-pac-hierarchical-model-view-controller-hmvc>)\)\. It is also possible to go for the [*Service\-Oriented Architecture*](<Service-Oriented Architecture (SOA)>) as that has more fine\-grained components\.
- *Small projects*\. The implementation overhead of defining and stabilizing service APIs and the performance penalty of the extra network hop may outweigh the extra flexibility of having the *Orchestrator* as a separate system component\.
- *Low latency*\. Any system\-wide use case will make multiple calls between the application \(*Orchestrator*\) and services, with each interaction adding to the latency\.


### Relations

<p align="center">
<img src="img/Relations/Orchestrator.png" alt="Orchestrator" width=100%/>
</p>

*Orchestrator*:

- Extends [*Services*](<Services>) or, rarely, [*Monolith*](<Monolith>), [*Shards*](<Shards>), or [*Layers*](<Layers>) \(forming *Layers*\)\.
- Can be merged with a [*Proxy*](<Proxy>) into an [*API Gateway*](<Combined Component#api-gateway>), with a [*Middleware*](<Middleware>) into an [*Event Mediator*](<Combined Component#event-mediator>), or with a [*Middleware*](<Middleware>) and [*Adapters*](<Proxy#adapter-anticorruption-layer-open-host-service-gateway-message-translator-api-service-cell-gateway-inexact-backend-for-frontend-hardware-abstraction-layer-hal-operating-system-abstraction-layer-osal-platform-abstraction-layer-pal-database-abstraction-layer-dbal-or-dal-database-access-layer-data-mapper-repository>) into an [*Enterprise Service Bus*](<Combined Component#enterprise-service-bus-esb>)\.
- Is a special case \(single service\) of [*Backends for Frontends*](<Backends for Frontends (BFF)>), [*Service\-Oriented Architecture*](<Service-Oriented Architecture (SOA)>) or \(2\-layer\) [*Hierarchy*](<Hierarchy>)\.
- Can be implemented by a [*Microkernel*](<Microkernel>)\.


## Variants by transparency

It seems that an *Orchestrator*, just like a [*layer*](<Layers>), which it is, [can be](<Layers#dependencies>) *open* \(*relaxed*\) or *closed* \(*strict*\):

### Closed or strict

<p align="center">
<img src="img/Variants/2/Orchestrator - Closed.png" alt="Orchestrator - Closed" width=90%/>
</p>

A *strict* or *closed Orchestrator* isolates the orchestrated services from their users – all the requests go through the *Orchestrator*, and the services don’t need to intercommunicate\. 

### Open or relaxed

<p align="center">
<img src="img/Variants/2/Orchestrator - Open.png" alt="Orchestrator - Open" width=92%/>
</p>

An *open Orchestrator* implements a subset of system\-wide scenarios that require strict data consistency while less demanding requests go from the clients directly to the underlying services, which rely on [*choreography*](<Arranging communication#choreography>) or [*shared data*](<Arranging communication#shared-data>) for communication\. Such a system sacrifices the clarity of design to avoid some of the drawbacks of both *choreography* and *orchestration*:

- The orchestrator development team, which may be overloaded or slow to respond, is not involved in implementing the majority of use cases\.
- Most of the use cases avoid the performance penalty caused by the orchestration\.
- Failure of the *Orchestrator* does not disable the entire system\.
- The relaxed *Orchestrator* still allows for synchronized changes of data in multiple services, which is rather hard to achieve with choreography\.


## Variants by structure \(can be combined\)

The orchestration \(application \[[DDD](<Appendix B. Books referenced>)\] / [integration](https://github.com/wso2/reference-architecture/blob/master/event-driven-api-architecture.md) / [composite](https://github.com/wso2/reference-architecture/blob/master/event-driven-api-architecture.md)\) layer has several structural \(implementation\) options:

### Monolithic

<p align="center">
<img src="img/Variants/2/Orchestrator - Monolythic.png" alt="Orchestrator - Monolythic" width=42%/>
</p>

A single *Orchestrator* is deployed\. This option fits ordinary medium\-sized projects\.

### Scaled

<p align="center">
<img src="img/Variants/2/Orchestrator - Scaled.png" alt="Orchestrator - Scaled" width=100%/>
</p>

High availability requires multiple [instances](<Shards#stateless-pool-instances-replicated-stateless-services-work-queue>) of a stateless *Orchestrator* to be deployed\. A *Mediator* \([*Saga*](#orchestrated-saga-saga-orchestrator-saga-execution-component-transaction-script-coordinator), writing *Orchestrator*\) may store the current transaction’s state in a [*Shared Database*](<Shared Repository#shared-database-integration-database-data-domain-database-of-service-based-architecture>) to assure that if it crashes there is always another instance ready to take up its job\.

High load systems also require multiple instances of *Orchestrators* because a single instance is not enough to handle the incoming traffic\.

> Not all data is made equal\. For example, an online store has different requirements for reliability of its buyers’ cart contents and the payments\. If the current buyers’ carts become empty when the store’s server crashes, that makes only a minor annoyance\. However, any financial data loss or a corrupted money transfer is a real trouble\. Therefore an online store may implement its cart with a simple in\-memory *Orchestrator*, but should be very careful about the payments workflow, every step of which must be persisted to a reliable database\. 

### Layered

<p align="center">
<img src="img/Variants/2/Orchestrator - Layered.png" alt="Orchestrator - Layered" width=100%/>
</p>

\[<ins>FSA</ins>\] describes an option of a layered [*Event Mediator*](<Combined Component#event-mediator>)\. A client’s request comes to the topmost layer of the *Orchestrator* which uses the simplest \(and least flexible\) framework\. If the request is found to be complex, it is forwarded to the second layer which is based on a more powerful technology\. And if it fails or requires a human decision then it is forwarded again to the even more complex custom\-tailored orchestration layer\.

That allows the developers to gain the benefits of a high\-level declarative language in a vast majority of scenarios while falling back to hand\-written code for a few complicated cases\. The choice is not free as programmers need to learn multiple technologies, interlayer debugging is anything but easy and performance is likely to be worse than that of a monolithic *Orchestrator*\.

A similar example is using an [*API Composer*](#api-composer-remote-facade-gateway-aggregation-composed-message-processor-scatter-gather-mapreduce) for the top layer, followed by a [*Process Manager*](#process-manager-orchestrator) and a [*Saga Engine*](#orchestrated-saga-saga-orchestrator-saga-execution-component-transaction-script-coordinator)\.

### A service per client type \(Backends for Frontends\)

<p align="center">
<img src="img/Variants/2/Orchestrator - BFF.png" alt="Orchestrator - BFF" width=100%/>
</p>

If your clients strongly differ in workflows \(e\.g\. [OLAP](https://en.wikipedia.org/wiki/Online_analytical_processing) and [OLTP](https://en.wikipedia.org/wiki/Online_transaction_processing), or user and admin interfaces\), implementing dedicated *Orchestrators* is an option to consider\. That makes each client\-specific *Orchestrator* smaller and more cohesive than the unified implementation would be and gives more independence to the teams responsible for different kinds of clients\.

This pattern is known as [*Backends for Frontends*](<Backends for Frontends (BFF)>) and has a chapter of its own\.

### A service per subdomain \(Hierarchy\)

<p align="center">
<img src="img/Variants/2/Orchestrator - Hierarchy.png" alt="Orchestrator - Hierarchy" width=100%/>
</p>

In large systems a single *Orchestrator* is very likely to become overgrown and turn into a development bottleneck \(see [*Enterprise Service Bus*](<Combined Component#enterprise-service-bus-esb>)\)\. Building a [*hierarchy*](<Hierarchy>) of *Orchestrators* may help \[<ins>FSA</ins>\], but only if the domain itself is hierarchical\. The top\-level component may even be a [*Reverse Proxy*](<Proxy#dispatcher-reverse-proxy-ingress-controller-edge-service-microgateway>) if no use cases cross subdomain borders or if the sub\-orchestrators employ [choreography](<Arranging communication#choreography>), resulting in a flat [*Cell\-Based Architecture*](<Hierarchy#in-depth-hierarchy-cell-based-microservice-architecture-wso2-version-segmented-microservice-architecture-services-of-services-clusters-of-services>)\. Otherwise it is a tree\-like [*Orchestrator of Orchestrators*](<Hierarchy#top-down-hierarchy-orchestrator-of-orchestrators-presentation-abstraction-control-pac-hierarchical-model-view-controller-hmvc>)\.

### A service per use case \(SOA\-style\)

<p align="center">
<img src="img/Variants/2/Orchestrator - SOA.png" alt="Orchestrator - SOA" width=100%/>
</p>

\[<ins>SAHP</ins>\] advises for single\-purpose *Orchestrators* in [*Microservices*](<Services#microservices>): each *Orchestrator* manages one use case\. This enables fine\-grained scalability but will quickly lead to integration hell as new scenarios keep getting added to the system\. Overall, such a use of *Orchestrators* resembles the [*task layer*](<Service-Oriented Architecture (SOA)#enterprise-soa>) of [*SOA*](<Service-Oriented Architecture (SOA)>)\.

## Variants by function

*Orchestrators* may function in slightly different ways:

### API Composer, Remote Facade, Gateway Aggregation, Composed Message Processor, Scatter\-Gather, MapReduce

<p align="center">
<img src="img/Variants/2/API Composer.png" alt="API Composer" width=100%/>
</p>

*API Composer* \[<ins>MP</ins>\] is a kind of *Facade* \[<ins>GoF</ins>\] which decreases the system’s latency by translating a high\-level incoming message into a set of lower\-level internal messages, sending them to the corresponding [services](<Services>) in parallel, waiting for results and collecting the latter into a response to the original message\. Such a logic may often be defined declaratively in a third\-party tool without writing any low\-level code\. *Remote Facade* \[<ins>PEAA</ins>\] is a similar pattern which makes synchronous calls to the underlying components – it exists to implement a coarse\-grained protocol with the system’s clients, so that a client may achieve whatever it needs through a single request\. [*Gateway Aggregation*](https://learn.microsoft.com/en-us/azure/architecture/patterns/gateway-aggregation) is a generalization of these patterns\.

*Composed Message Processor* \[<ins>EIP</ins>\] disassembles *API Composer* into smaller components: it uses a *Splitter* \[<ins>EIP</ins>\] to subdivide the request into smaller parts, a *Router* \[<ins>EIP</ins>\] to send each part to its recipient, and an *Aggregator* \[<ins>EIP</ins>\] to collect the responses into a single message\. Unlike *API Composer*, it can also address [*Shards*](<Shards#persistent-slice-sharding-shards-partitions-cells-amazon-definition>) or [*Replicas*](<Shards#persistent-copy-replica>)\. A [*Scatter\-Gather*](https://docs.aws.amazon.com/prescriptive-guidance/latest/cloud-design-patterns/scatter-gather.html) \[<ins>EIP</ins>, <ins>DDS</ins>\] broadcasts a copy of the incoming message to each recipient, thus it lacks a *Splitter* \(though \[<ins>DDS</ins>\] seems to ignore this difference\)\. [*MapReduce*](https://en.wikipedia.org/wiki/MapReduce) \[<ins>DDS</ins>\] is similar to *Scatter\-Gather* except that it summarizes the results received in order to yield a single value instead of concatenating them\.

If an *API Composer* needs to conduct sequential actions \(e\.g\. first get user id by user name, then get user data by user id\), it becomes a *Process Manager* which may require some coding\.

An *API Composer* is usually deployed as a part of an [*API Gateway*](<Combined Component#api-gateway>)\.

Example: Microsoft has an [article](https://learn.microsoft.com/en-us/azure/architecture/patterns/gateway-aggregation) on aggregation\.

### Process Manager, Orchestrator

<p align="center">
<img src="img/Variants/2/Process Manager.png" alt="Process Manager" width=100%/>
</p>

*Process Manager* \[<ins>EIP</ins>, <ins>LDDD</ins>\] \(referred simply as *Orchestrator* in \[<ins>FSA</ins>\]\) is a kind of *Facade* that translates high\-level tasks into sequences of lower\-level steps\. This subtype of *Orchestrator* receives a client request, stores its state, runs pre\-programmed request processing steps, and returns a response\. Each of the steps of a *Process Manager* is similar to a whole task of an *API Composer* in that it generates a set of parallel requests to internal services, waits for the results and stores them for the future use in the following steps or final response\. The scenarios it runs may branch on conditions\.

A *Process Manager* may be implemented in a general\-purpose programming language, a declarative description for a third\-party tool, or a mixture thereof\.

A *Process Manager* is usually a part of an [*API Gateway*](<Combined Component#api-gateway>), [*Event Mediator*](<Combined Component#event-mediator>) or [*Enterprise Service Bus*](<Combined Component#enterprise-service-bus-esb>)\.

Example: \[<ins>FSA</ins>\] provides several examples\.

### \(Orchestrated\) Saga, Saga Orchestrator, Saga Execution Component, Transaction Script, Coordinator

<p align="center">
<img src="img/Variants/2/Saga.png" alt="Saga" width=100%/>
</p>

*\(Orchestrated* \[<ins>SAHP</ins>\]*\) Saga* \[<ins>LDDD</ins>\], *Saga Orchestrator* \[<ins>MP</ins>\] or [*Saga Execution Component*](https://www.cs.cornell.edu/andru/cs711/2002fa/reading/sagas.pdf) is a subtype of *Process Manager* which is specialized in *distributed transactions*\.

An *Atomically Consistent Saga* \[<ins>SAHP</ins>\] \(which is the default meaning of the term\) comprises a pre\-programmed sequence of \{“do”, “undo”\} action pairs\. When it is run, it iterates through the “do” sequence till it either completes \(meaning that the transaction succeeded\) or fails\. A failed *Atomically Consistent Saga* begins iterating through its “undo” sequence to roll back the changes that were already made\. In contrast, an *Eventually Consistent Saga* \[<ins>SAHP</ins>\] always retries its writes till all of them succeed\.

A *Saga* is often programmed declaratively in a third\-party [*Saga Framework*](<Microkernel#saga-engine>) which can be integrated into any service that needs to run a *distributed transaction*\. However, it is quite likely that such a service itself is an [*Integration Service*](#integration-micro-service-application-service) as it seems to [orchestrate](<Arranging communication#orchestration>) other services\.

A *Saga* plays the roles of both *Facade* by translating a single transaction request into a series of calls to the services’ APIs and *Mediator* by keeping the states of the services consistent \(the transaction succeeds or fails as a whole\)\. Sometimes a *Saga* may include requests to external services \(which are not parts of the system you are developing\)\.

A *Transaction Script* \[<ins>PEAA</ins>, <ins>LDDD</ins>\] is a procedure that executes a transaction, possibly over multiple databases \[<ins>LDDD</ins>\]\. Unlike a *Saga*, it is synchronous, written in a general programming language, and does not require a dedicated framework to run\. It operates database\(s\) directly while a *Saga* usually sends commands to services\. A *Transaction Script* may return data to its caller\.

*Coordinator* \[<ins>POSA3</ins>\] is a generalized pattern for a component which manages multiple tasks \(e\.g\. software updates of multiple components\) to achieve “all or nothing” results \(if any update fails, other components are rolled back\)\.

Example: \[<ins>SAHP</ins>\] investigates many kinds of *Sagas* while \[<ins>MP</ins>\] has a shorter description\.

### Integration \(Micro\-\)Service, Application Service

<p align="center">
<img src="img/Variants/2/Integration Service.png" alt="Integration Service" width=100%/>
</p>

An [*Integration Service*](https://github.com/wso2/reference-architecture/blob/master/event-driven-api-architecture.md) is a full\-scale service \(often with a dedicated database\) that runs high\-level scenarios while delegating the bulk of the work to several other services \(remarkably, delegating to a single component forms [*Layers*](<Layers>)\)\. Though an *Integration Service* usually features both functions of *Orchestrator*, in a [*control* system](<Four kinds of software#control-real-time-hardware-input>) its *Mediator* role is more prominent while in [*processing* software](<Four kinds of software#computational-single-run-user-input>) it is going to behave more like the *Facade*\. A system with an *Integration Service* often resembles a shallow [*Top\-Down Hierarchy*](<Hierarchy#top-down-hierarchy-orchestrator-of-orchestrators-presentation-abstraction-control-pac-hierarchical-model-view-controller-hmvc>)\.

Example: Order Service in \[<ins>MP</ins>\] seems to fit the description\.

## Variants of composite patterns

Several composite patterns involve an *Orchestrator* and are dominated by its behavior:

### API Gateway

<p align="center">
<img src="img/Variants/2/API Gateway.png" alt="API Gateway" width=100%/>
</p>

An *API Gateway* \[<ins>MP</ins>\] is a component that processes client requests \(and encapsulates an implementation of a client protocol\(s\)\) as a [*Gateway*](<Proxy#adapter-anticorruption-layer-open-host-service-gateway-message-translator-api-service-cell-gateway-inexact-backend-for-frontend-hardware-abstraction-layer-hal-operating-system-abstraction-layer-osal-platform-abstraction-layer-pal-database-abstraction-layer-dbal-or-dal-database-access-layer-data-mapper-repository>) \(a kind of [*Proxy*](<Proxy>)\) but also splits every client request into multiple requests to internal services as an *API Composer* or *Process Manager* \(which are *Orchestrators*\)\. It is a common pattern for backend solutions as it provides all the means to isolate the stable core of the system’s implementation from its fickle clients\. Usually a third\-party framework implements and colocates both its aspects, namely *Proxy* and *Orchestrator*, thus simplifying deployment and improving latency\.

Example: a thorough article from [Microsoft](https://learn.microsoft.com/en-us/azure/architecture/microservices/design/gateway)\.

### Event Mediator

<p align="center">
<img src="img/Variants/2/Event Mediator.png" alt="Event Mediator" width=100%/>
</p>

*Event Mediator* \[<ins>FSA</ins>\] is an *orchestrating* [*Middleware*](<Middleware>)\. It not only receives requests from clients and turns each request into a multistep use case \(as a *Process Manager*\) but it also manages the deployed instances of services and acts as a medium which transports requests to the services and receives confirmations from them\. Moreover, unlike an ordinary *Middleware*, it seems to be aware of all of the kinds of messages in the system and which service each message must be forwarded to, resulting in overwhelming complexity concentrated in a single component which does not even follow the principle of separation of concerns\. \[<ins>FSA</ins>\] recommends building a hierarchy of *Event Mediators* from several vendors, further complicating the architecture\.

Example: Mediator Topology in the chapter of \[[FSA](https://docs.google.com/document/d/1hzBn-RzzNDcArAWcvXaXgw2nl6O_ryDKE51Xve18zOs/edit?pli=1&tab=t.0#bookmark=kix.d09ykbr4tzvn)\] on Event\-Driven Architecture\.

### Enterprise Service Bus \(ESB\)

<p align="center">
<img src="img/Variants/2/Enterprise Service Bus.png" alt="Enterprise Service Bus" width=100%/>
</p>

[*Enterprise Service Bus*](https://www.confluent.io/learn/enterprise-service-bus/) \(*ESB*\) \[<ins>FSA</ins>\] is an overgrown *Event Mediator* that incorporates lots of [*cross\-cutting concerns*](https://en.wikipedia.org/wiki/Cross-cutting_concern), including protocol translation for which it utilizes at least one [*Adapter*](<Proxy#adapter-anticorruption-layer-open-host-service-gateway-message-translator-api-service-cell-gateway-inexact-backend-for-frontend-hardware-abstraction-layer-hal-operating-system-abstraction-layer-osal-platform-abstraction-layer-pal-database-abstraction-layer-dbal-or-dal-database-access-layer-data-mapper-repository>) per service\. The combination of a central role in organizations and its complexity was among the main reasons for the demise of [*Enterprise Service\-Oriented Architecture*](<Service-Oriented Architecture (SOA)#enterprise-soa>)\.

Example: Orchestration\-Driven Service\-Oriented Architecture in \[<ins>FSA</ins>\]\.

## Evolutions

Employing an *Orchestrator* has two pitfalls:

- The system becomes slower because too much communication is involved\.
- A single *Orchestrator* may grow too large and rigid\.


There is one way to counter the first point and more than one to solve the second:

- Subdivide the *Orchestrator* by the system’s subdomains, forming [*Layered Services*](<Layered Services#orchestrated-three-layered-services>) and minimizing network communication\.


<p align="center">
<img src="img/Evolutions/2/Orchestrator to Layered Services.png" alt="Orchestrator to Layered Services" width=100%/>
</p>

- Subdivide the *Orchestrator* by the type of client, forming [*Backends for Frontends*](<Backends for Frontends (BFF)>)\.


<p align="center">
<img src="img/Evolutions/2/Orchestrator to Backends for Frontends.png" alt="Orchestrator to Backends for Frontends" width=100%/>
</p>

- Add another [*layer*](<Layers>) of orchestration\.


<p align="center">
<img src="img/Evolutions/2/Orchestrator add Orchestrator.png" alt="Orchestrator add Orchestrator" width=100%/>
</p>

- Build a [*Top\-Down Hierarchy*](<Hierarchy#top-down-hierarchy-orchestrator-of-orchestrators-presentation-abstraction-control-pac-hierarchical-model-view-controller-hmvc>)\.


<p align="center">
<img src="img/Evolutions/2/Orchestrator to Hierarchy.png" alt="Orchestrator to Hierarchy" width=100%/>
</p>

## Summary

 An *Orchestrator* distills the high\-level logic of your system and keeps it together in a layer which integrates other components\. However, the separation of business logic into two layers results in much communication which impairs performance\.

| \<\< [Proxy](<Proxy>) | ^ [Part 3\. Extension Metapatterns](<Part 3. Extension Metapatterns>) ^ | [Combined Component](<Combined Component>) \>\> |
| --- | --- | --- |


