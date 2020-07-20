---
layout: post
---

## SQLSERVER CAST and CONVERT (Transact-SQL)
+ [RAW](https://docs.microsoft.com/en-us/sql/t-sql/functions/cast-and-convert-transact-sql?view=sql-server-2017)

#### Syntax
```SQL
-- CAST Syntax:  
CAST ( expression AS data_type [ ( length ) ] )  
  
-- CONVERT Syntax:  
CONVERT ( data_type [ ( length ) ] , expression [ , style ] ) 
```

#### Arguments
expression
Any valid expression.

data_type
The target data type. This includes xml, bigint, and sql_variant. Alias data types cannot be used.

length
An optional integer that specifies the length of the target data type. The default value is 30.

style
An integer expression that specifies how the CONVERT function will translate expression. For a style value of NULL, NULL is returned. data_type determines the range.

#### Return types
Returns expression, translated to data_type.


#### Date and Time Styles
For a date or time data type expression, style can have one of the values shown in the following table. Other values are processed as 0. Beginning with SQL Server 2012 (11.x), the only styles supported, when converting from date and time types to datetimeoffset, are 0 or 1. All other conversion styles return error 9809.

+ 1 = mm/dd/yy
+ 101 = mm/dd/yyyy
+ 2 = yy.mm.dd
+ 102 = yyyy.mm.dd
+ 3 = dd/mm/yy
+ 103 = dd/mm/yyyy
+ 4 = dd.mm.yy
+ 104 = dd.mm.yyyy
+ 5 = dd-mm-yy
+ 105 = dd-mm-yyyy
+ 6 = dd mon yy
+ 106 = dd mon yyyy
+ 7 = Mon dd, yy
+ 107 = Mon dd, yyyy
+ 8 = hh:mi:ss
+ 108 = hh:mi:ss
+ 9 = mon dd yyyy hh:mi:ss:mmmAM (or PM)
+ 109 = mon dd yyyy hh:mi:ss:mmmAM (or PM)
+ 10 = mm-dd-yy
+ 110 = mm-dd-yyyy
+ 11 = yy/mm/dd
+ 111 = yyyy/mm/dd
+ 12 = yymmdd
+ 112 = yyyymmdd
+ 13 = dd mon yyyy hh:mi:ss:mmm(24h)
+ 113 = dd mon yyyy hh:mi:ss:mmm(24h)
+ 14 = hh:mi:ss:mmm(24h)
+ 114 = hh:mi:ss:mmm(24h)
+ 20 = yyyy-mm-dd hh:mi:ss(24h)
+ 120 = yyyy-mm-dd hh:mi:ss(24h)
+ 21 = yyyy-mm-dd hh:mi:ss.mmm(24h)
+ 121 = yyyy-mm-dd hh:mi:ss.mmm(24h)
+ 126 = yyyy-mm-ddThh:mi:ss.mmm (no spaces)
+ 127 = yyyy-mm-ddThh:mi:ss.mmmZ (no spaces)
+ 130 = dd mon yyyy hh:mi:ss:mmmAM
+ 131 = dd/mm/yyyy hh:mi:ss:mmmAM
