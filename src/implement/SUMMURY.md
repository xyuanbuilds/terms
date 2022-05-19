regexp
    split(/|/): split 中使用正则 `|`，可以对多类型字符间隔进行匹配并分割；
        注: 分割后存在空字符，需要 filter 过滤；
    replace: replace 中使用正则 `()`，可以选中指定内容，且可多选