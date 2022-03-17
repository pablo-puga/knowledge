---
title: Understanding how Bubble Sort algorithm works
date: 2022-03-17T11:00
---
# Understanding how Bubble Sort algorithm works

Bubble Sort is the simplest sorting algorithm that we can implement.
It works by swapping the adjacent elements if they are in wrong order during different runs.

### Complexity

Worst case of O(n²)

Best case O(n)

### Example

**First Pass:**

( **5** **1** 4 2 8 )  -> ( **1** **5** 4 2 8 ), Compares the first two elements, and swaps since 5 > 1.

( 1 **5** **4** 2 8 )  -> ( 1 **4** **5** 2 8 ), Swap since 5 > 4.

( 1 4 **5** **2** 8 )  -> ( 1 4 **2** **5** 8 ), Swap since 5 > 2.

( 1 4 2 **5** **8** )  -> ( 1 4 2 **5** **8** ), Since the elements are already in order (8 > 5), algorithm does not swap them.

**Second Pass:**

( **1** **4** 2 5 8 )  -> ( **1** **4** 2 5 8 )

( 1 **4** **2** 5 8 )  -> ( 1 **2** **4** 5 8 ), Swap since 4 > 2

( 1 2 **4** **5** 8 )  -> ( 1 2 **4** **5** 8 )

( 1 2 4 **5** **8** )  -> ( 1 2 4 **5** **8** ) 

Now, the array is already sorted, but our algorithm does not know if it is completed. The algorithm needs one **whole** pass without **any** swap to know it is sorted.

**Third Pass:**

( **1** **2** 4 5 8 )  -> ( **1** **2** 4 5 8 )

( 1 **2** **4** 5 8 )  -> ( 1 **2** **4** 5 8 )

( 1 2 **4** **5** 8 )  -> ( 1 2 **4** **5** 8 )

( 1 2 4 **5** **8** )  -> ( 1 2 4 **5** **8** )