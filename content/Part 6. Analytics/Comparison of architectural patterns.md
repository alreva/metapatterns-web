This chapter is a compilation of small sections each of which examines one aspect of the architectural patterns included in this book\. It shows the value of having a list of metapatterns to iterate over and analyze\.

## Sharing functionality or data among services

Architectural patterns manifest several ways of sharing functionality or data among their components\. Let’s consider a basic example: calls to two pieces of business logic need to be logged, while the logger is doing something more complex than mere console prints\. The business logic also needs to access a system\-wide counter\.

### Direct call

The simplest way to use a shared functionality \(aspect\) is to call the module which implements it directly\. This is possible if the users and the provider of the aspect reside in the same process, as in a [*Monolith*](<Monolith>) or module\-based \(single application\) [*Layers*](<Layers>)\.

Sharing data inside a process is similar, but usually requires some kind of protection, like an [RW lock](https://en.wikipedia.org/wiki/Readers–writer_lock), around it to serialize access from multiple threads\.

<p align="center">
<img src="img/Conclusion/Sharing-DirectCall.png" alt="Sharing-DirectCall" width=100%/>
</p>

### Make a dedicated service

In a distributed system you can place the functionality or data to share into a separate service to be accessed over the network, yielding [*Service\-Oriented Architecture*](<Service-Oriented Architecture (SOA)>) for shared utilities or a [*Shared Repository*](<Shared Repository>) / [*Polyglot Persistence*](<Polyglot Persistence>) for shared data\.

<p align="center">
<img src="img/Conclusion/Sharing-DedicatedService.png" alt="Sharing-DedicatedService" width=100%/>
</p>

### Delegate the aspect

A less obvious solution is [delegating](https://datatracker.ietf.org/doc/html/rfc1925) our needs to another layer of the system\. To continue our example of logging, a [*Proxy*](<Proxy>) may log user requests and a [*Middleware*](<Middleware>) – interservice communication\. In many cases one of these generic components is configurable to record all calls to the methods which we need to log – with no changes to the code\!

In a similar way a service may [behave as a function](<Arranging communication#functional-decentralized-streaming-paradigm--choreography>): receive all the data it needs in an input message and send back all its work as an output – and let the database access remain the responsibility of its caller\.

<p align="center">
<img src="img/Conclusion/Sharing-Delegate.png" alt="Sharing-Delegate" width=100%/>
</p>

### Replicate it

Finally, each user of a component can get its own replica\. This is done implicitly in [*Shards*](<Shards>) and explicitly in a [*Service Mesh*](<Mesh#service-mesh>) of [*Microservices*](<Services#microservices>) for libraries or [*Data Grid*](<Shared Repository#data-grid-of-space-based-architecture-sba-replicated-cache-distributed-cache>) of [*Space\-Based Architecture*](<Mesh#space-based-architecture>) for data\.

Another case of replication is importing the same code in multiple services, which happens in [single\-layer *Nanoservices*](<Services#inexact-nanoservices-api-layer>)\.

<p align="center">
<img src="img/Conclusion/Sharing-Duplicate.png" alt="Sharing-Duplicate" width=100%/>
</p>

### Summary

There are four basic ways to share functionality or data in a system:

- Deploy everything together – messy but fast and simple\.
- Place the component in question into a shared service to be accessed over the network – slow and less reliable\.
- Let another layer of the system both implement and use the needed function on your behalf – easy but generic, thus it may not always fit your code’s needs\.
- Make a copy of the component for each of its users – fast, reliable, but the copies are hard to keep in sync\.


## Pipelines in architectural patterns

Several architectural patterns involve a unidirectional data flow – a [*pipeline*](https://en.wikipedia.org/wiki/Pipeline_(software))\. Strictly speaking, every data packet in a pipeline should:

- Move through the system over the same *route* with no loops\.
- Be of the same *type*, making a *data stream*\.
- Retain its *identity* on the way\.
- Retain *temporal order* – the sequence of packets remains the same over the entire pipeline\.


Staying true to all of these points makes *Pipes and Filters* – one of the oldest known architectures\. Yet there are other architectures that discard one or more of the conditions:

### Pipes and Filters

<p align="center">
<img src="img/Conclusion/Pipelineliness-PipesAndFilters.png" alt="Pipelineliness-PipesAndFilters" width=100%/>
</p>

[*Pipes and Filters*](<Pipeline#pipes-and-filters-workflow-system>) \[<ins>POSA1</ins>\] is about stepwise [processing of a data stream](<Four kinds of software#streaming-continuous-raw-data-input>)\. Each piece of data \(a video frame, a line of text or a database record\) passes through the entire system\.

This architecture is easy to build and has a wide range of applications, from hardware to data analytics\. Though each pipeline is specialized for a single use case, a new one can often be built of the same set of generic components – this skill is mastered by Linux admins through their use of shell scripts\.

### Choreographed Event\-Driven Architecture

<p align="center">
<img src="img/Conclusion/Pipelineliness-EventDrivenArchitecture.png" alt="Pipelineliness-EventDrivenArchitecture" width=100%/>
</p>

Relaxing the *type* and loosening the *identity* clauses opens the way to [*Choreographed Event\-Driven Architecture*](<Pipeline#choreographed-broker-topology-event-driven-architecture-eda-event-collaboration>) \[<ins>SAP</ins>, <ins>FSA</ins>\], in which a service publishes notifications about anything it does that may be of interest to other services\. In such a system:

- There are multiple types of events going in different directions, like if several branched pipelines were built over the same set of services\.
- A service may aggregate multiple incoming events to publish a single, seemingly unrelated, event later when some condition is met\. For example, a warehouse delivery collects individual orders till it gets a truckload of them or until the evening comes and no new orders are accepted\.


This architecture covers way more complex use cases than [*Pipes and Filters*](<Pipeline#pipes-and-filters-workflow-system>) as multiple pipelines are present in the system and because processing an event is allowed to have loosely related consequences \(as with the parcel and truck\)\.

### Command Query Responsibility Segregation \(CQRS\)

<p align="center">
<img src="img/Conclusion/Pipelineliness-CQRS.png" alt="Pipelineliness-CQRS" width=100%/>
</p>

When data from events is stored for a future use \(as with the aggregation above\), the *type* and *temporal order* are ignored but data *identity* may be retained\. A [*CQRS*\-based system](<Layered Services#command-query-responsibility-segregation-cqrs>) \[<ins>MP</ins>\] separates paths for write \(*command*\) and read \(*query*\) requests, making a kind of data processing pipeline with the database in the middle, which stores events for an indeterminate amount of time\. It is the database that reshuffles the order of events, as a record it stores may be queried at any time, maybe in a year from its addition – or never at all\.

### Model\-View\-Controller \(MVC\)

<p align="center">
<img src="img/Conclusion/Pipelineliness-MVC.png" alt="Pipelineliness-MVC" width=100%/>
</p>

[*Model\-View\-Controller*](<Hexagonal Architecture#model-view-controller-mvc-action-domain-responder-adr-resource-method-representation-rmr-model-2-mvc2-game-development-engine>) \[<ins>POSA1</ins>\] completely neglects the *type* and *identity* limitations\. It is a coarse\-grained pattern where the input source produces many kinds of events that go to the main module which does something and outputs another stream of events of no obvious relation to the input\. A mouse click does not necessarily result in a screen redraw, while a redraw may happen on timer with no user actions\. In fact, the pattern conjoins two different short pipelines\.

### Summary

There are four architectures with unidirectional data flow, which is characteristic of [*pipelines*](<Pipeline>):

- [*Pipes and Filters*](<Pipeline#pipes-and-filters-workflow-system>),
- [*Choreographed Event\-Driven Architecture* \(*EDA*\)](<Pipeline#choreographed-broker-topology-event-driven-architecture-eda-event-collaboration>),
- [*Command \(and\) Query Responsibility Segregation* \(*CQRS*\)](<Layered Services#command-query-responsibility-segregation-cqrs>),
- [*Model\-View\-Controller* \(*MVC*\)](<Hexagonal Architecture#model-view-controller-mvc-action-domain-responder-adr-resource-method-representation-rmr-model-2-mvc2-game-development-engine>)\.


The first two, being true pipelines, are built around data processing and transformation, while for the others it is just an aspect of implementation – their separation of input and output yields pairs of streams\.

## Dependency inversion in architectural patterns

I am no fan of [*SOLID*](https://en.wikipedia.org/wiki/SOLID) – to the extent of being unable to remember what those five letters mean – thus I was really surprised to notice that one of its principles, namely [*dependency inversion*](https://en.wikipedia.org/wiki/Dependency_inversion_principle), is quite common with architectural patterns, which means that it is way more generic than *OOP* it is promoted for\.

Let’s see how dependency inversion is used on system level\.

### Patterns that build around it

<p align="center">
<img src="img/Conclusion/DI-1.png" alt="DI-1" width=100%/>
</p>

Both [*Plugins*](<Plugins>) and the derived [*Hexagonal Architecture*](<Hexagonal Architecture>) rely on dependency inversion for the same reason – to protect the *core*, which contains the bulk of the code, from variability in the external components it uses\. The *core* operates interfaces \([*SPI*](https://en.wikipedia.org/wiki/Service_provider_interface)s\) which it defines so that it may not care whatever is behind an interface\.

It is the nature of the polymorphic components that distinguishes the patterns:

- [*Plugins*](<Plugins>) allow for small pieces of code, typically contributed by outside developers, to provide customizable parts of the system’s algorithms and decision making\. Oftentimes the core team has no idea of how many diverse plugins will be written for their product\.
- [*Hexagonal Architecture*](<Hexagonal Architecture>) is about breaking dependency of the core on external libraries or services by employing [*adapters*](<Proxy#adapter-anticorruption-layer-open-host-service-gateway-message-translator-api-service-cell-gateway-inexact-backend-for-frontend-hardware-abstraction-layer-hal-operating-system-abstraction-layer-osal-platform-abstraction-layer-pal-database-abstraction-layer-dbal-or-dal-database-access-layer-data-mapper-repository>)\. Each adapter depends both on the core’s SPI and on the API of the component which it adapts\. As interfaces and contracts vary among vendors and even versions of software, which we want to be interchangeable, we need adapters to wrap the external components to make them look identical to our core\. Besides, [*stub* or *mock*](https://stackoverflow.com/questions/3459287/whats-the-difference-between-a-mock-stub) adapters help develop and test the core in isolation\.


### Patterns that often rely on it

<p align="center">
<img src="img/Conclusion/DI-2.png" alt="DI-2" width=100%/>
</p>

A few more metapatterns tend to use this approach to earn its benefits, even though dependency inversion is not among their integral features:

- [*Microkernel*](<Microkernel>), yet another metapattern derived from [*Plugins*](<Plugins>), distributes resources of *providers* among *consumers*\. Polymorphism is crucial for some of its variants, including [*Operating System*](<Microkernel#operating-system>), but may rarely benefit others, such as [*Software Framework*](<Microkernel#software-framework>)\.
- [*Top\-Down Hierarchy*](<Hierarchy#top-down-hierarchy-orchestrator-of-orchestrators-presentation-abstraction-control-pac-hierarchical-model-view-controller-hmvc>) distributes responsibility over a tree of components\. If the nodes of the tree are polymorphic, they are easier to operate, and there is dependency inversion\. However, in practice, a parent node may often be strongly coupled to the types of its children and access them directly\.
- In another kind of [*Hierarchy*](<Hierarchy>), namely [*Cell\-Based Architecture*](<Hierarchy#in-depth-hierarchy-cell-based-microservice-architecture-wso2-version-segmented-microservice-architecture-services-of-services-clusters-of-services>) \(aka *Services of Services*\), each [*Cell*](<Services#cell-wso2-definition-service-of-services-domain-uber-definition-cluster>) [may employ](https://github.com/wso2/reference-architecture/blob/master/reference-architecture-cell-based.md) a [*Cell Gateway*](<Proxy#adapter-anticorruption-layer-open-host-service-gateway-message-translator-api-service-cell-gateway-inexact-backend-for-frontend-hardware-abstraction-layer-hal-operating-system-abstraction-layer-osal-platform-abstraction-layer-pal-database-abstraction-layer-dbal-or-dal-database-access-layer-data-mapper-repository>) and outbound [*Adapters*](<Proxy#adapter-anticorruption-layer-open-host-service-gateway-message-translator-api-service-cell-gateway-inexact-backend-for-frontend-hardware-abstraction-layer-hal-operating-system-abstraction-layer-osal-platform-abstraction-layer-pal-database-abstraction-layer-dbal-or-dal-database-access-layer-data-mapper-repository>) to isolate its business logic from the environment – just like [*Hexagonal Architecture*](<Hexagonal Architecture>) does for its monolithic core\.


### Patterns that may use it

<p align="center">
<img src="img/Conclusion/DI-3.png" alt="DI-3" width=100%/>
</p>

Finally, two basic architectures, [*Layers*](<Layers>) and [*Services*](<Services>), may resort to something similar to dependency inversion to decouple their constituents:

- We often see a higher layer to depend on and a lower layer to implement a standardized interface, like POSIX or SQL, to achieve *interoperability* with other implementations \(which is yet another wording for polymorphism\)\.
- A service may follow the concept of [*Hexagonal Architecture*](<Hexagonal Architecture>) by using an [*Anti\-Corruption Layer*](<Services#dependencies>) \[[DDD](<Appendix B. Books referenced>)\] or [*CQRS Views*](<Polyglot Persistence#reporting-database-cqrs-view-database-event-sourced-view-source-aligned-native-data-product-quantum-dpq-of-data-mesh>) \[<ins>MP</ins>\] as [*Adapters*](<Proxy#adapter-anticorruption-layer-open-host-service-gateway-message-translator-api-service-cell-gateway-inexact-backend-for-frontend-hardware-abstraction-layer-hal-operating-system-abstraction-layer-osal-platform-abstraction-layer-pal-database-abstraction-layer-dbal-or-dal-database-access-layer-data-mapper-repository>) that protect it from changes in other system components\.


### Summary

Many architectural patterns employ dependency inversion by adding:

- an *interface* to enable polymorphism of their lower\-level components or 
- [*Adapters*](<Proxy#adapter-anticorruption-layer-open-host-service-gateway-message-translator-api-service-cell-gateway-inexact-backend-for-frontend-hardware-abstraction-layer-hal-operating-system-abstraction-layer-osal-platform-abstraction-layer-pal-database-abstraction-layer-dbal-or-dal-database-access-layer-data-mapper-repository>) to protect a component from changes in its dependencies\.


The two approaches apply in different circumstances:

- If you can enforce your rules of the game on the suppliers of the external components, you merely *define an SPI*, and expect the suppliers to implement and obey it\.
- If the suppliers are independent and it is your side that adapts to their rules, you should *add Adapters* to translate between your lovely SPI and their whimsical APIs\.


## Indirection in commands and queries

*We can solve any problem by introducing an extra level of indirection* – states the [old adage](https://en.wikipedia.org/wiki/Fundamental_theorem_of_software_engineering)\. We will not explain how this rule drives [deep learning](https://en.wikipedia.org/wiki/Deep_learning), at least for now\. Instead, let’s concentrate our effort on indirection in communication between services\.

Each component operates its own *domain model* \[[DDD](<Appendix B. Books referenced>)\] which translates into objects and/or procedures convenient for use in the component’s subdomain\. However, should a system cover multiple subdomains, the best models for its parts to operate start to mismatch\. Furthermore, they are likely to diverge progressively over time as requirements heap up and [the project matures](<Architecture and product life cycle>)\.

If we want for each module or service to continue with a model that fits its needs, we have to protect it from the influence of models of other components by employing indirection – a translator – between them\.

> In a system of subdomain\-dedicated [*Services*](<Services>) a service may need to operate entities that are defined in another service’s subdomain\. For example, the financial and recruiting departments’ software operates employees, but the employee data which each department needs is different\. Moreover, it also differs from the employee records in the HR department which is responsible for adding, editing, and discarding the employees\. We don’t want our accountants to spend their nights seeking the correlation between salaries, birthday horoscopes from HRs, and MBTI tests from the recruiters\.

### Command \(OLTP\) systems

<p align="center">
<img src="img/Conclusion/Indirection-Command.png" alt="Indirection-Command" width=100%/>
</p>

More often than not our system consists of services that command each other: via [RPC](https://en.wikipedia.org/wiki/Remote_procedure_call)s, requests or even notifications – no matter how, one component makes a call to action which other\(s\) should obey\.

In such a case we employ an [*Adapter*](<Proxy#adapter-anticorruption-layer-open-host-service-gateway-message-translator-api-service-cell-gateway-inexact-backend-for-frontend-hardware-abstraction-layer-hal-operating-system-abstraction-layer-osal-platform-abstraction-layer-pal-database-abstraction-layer-dbal-or-dal-database-access-layer-data-mapper-repository>) between two services or an [*Orchestrator*](<Orchestrator>) when cooperation of several services is needed to execute our command:

- An [*Anticorruption Layer*](<Proxy#adapter-anticorruption-layer-open-host-service-gateway-message-translator-api-service-cell-gateway-inexact-backend-for-frontend-hardware-abstraction-layer-hal-operating-system-abstraction-layer-osal-platform-abstraction-layer-pal-database-abstraction-layer-dbal-or-dal-database-access-layer-data-mapper-repository>) \[[DDD](<Appendix B. Books referenced>)\] is an *Adapter* on the dependent service’s side: as soon as we call another service, we start depending on its interface, while it is in our interest to isolate ourselves from its peculiarities and possible future changes\. Thus we should better write and maintain a component to translate the foreign interface, defined in terms of the foreign domain model, into terms convenient for use with our code\. Even if we subscribe to notifications, we may also want to have an *Adapter* to transform their payload\.
- An [*Open Host Service*](<Proxy#adapter-anticorruption-layer-open-host-service-gateway-message-translator-api-service-cell-gateway-inexact-backend-for-frontend-hardware-abstraction-layer-hal-operating-system-abstraction-layer-osal-platform-abstraction-layer-pal-database-abstraction-layer-dbal-or-dal-database-access-layer-data-mapper-repository>) \[[DDD](<Appendix B. Books referenced>)\] resides on the other side of the connection – it is an *Adapter* that a service provider installs to hide the implementation details of its service from its users\. It will typically translate from the provider’s domain model into a more generic \(subdomain\-agnostic\) interface suitable for use by services that implement other subdomains\.
- An [*Orchestrator*](<Orchestrator>) \(which can be an [*API Composer*](<Orchestrator#api-composer-remote-facade-gateway-aggregation-composed-message-processor-scatter-gather-mapreduce>) \[<ins>MP</ins>\], [*Process Manager*](<Orchestrator#process-manager-orchestrator>) \[<ins>EIP</ins>, <ins>LDDD</ins>\], or [*Saga Orchestrator*](<Orchestrator#orchestrated-saga-saga-orchestrator-saga-execution-component-transaction-script-coordinator>) \[<ins>MP</ins>\]\) spreads a command to multiple services, waits for each of them to execute their part, and cleans up after possible failures\. It tends to be more complex than other translators because of the coordination logic involved\.


### Query \(OLAP\) systems

<p align="center">
<img src="img/Conclusion/Indirection-Query.png" alt="Indirection-Query" width=100%/>
</p>

There is often another aspect of communication in a system, namely, information collection and analysis\. And it runs into a different set of issues which cannot be helped by mere interface translation\.

Each service operates and stores data in its own format and schema which matches its *domain model*, as discussed above\. When another service needs to analyze the foreign data according to its own domain model, it encounters the fact that the foreign format\(s\) and schema\(s\) don’t allow for efficient processing – in the worst case it would have to read and re\-process the entire foreign service’s dataset to execute a query\.

The solution employs an intermediate database as a translator from the provider’s to consumer’s preferred data access mode, format, and schema:

- A [*CQRS View*](<Polyglot Persistence#reporting-database-cqrs-view-database-event-sourced-view-source-aligned-native-data-product-quantum-dpq-of-data-mesh>) \[<ins>MP</ins>\] resides in the data consumer and aggregates the stream of changes published by the data provider\. This way the consumer can know whatever it needs about the state of the provider without making an interservice call\.
- [*Data Mesh*](<Pipeline#data-mesh>) \[<ins>LDDD</ins>\] is about each service exposing a general\-use public interface for streaming and/or querying its data\. Maintaining one often requires the service to set up an internal [*Reporting Database*](<Polyglot Persistence#reporting-database-cqrs-view-database-event-sourced-view-source-aligned-native-data-product-quantum-dpq-of-data-mesh>)\.
- A [*Query Service*](<Polyglot Persistence#query-service-front-controller-data-warehouse-data-lake-aggregate-data-product-quantum-dpq-of-data-mesh>) \[<ins>MP</ins>\] aggregates streams from multiple services to collect their data together, making it available for efficient queries \(joins\)\.


### Summary

We see that though command\-dominated \(*operational* or *transactional*\) and query\-dominated \(*analytical*\) systems differ in their problems, the architectural solutions which they employ to decouple their component services match perfectly:

- [*Anticorruption Layer*](<Proxy#adapter-anticorruption-layer-open-host-service-gateway-message-translator-api-service-cell-gateway-inexact-backend-for-frontend-hardware-abstraction-layer-hal-operating-system-abstraction-layer-osal-platform-abstraction-layer-pal-database-abstraction-layer-dbal-or-dal-database-access-layer-data-mapper-repository>) or [*CQRS View*](<Polyglot Persistence#reporting-database-cqrs-view-database-event-sourced-view-source-aligned-native-data-product-quantum-dpq-of-data-mesh>) is used on the consumer’s side,
- [*Open Host Service*](<Proxy#adapter-anticorruption-layer-open-host-service-gateway-message-translator-api-service-cell-gateway-inexact-backend-for-frontend-hardware-abstraction-layer-hal-operating-system-abstraction-layer-osal-platform-abstraction-layer-pal-database-abstraction-layer-dbal-or-dal-database-access-layer-data-mapper-repository>) or [*Data Mesh*](<Pipeline#data-mesh>)’s [*Reporting Database*](<Polyglot Persistence#reporting-database-cqrs-view-database-event-sourced-view-source-aligned-native-data-product-quantum-dpq-of-data-mesh>) is on the provider’s side,
- [*Orchestrator*](<Orchestrator>) or [*Query Service*](<Polyglot Persistence#query-service-front-controller-data-warehouse-data-lake-aggregate-data-product-quantum-dpq-of-data-mesh>) coordinates multiple providers\.


Which shows that the principles of software architecture are deeper than the [CQRS](https://en.wikipedia.org/wiki/Command_Query_Responsibility_Segregation) dichotomy\.

| \<\< [Part 6\. Analytics](<Part 6. Analytics>) | ^ [Part 6\. Analytics](<Part 6. Analytics>) ^ | [Ambiguous patterns](<Ambiguous patterns>) \>\> |
| --- | --- | --- |


