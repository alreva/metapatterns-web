This part is dedicated to analyzing the architectural metapatterns, for if this book’s taxonomy of patterns is a step forward from the state of the art, it should bear fruits for us to pick\.

I had no time to research every idea collected while the book was being written and its individual chapters published for feedback\. A few of those pending topics, which may make additional chapters in the future, are listed below:

- Some architectural patterns \(*CQRS*, *Cache*, *Microservices*, etc\.\) appear under multiple metapatterns\. Each individual case makes a story of its own, teaching about both the needs of software systems and uses of metapatterns\.
- There are different ways to split a component into subcomponents: [*Layers of Services*](<Service-Oriented Architecture (SOA)>) differ from [*Layered Services*](<Layered Services>)\. This should be investigated\.
- An architectural quality may depend on the structure of the system\. For example, a client request may be split into three subrequests to be processed sequentially or in parallel, depending on the topology \(e\.g\. [*Pipeline*](<Pipeline>), [*Orchestrated Services*](<Orchestrator#api-composer-remote-facade-gateway-aggregation-composed-message-processor-scatter-gather-mapreduce>) or [*Replicas*](<Shards#persistent-copy-replica>)\), thus it is topology which defines latency\. We can even draw formulas like:
  - L = L1 \+ L2 \+ L3 for *Pipeline*, 
  - L = MAX\(L1, L2, L3\) for *Orchestrated Services* which run in parallel,
  - L = MIN\(L1, L2, L3\) for *Replicas* with [*Request Hedging*](https://grpc.io/docs/guides/request-hedging/)\.


Other smaller topics that I was able to look into made the following chapters:

| \<\< [Part 5\. Implementation Metapatterns](<Part 5. Implementation Metapatterns>) | ^ [Home](<Home>) ^ | [Comparison of architectural patterns](<Comparison of architectural patterns>) \>\> |
| --- | --- | --- |


