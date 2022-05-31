---
title: Useful MySQL administration commands
date: 2022-03-21T16:00
tags: mysql
description: List of useful MySQL commands to monitor the usage of the database server.
---

# Useful MySQL administration commands to check its status

- [Useful MySQL administration commands to check its status](#useful-mysql-administration-commands-to-check-its-status)
  - [Check logged users by host](#check-logged-users-by-host)
  - [View InnoDB Status](#view-innodb-status)
  - [List database processes](#list-database-processes)

## Check logged users by host

```sql
SELECT SUBSTRING_INDEX(host, ':', 1) AS host_short,
       GROUP_CONCAT(DISTINCT user) AS users,
       COUNT(*) AS threads
FROM information_schema.processlist
GROUP BY host_short
ORDER BY COUNT(*), host_short;
```

**Example output**

```text
+------------+---------------------------------------------+---------+
| host_short | users                                       | threads |
+------------+---------------------------------------------+---------+
| localhost  | pm2,webapp,event_scheduler,app_watcher,root |       9 |
+------------+---------------------------------------------+---------+
1 row in set (0.06 sec)
```

## View InnoDB Status

```sql
SHOW ENGINE INNODB STATUS\G
```

**Example output**

```text
*************************** 1. row ***************************
  Type: InnoDB
  Name:
Status:
=====================================
2022-03-21 16:38:18 0x7f0b682f9700 INNODB MONITOR OUTPUT
=====================================
Per second averages calculated from the last 10 seconds
-----------------
BACKGROUND THREAD
-----------------
srv_master_thread loops: 9780 srv_active, 0 srv_shutdown, 16245803 srv_idle
srv_master_thread log flush and writes: 0
----------
SEMAPHORES
----------
OS WAIT ARRAY INFO: reservation count 2234
OS WAIT ARRAY INFO: signal count 2208
RW-shared spins 38, rounds 51, OS waits 17
RW-excl spins 205, rounds 6111, OS waits 206
RW-sx spins 16, rounds 480, OS waits 15
Spin rounds per wait: 1.34 RW-shared, 29.81 RW-excl, 30.00 RW-sx
------------
TRANSACTIONS
------------
Trx id counter 264370
Purge done for trx's n:o < 264370 undo n:o < 0 state: running but idle
History list length 0
LIST OF TRANSACTIONS FOR EACH SESSION:
---TRANSACTION 421161993050872, not started
0 lock struct(s), heap size 1136, 0 row lock(s)
---TRANSACTION 421161993049160, not started
0 lock struct(s), heap size 1136, 0 row lock(s)
---TRANSACTION 421161993050016, not started
0 lock struct(s), heap size 1136, 0 row lock(s)
---TRANSACTION 421161993047448, not started
0 lock struct(s), heap size 1136, 0 row lock(s)
---TRANSACTION 421161993046592, not started
0 lock struct(s), heap size 1136, 0 row lock(s)
---TRANSACTION 421161993045736, not started
0 lock struct(s), heap size 1136, 0 row lock(s)
--------
FILE I/O
--------
I/O thread 0 state: waiting for completed aio requests (insert buffer thread)
I/O thread 1 state: waiting for completed aio requests (log thread)
I/O thread 2 state: waiting for completed aio requests (read thread)
I/O thread 3 state: waiting for completed aio requests (read thread)
I/O thread 4 state: waiting for completed aio requests (read thread)
I/O thread 5 state: waiting for completed aio requests (read thread)
I/O thread 6 state: waiting for completed aio requests (write thread)
I/O thread 7 state: waiting for completed aio requests (write thread)
I/O thread 8 state: waiting for completed aio requests (write thread)
I/O thread 9 state: waiting for completed aio requests (write thread)
Pending normal aio reads: [0, 0, 0, 0] , aio writes: [0, 0, 0, 0] ,
 ibuf aio reads:, log i/o's:, sync i/o's:
Pending flushes (fsync) log: 0; buffer pool: 0
1782 OS file reads, 458586 OS file writes, 285939 OS fsyncs
0.00 reads/s, 0 avg bytes/read, 0.00 writes/s, 0.00 fsyncs/s
-------------------------------------
INSERT BUFFER AND ADAPTIVE HASH INDEX
-------------------------------------
Ibuf: size 1, free list len 0, seg size 2, 55 merges
merged operations:
 insert 83, delete mark 0, delete 0
discarded operations:
 insert 0, delete mark 0, delete 0
Hash table size 34679, node heap has 3 buffer(s)
Hash table size 34679, node heap has 13 buffer(s)
Hash table size 34679, node heap has 2 buffer(s)
Hash table size 34679, node heap has 11 buffer(s)
Hash table size 34679, node heap has 1 buffer(s)
Hash table size 34679, node heap has 2 buffer(s)
Hash table size 34679, node heap has 2 buffer(s)
Hash table size 34679, node heap has 8 buffer(s)
0.00 hash searches/s, 3.30 non-hash searches/s
---
LOG
---
Log sequence number          262226673
Log buffer assigned up to    262226673
Log buffer completed up to   262226673
Log written up to            262226673
Log flushed up to            262226673
Added dirty pages up to      262226673
Pages flushed up to          262226673
Last checkpoint at           262226673
121103 log i/o's done, 0.00 log i/o's/second
----------------------
BUFFER POOL AND MEMORY
----------------------
Total large memory allocated 136970240
Dictionary memory allocated 916298
Buffer pool size   8192
Free buffers       6098
Database pages     2052
Old database pages 737
Modified db pages  0
Pending reads      0
Pending writes: LRU 0, flush list 0, single page 0
Pages made young 6575, not young 664
0.00 youngs/s, 0.00 non-youngs/s
Pages read 1645, created 417, written 249744
0.00 reads/s, 0.00 creates/s, 0.00 writes/s
Buffer pool hit rate 1000 / 1000, young-making rate 0 / 1000 not 0 / 1000
Pages read ahead 0.00/s, evicted without access 0.00/s, Random read ahead 0.00/s
LRU len: 2052, unzip_LRU len: 0
I/O sum[0]:cur[0], unzip sum[0]:cur[0]
--------------
ROW OPERATIONS
--------------
0 queries inside InnoDB, 0 queries in queue
0 read views open inside InnoDB
Process ID=15983, Main thread ID=139686518802176 , state=sleeping
Number of rows inserted 5035, updated 8054, deleted 826, read 18255218
0.00 inserts/s, 0.00 updates/s, 0.00 deletes/s, 1.30 reads/s
Number of system rows inserted 174, updated 29042, deleted 171, read 180244734
0.00 inserts/s, 0.00 updates/s, 0.00 deletes/s, 0.00 reads/s
----------------------------
END OF INNODB MONITOR OUTPUT
============================

1 row in set (0.00 sec)
```

## List database processes

```sql
SHOW FULL PROCESSLIST;
```

**Example output**

```text
+---------+-----------------+-----------------+----------+---------+----------+------------------------+-----------------------+
| Id      | User            | Host            | db       | Command | Time     | State                  | Info                  |
+---------+-----------------+-----------------+----------+---------+----------+------------------------+-----------------------+
|       5 | event_scheduler | localhost       | NULL     | Daemon  | 16258704 | Waiting on empty queue | NULL                  |
| 1107167 | pm2             | localhost       | app      | Sleep   |        8 |                        | NULL                  |
| 1126635 | pm2             | localhost:59266 | app      | Sleep   |     1121 |                        | NULL                  |
| 1126791 | webapp          | localhost:59486 | app      | Sleep   |      572 |                        | NULL                  |
| 1126900 | root            | localhost       | NULL     | Query   |        0 | init                   | SHOW FULL PROCESSLIST |
| 1126917 | webapp          | localhost:59618 | app      | Sleep   |      549 |                        | NULL                  |
| 1126918 | webapp          | localhost:59620 | app      | Sleep   |      549 |                        | NULL                  |
| 1126919 | webapp          | localhost:59622 | app      | Sleep   |      549 |                        | NULL                  |
| 1126924 | webapp          | localhost:59628 | app      | Sleep   |      272 |                        | NULL                  |
+---------+-----------------+-----------------+----------+---------+----------+------------------------+-----------------------+
9 rows in set (0.00 sec)
```
