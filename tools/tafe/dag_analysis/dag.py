from networkx import DiGraph, connected_components, neighbors
from networkx.drawing.nx_pydot import to_pydot
from collections import defaultdict

from typing import Union

from expr_tree_analysis.tree_utils import *

class DependencyDAG(DiGraph):
    def __init__(self, dag_id: str):
        # step 1. store the necessary parameters
        self.id : str = dag_id

        # this is populated later by the DAG splitter
        self.convergence_points = {}
        self.divergence_points = {}
        self.thread_collection = {}
        self.threads_by_start = {}
        self.threads_by_end = {}
        pass # nothing yet

        #step 2. initialize the class variables
        super().__init__()
        
        # step 3. other things
        return

    # DISPLAY/DEBUG functions

    def __repr__(self) -> str:
        return str(self)
    
    def __str__(self) -> str:
        return str(self)

    def is_convergence_points(self) -> list:
        """
        TODO: Should this just return member or calculate it?
        """
        return []
    
    def get_single_child(self, node, debug=False):
        if debug:
            print(self.succ[node])
        return list(self.succ[node].keys())[0]

    def dag_splitting(self, debug=False):
        """
        This algorithm splits a DAG into threads, while noting
        points of convergence and divergence. Threads start/end
        at points of convergence/divergence, and are recorded as such.
        
        (DEPRECATED) Substituted versions of equations at points of convergence/divergence
        replace the equations in question.
        (DEPRECATED) TODO: Replace this with just calculated values instead? This would
        be available in the report context easily.
        Just use the values and substitute as and when needed, you can't really predict this.
        """

        # replace dummy code
        self.thread_collection = {}
        self.threads_by_start = {}
        self.threads_by_end = {}

        if debug:
            print(f"Inside dag splitter for {self.id}")
            print(to_pydot(self))
        
        if debug:
            for n in self:
                print(f"{n}, parent {self.pred[n]}")

        # find the starter nodes and set those
        for node in [_ for _ in self if self.in_degree[_] == 0]:
            self.nodes[node]['thread-prev'] = None

        # find the ending nodes and set those
        for node in [_ for _ in self if self.out_degree[_] == 0]:
            self.nodes[node]['thread-next'] = None
            
        # for all parents of convergent nodes, set thread-next to null, marking end of thread
        # for the node itself, set thread-prev to null, marking start of a new thread.
        # connections are still preserved, but they are logically separated
        # as being part of different threads.
        for node in [_ for _ in self if self.in_degree[_] > 1]:
            self.convergence_points[node] = None
            self.nodes[node]['thread-prev'] = None
            for parent in self.predecessors(node):
                self.nodes[parent]['thread-next'] = None

        # for all children of divergent nodes, set thread-prev to null, marking start of a new thread.
        # connections are still preserved, but they are logically separated
        # as being part of different threads.
        for node in [_ for _ in self if self.out_degree[_] > 1]:
            self.divergence_points[node] = None
            self.nodes[node]['thread-next'] = None
            for child in self.successors(node):
                self.nodes[child]['thread-prev'] = None
            
        # once you have start and end of threads determined, find the threads
        # by traversing them, and then save them to the collection
        if debug:
            print([_ for _ in self if 'thread-prev' in self.nodes[_] and self.nodes[_]['thread-prev'] == None])
        for node in [_ for _ in self if 'thread-prev' in self.nodes[_] and self.nodes[_]['thread-prev'] == None]:
            pointer_node = node
            thread_path = [node]
            while 'thread-next' not in self.nodes[pointer_node]: # because we have only set this up for nodes at end of threads
                self.nodes[pointer_node]['thread-next'] = self.get_single_child(pointer_node)
                self.nodes[
                    self.nodes[pointer_node]['thread-next']
                ]['thread-prev'] = pointer_node
                pointer_node = self.nodes[pointer_node]['thread-next']
                thread_path.append(pointer_node)
            
            self.thread_collection[(node, pointer_node)] = thread_path #None # may be replaced by dedicated Thread object

        if debug:
            print("==end of splitter==")
        return
    