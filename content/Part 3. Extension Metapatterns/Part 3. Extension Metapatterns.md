These patterns extend *Services*, *Shards*, or even a *Monolith* with a layer that provides an aspect or two of the system’s behavior and often glues other components together\.

### [Middleware](<Middleware>)

<p align="center">
<img src="img/Contents/Middleware.png" alt="Middleware" width=100%/>
</p>

*Middleware* is a layer that implements communication between instances of the system’s components and it may also manage the instances\. This way each instance is relieved of the need to track the other instances which it accesses\.

*<ins>Includes</ins>*: \(Message\) Broker and Deployment Manager\.

### [Shared Repository](<Shared Repository>)

<p align="center">
<img src="img/Contents/Shared Repository.png" alt="Shared Repository" width=100%/>
</p>

A *Shared Repository* stores the system’s data, maintains its integrity through transactions, and may support subscriptions to changes in subsets of the data\. That lets other system components concentrate on implementing the business logic\.

*<ins>Includes</ins>*: Shared Database, Blackboard, Data Grid of Space\-Based Architecture, Shared Memory, and Shared File System\.

### [Proxy](<Proxy>)

<p align="center">
<img src="img/Contents/Proxy.png" alt="Proxy" width=100%/>
</p>

A *Proxy* mediates between a system and its clients, transparently taking care of some generic functionality\.

*<ins>Includes</ins>*: Full Proxy and Half\-Proxy; Sidecar and Ambassador; Firewall, Response Cache, Load Balancer, Reverse Proxy and various Adapters, e\.g\. Anticorruption Layer, Open Host Service, XXX Abstraction Layers and Repository\.

### [Orchestrator](<Orchestrator>)

<p align="center">
<img src="img/Contents/Orchestrator.png" alt="Orchestrator" width=100%/>
</p>

An *Orchestrator* implements use cases as sequences of calls to the underlying components which are usually left unaware of each other’s existence\.

*<ins>Includes</ins>*: Workflow Owner, Application Layer, Facade, Mediator; API Composer, Scatter\-Gather, MapReduce, Process Manager, Saga Execution Component, and Integration \(Micro\-\)Service\.

### [Combined Component](<Combined Component>)

Several patterns combine the functionality of two or more extension layers\.

*<ins>Includes</ins>*: Message Bus, API Gateway, Event Mediator, Enterprise Service Bus, Service Mesh, Middleware of Space\-Based Architecture, and Shared Event Store\.

| \<\< [Part 2\. Basic Metapatterns](<Part 2. Basic Metapatterns>) | ^ [Home](<Home>) ^ | [Middleware](<Middleware>) \>\> |
| --- | --- | --- |


