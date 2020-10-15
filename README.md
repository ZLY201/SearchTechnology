# SearchTechnology
This is a program in order to find a shortest path from node S to node T in a given graph. You can run this program in <a target="_blank" href="https://zly201.github.io/SearchTechnology/">here</a>.

In this program, we use the following four method to solve your problem:

1. Breadth First Search
2. Depth First Search
3. Greedy Algorithm
4. A* Algorithm

If you want to use this program, you must input your graph, A and B with following format to the **Input Area**.    
And when you want to run the A* Algorithm program, you should give me the **h(x)**(estimated value) for the all n nodes.

First line contains two integer n and m which represent the node num and the edge num of your graph.

The next m lines each line contains three integer u, v and w represent there is a undirected edge from u to v and the weight is w.

The next Line contains two integer S and T.

To use A* Algorithm, please input one extra line contains n integers. The i-th integer represents h(i) for the node i.

Each two adjacent integers are separated by a space.

The result will be showed in **Result**.

**Hint: u, v, S, T are all in range[1, n] and w mustn't be smallar than 0.**

Of course, we prepare a <a target="_blank" href="https://zly201.github.io/SearchTechnology/sample.html">sample input<a> for you. Actually, this data is a classical problem called **Romanian Holiday Problem**.
