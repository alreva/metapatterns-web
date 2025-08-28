Basic metapatterns are both common stand\-alone architectures and building blocks for more complex systems\. They include the single\-component *Monolithic* architecture and the results of its division along each of the [coordinate axes](<Metapatterns#the-system-of-coordinates>), namely *abstractness*, *subdomain*, and *sharding*:

### [Monolith](<Monolith>)

<p align="center">
<img src="img/Contents/Monolith.png" alt="Monolith" width=100%/>
</p>

*Monolith* is a single\-component system, the simplest possible architecture\. It is easy to write but hard to evolve and maintain\.

*<ins>Includes</ins>*: Reactor, Proactor, and Half\-Sync/Half\-Async\.

### [Shards](<Shards>)

<p align="center">
<img src="img/Contents/Shards.png" alt="Shards" width=100%/>
</p>

*Shards* are multiple instances of a *Monolith*\. They are scalable but usually require an external component for coordination\.

*<ins>Includes</ins>*: Shards and Amazon Cells, Replicas, Pool of Stateless Instances, and Create on Demand\.

### [Layers](<Layers>)

<p align="center">
<img src="img/Contents/Layers.png" alt="Layers" width=100%/>
</p>

*Layers* contain one component per level of abstraction\. The layers may vary in technologies and forces and scale individually\.

*<ins>Includes</ins>*: Layers and Tiers\.

### [Services](<Services>)

<p align="center">
<img src="img/Contents/Services.png" alt="Services" width=93%/>
</p>

*Services* divide a system into subdomains, often resulting in parts of comparable size assignable to dedicated teams\. However, a system of *Services* is hard to synchronize or debug\.

*<ins>Includes</ins>*: Service\-Based Architecture, Modular Monolith \(Modulith\), Microservices, Device Drivers, and Actors\.

### [Pipeline](<Pipeline>)

<p align="center">
<img src="img/Contents/Pipeline.png" alt="Pipeline" width=100%/>
</p>

A *Pipeline* is a kind of *Services* with unidirectional flow\. Each service implements a single step of data processing\. The system is flexible but may grow out of control\. 

*<ins>Includes</ins>*: Pipes and Filters, Choreographed Event\-Driven Architecture, and Data Mesh\.

| \<\< [Part 1\. Foundations](<Part 1. Foundations>) | ^ [Home](<Home>) ^ | [Monolith](<Monolith>) \>\> |
| --- | --- | --- |


