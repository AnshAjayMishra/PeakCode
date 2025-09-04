import type { NextApiRequest, NextApiResponse } from 'next';
import {
  ArrayAndStrings,
  TwoPointers,
  SlidingWindow,
  LinkedLists,
  Hashmap,
  BinarySearch,
  Backtracking,
  BinarySearchTree,
  BinaryTreeBFS,
  BinaryTreeGeneral,
  BitManipulation,
  GraphBFS,
  GraphGeneral,
  Interval,
  Stack,
  Matrix,
  Math,
  DivideAndConquer,
  Trie,
  Heap,
  OneDDP,
  MultidimensionalDP,
  KadanesAlgorithm
  
} from '@/data/leetcodeQuestions';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({
    Array: ArrayAndStrings,
    "Two Pointers": TwoPointers,
    "Sliding Window": SlidingWindow,
    "Linked List": LinkedLists,
    "Hash Map": Hashmap,
    "Binary Search": BinarySearch,
    "Backtracking": Backtracking,
    "Binary Search Tree": BinarySearchTree,
    "Binary Tree BFS": BinaryTreeBFS,
    "Binary Tree General": BinaryTreeGeneral,
    "Bit Manipulation": BitManipulation,
    "Graph BFS": GraphBFS,
    "Graph General": GraphGeneral,
    "Interval": Interval,
    "Stack": Stack,
    "Matrix": Matrix,
    "Math": Math,
    "Divide And Conquer": DivideAndConquer,
    "Trie": Trie,
    "Heap": Heap,
    "One D DP": OneDDP,
    "Multidimensional DP": MultidimensionalDP,
    "KadanesAlgorithm" : KadanesAlgorithm
   

  });
}
