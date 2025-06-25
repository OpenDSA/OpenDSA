"""
This is supposed to hold folded and unfolded solution subgroups

Unfolded = dependency graph before substituting equations, 
so we know where to locate equations when finding equations to highlight

Folded = folded dependency graphs after substitution
for comparison later

DAG (dag_dep) = Directed acyclic graph obtained from folding g_dep
that will then be decomposed into sets of paths.

ID = showing which solution subgroup we are trying to fold,
will be useful in identifying which solutions we are trying to provide feedback on

"""

from dag_analysis.dag import DependencyDAG

import sympy
from networkx import Graph, DiGraph, get_edge_attributes
from typing import Union

class SolutionSubgroup:
    def __init__(self, id_subgroup : str, g_dep_subgroup : Graph) -> None:
        self.id : str = id_subgroup
        self.g_dep_unfolded : Union[Graph, None] = g_dep_subgroup
        self.g_dep_folded : Union[Graph, None] = None # intialized here for readability
        self.dag_dep : Union[Graph, None] = None 
        self.equation_threads: Union[dict, None]= None

        # folding transformations begin here
        self.g_dep_folded, self.dag_dep = self.get_folded_dep_graph()
        
        # list of equations created from the solution_subgraph
        pass
        
        # mapping of unknowns to equations inside this solution_subgraph
        self.map_equation_variable_folded = self.get_eq_var_assignments() # { Eq(x,...).id : x }
        self.map_variable_equation_folded = self.get_var_eq_assignments() # { x : Eq(x,...).id }

        # possible lines for annotations/internal bookkeeping
        self.is_consistent = False  
        """
        # this is assuming that this subgroup is 
        # n-n system of equations. n can be more
        # than the number of unknowns connected to
        # answers/solutions. Valid values are:
        #   True: if n-n (n>=1) and system is consistent
        #   False: otherwise.
        # Use in conjunction with length of self.map* 
        # to see if system is truly n-n or not, and
        # what the value of n is if True.
        """
        
        self.n_system : int = -1
        """
        # default value of system; this is only true
        # if nothing was actually submitted,
        # otherwise never true.
        # -1 : inconsistent system (error),
        #  0 : no equations in workspace (error),
        # >0 : consistent system
        """

        # logic: is the number of unknowns same as number of equations
        # since in each map, the key is a single string
        # (equations and variables respectively)
        self.is_consistent = \
            len(self.map_equation_variable_folded) \
                == len(self.map_variable_equation_folded)
        
        if self.is_consistent:
            self.n_system = len(self.map_equation_variable_folded)

        # then, start DAG algorithms to partition into and prepare sequences.
        # TODO add functions for DAG splitting
        # Keep original DAG accessible, create copies of the paths
        # with references if required.
        # TODO: NOTE points of convergence and divergence

        self.equation_threads = self.get_dag_threads(self.dag_dep)
        
        # finally, end and make changes to solution.py

        pass
    
    # CHECKS STATUS OF EQUATIONS AND UNKNOWNS
    def is_node_connected_in_graph(self, g_dep: Union[Graph, None], node_term) -> bool:
        assert g_dep is not None # this only for type checker, please ignore

        return g_dep.degree[node_term] > 0 # type: ignore

    def is_unknown_in_unfolded_graph(self, node_term) -> bool:
        assert self.g_dep_unfolded is not None # this only for type checker, please ignore

        return self.g_dep_unfolded.nodes[node_term]['group'] == 'unknown' \
        and self.is_node_connected_in_graph(self.g_dep_unfolded, node_term)
    
    def is_unknown_in_folded_graph(self, node_term) -> bool:
        assert self.g_dep_folded is not None # this only for type checker, please ignore

        return self.g_dep_folded.nodes[node_term]['group'] == 'unknown'  \
        and self.is_node_connected_in_graph(self.g_dep_folded, node_term)
    
    def is_equation_in_unfolded_graph(self, node_term) -> bool:
        assert self.g_dep_unfolded is not None # this only for type checker, please ignore

        return self.g_dep_unfolded.nodes[node_term]['group'] == 'equation' \
        and self.is_node_connected_in_graph(self.g_dep_unfolded, node_term)
    
    def is_equation_in_folded_graph(self, node_term) -> bool:
        assert self.g_dep_folded is not None # this only for type checker, please ignore

        return self.g_dep_folded.nodes[node_term]['group'] == 'equation' \
        and self.is_node_connected_in_graph(self.g_dep_folded, node_term)
    
    # RETURN LIST OF EQUATIONS/UNKNOWNS
    def get_unknowns_unfolded(self) -> list:
        """This returns all the unknowns in this subgroup in the unfolded graph

        Returns:
            list: of names of unknowns in this solution subgroup in the unfolded graph
        """
        assert self.g_dep_unfolded is not None # this only for type checker, please ignore
        
        return [n for n in self.g_dep_unfolded if self.is_unknown_in_unfolded_graph(n)]
    
    def get_unknowns_folded(self) -> list:
        """This returns all the unknowns in this subgroup in the folded graph

        Returns:
            list: of names of unknowns in this solution subgroup in the folded graph
        """
        assert self.g_dep_folded is not None # this only for type checker, please ignore

        return [n for n in self.g_dep_folded if self.is_unknown_in_folded_graph(n)]
    
    def get_equations_unfolded(self) -> list:
        """This returns all the equations in this subgroup in the unfolded graph

        Returns:
            list: of names of equations in this solution subgroup in the unfolded graph
        """
        assert self.g_dep_unfolded is not None # this only for type checker, please ignore

        return [n for n in self.g_dep_unfolded if self.is_equation_in_unfolded_graph(n)]
    
    def get_equations_folded(self) -> list:
        """This returns all the equations in this subgroup in the folded graph

        Returns:
            list: of names of equations in this solution subgroup in the folded graph
        """
        assert self.g_dep_folded is not None # this only for type checker, please ignore
        
        return [n for n in self.g_dep_folded if self.is_equation_in_folded_graph(n)]
    
    # POSSIBLY REDUNDANT
    # def get_unknowns_from_equation_in_folded(self, equation_node_term) -> list:
    #     """This returns a list of unknowns that appear in a given equation term
    #     in the folded graph. If the term is not an equation or it is not
    #     connected for some reason, None is returned as error (which would never 
    #     happen in a regular case since the connected graph is always bipartite).

    #     Returns:
    #         list: of nodes terms corresponding to unknowns in a solution subgroup.
    #     """

    #     if not equation_node_term in self.g_dep_folded \
    #         or not self.is_equation_in_folded_graph(equation_node_term):
    #         return None

    #     return [
    #         node
    #         for node in self.g_dep_folded[equation_node_term]
    #         # if self.is_unknown_in_folded_graph
    #     ]

    # FETCHING ACTUAL EQUATION OBJECTS

    def __get_equation_object(self, g_dep, eq):
        """
        Takes a g_dep object and returns the equation template object as
        it appears in that dependency graph
        """
        assert g_dep is not None

        return g_dep.nodes[eq]['template']

    def get_equation_object_folded(self, equation_node_term_id):
        """
        Returns the object from the folded graph if the term is an equation
        in the folded graph.
        """

        if self.is_equation_in_folded_graph(equation_node_term_id):
            return self.__get_equation_object(self.g_dep_folded, equation_node_term_id)
        else:
            return None

    def get_equation_object_unfolded(self, equation_node_term_id):
        """
        Returns the object from the unfolded graph if the term is an equation
        in the unfolded graph.
        """

        if self.is_equation_in_unfolded_graph(equation_node_term_id):
            return self.__get_equation_object(self.g_dep_unfolded, equation_node_term_id)
        else:
            return None

    def copy_dep_graph(self):
        """Creates a copy of the local dependency graph.
        Mainly used to preserve the original graph
        prior to folding
        """
        #CURRENTLY UNUSED, MAY BE NEEDED FOR DEEPCOPY?
    
    def get_folded_dep_graph(self, debug=False):
        """As of Fall 2025, this returns a tuple of
        (g_dep_folded, dag_dep) for further analysis.
        """

        # reference to the unfolded solution_subgraph
        assert self.g_dep_unfolded is not None # this only for type checker, please ignore
        
        g_solution : Union[Graph, None] = self.g_dep_unfolded.copy()
        assert g_solution is not None # this only for type checker, please ignore
        
        # The DAG object is created here.
        g_dag_dep : Union[DependencyDAG, None] = DependencyDAG(self.id)
        g_dag_dep.add_nodes_from(self.get_equations_unfolded())
        for eq in g_dag_dep:
            g_dag_dep.nodes[eq]['template'] = self.get_equation_object_unfolded(eq)
            g_dag_dep.nodes[eq]['latex'] = self.g_dep_unfolded.nodes[eq]['latex']
        
        # Repeat until the graph does not change
        flag = True
        while flag:
            # Find equations that can be substituted in g_solution, apply folding and record it
            
            # 1. Find equations connecting to only one unknown, which can be simplified
            # find foldable edges
            for n in g_solution:
                if g_solution.nodes[n]['group'] == 'equation' and g_solution.degree[n] == 1: # type:ignore
                    # get the details of the one var connected to n
                    var = [_ for _ in g_solution[n]][0]
                    if g_solution.degree[var] >= 2 and not 'solution_id' in g_solution.nodes[var]: # type:ignore
                        g_solution[n][var]['fold'] = True
                        g_solution[n][var]['equation'] = str(n)
                        g_solution[n][var]['unknown'] = str(var)

            # fold the edges/i.e. substitute where possible
            edges_to_fold = list([
                (g_solution[u][v]['equation'],g_solution[u][v]['unknown'])
                for u,v in get_edge_attributes(g_solution,"fold")
            ])
            if debug:
                print(len(edges_to_fold))
            if len(edges_to_fold):
                for eq, var in edges_to_fold:
                    #eq, var = key
                    if debug:
                        print(eq,var,self.__get_equation_object(g_solution, eq))
                        print(sympy.solve(self.__get_equation_object(g_solution, eq), var))

                    subs_eq = sympy.solve(self.__get_equation_object(g_solution, eq), var, evaluate=False)

                    # Remove the edge between equation and var, since that unknown does not
                    # exist in that equation anymore.
                    g_solution.remove_edge(eq,var) # this is possible because a shallow copy is created.

                    # Find where target equation with var in it appears, and substitute var
                    # with the new expression in those equations, and remove edges to that equation
                    var_target_equations = list(g_solution[var].keys())
                    for eq_target in var_target_equations:
                        #substitute the lhs and rhs
                        lhs = self.__get_equation_object(g_solution, eq_target).lhs.subs(var, subs_eq[0])
                        rhs = self.__get_equation_object(g_solution, eq_target).rhs.subs(var, subs_eq[0])

                        #then, rewrite the equation in terms of the new lhs and rhs
                        g_solution.nodes[eq_target]['template'] = sympy.Eq(lhs, rhs)
                        g_solution.nodes[eq_target]['folded'].append(eq)
                        
                        # For possible canonicalization issues, reset these to subject variable
                        # when possible, afterwards
                        
                        if debug:
                            print(f"Does the source {eq} exist in the DAG for this?: {eq in g_dag_dep}")
                            print(f"Does the target {eq_target } exist in the DAG for this?: {eq_target in g_dag_dep}")
                        
                        # removes the folded edge from the dep graph, variable has been substituted in target
                        g_solution.remove_edge(eq_target,var)

                        # adds the edge between the source (eq) and target (eq_target) in DAG,
                        # marking the variable used for the substitution
                        g_dag_dep.add_edge(eq, eq_target, variable=var)

                        # information is also duplicated in the nodes
                        g_dag_dep.nodes[eq]['outgoing'] = var
                        g_dag_dep.nodes[eq_target]['incoming'] = var
            else:
                flag = False # and the loop terminates
    
        return (g_solution, g_dag_dep)
    
    def get_eq_var_assignments(self, debug=False):
        """Gets a mapping between unknowns in a system and the equations they appear in.
        Derives this from the folded dependency graph, currently self.g_dep_folded.
        This is more relevant for simultaneous systems, not so much 1-1 systems

        Args:
            folded_n_graph (_type_): _description_

        Returns:
            _type_: _description_
        """
        
        assert self.g_dep_folded is not None # this only for type checker, please ignore

        eq_var_map = dict()
        for u,v in self.g_dep_folded.edges:
            eq_node, var_node = (u,v) if self.is_equation_in_folded_graph(u) else (v,u)
            eq_var_map.setdefault(eq_node, {var_node}).add(var_node)

            if debug:
                print("\nPrinting from inside get_eq_var_assignments for debugging\n---")
                # create the expression tree in here, since you can already see what the equation is.
                print(self.g_dep_folded.nodes[eq_node]['template'].lhs - self.g_dep_folded.nodes[eq_node]['template'].rhs)
            
        return eq_var_map

    def get_var_eq_assignments(self, debug=False):
        """Gets a mapping between equations in a system and the unknowns appearing in them.
        Derives this from the folded dependency graph, currently self.g_dep_folded.
        This is more relevant for simultaneous systems, not so much 1-1 systems

        Args:
            folded_n_graph (_type_): _description_

        Returns:
            _type_: _description_
        """
        
        assert self.g_dep_folded is not None # this only for type checker, please ignore

        var_eq_map = dict()
        for u,v in self.g_dep_folded.edges:
            eq_node, var_node = (u,v) if self.is_equation_in_folded_graph(u) else (v,u)
            var_eq_map.setdefault(var_node, {eq_node}).add(eq_node)

            if debug:
                print("\nPrinting from inside get_var_eq_assignments for debugging\n---")
                # create the expression tree in here, since you can already see what the equation is.
                print(self.g_dep_folded.nodes[eq_node]['template'].lhs - self.g_dep_folded.nodes[eq_node]['template'].rhs)
            
        return var_eq_map
    
    def get_dag_threads(self, dag_dep : DependencyDAG, debug=False):
        """
        Calls the DAG splitter to generate threads, accessible from solution_subgroup
        """

        dag_dep.dag_splitting()
        if debug:
            print(dag_dep.thread_collection)
        return dag_dep.thread_collection
    
    def get_dag_outgoing_var(self, dag_equation_id, debug=False):
        if dag_equation_id in self.dag_dep and 'outgoing' in self.dag_dep.nodes[dag_equation_id]: # type: ignore
            return self.dag_dep.nodes[dag_equation_id]['outgoing'] # type: ignore
        else:
            return None
    
    def get_dag_incoming_var(self, dag_equation_id, debug=False):
        if dag_equation_id in self.dag_dep and 'incoming' in self.dag_dep.nodes[dag_equation_id]: # type: ignore
            return self.dag_dep.nodes[dag_equation_id]['incoming'] # type: ignore
        else:
            return None
    
    def get_next_thread_equation(self, dag_equation_id, debug=False):
        if dag_equation_id in self.dag_dep and 'thread-next' in self.dag_dep.nodes[dag_equation_id]: # type: ignore
            return self.dag_dep.nodes[dag_equation_id]['thread-next'] # type: ignore
        else:
            return None
    