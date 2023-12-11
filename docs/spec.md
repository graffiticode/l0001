# L0001 Language Specification

*[11 December 2023 Draft]*

**Introduction**

*Graffiticode* is a collection of domain languages used for creating task
specific web apis. ** *L0001* ** is a *Graffiticode* language for writing
web apis that respond with simple values such as the string "hello, world!".

*L0001* can be used as a template for deriving other, presumably more
interesting and useful, languages.

### Overview


```
hello "world"..

```
renders

| **hello, world!**

in the browser view.

### Vocabulary


| Function  | Arity | Example  | Description |
| --------- | :---: | -------- | ----------- |
| **hello** | 1     | `hello "world"` | renders **hello, world!** in the form |
| **val**   | 2     | `val ob "x"` | returns the value of `x` in `ob` |
| **concat**| 1     | `concat [x,y]` | returns the string value that is the concatentation of the values of x and y |
| **add**   | 2     | `add x y` | returns the sum of values of `x` and `y` |
| **map**   | 2     | `map fn [1,2,3]` | returns a list containing the result of applying `fn` to each element in the list `[1,2,3]` |
| **data**  | 1     | `data ob` | returns the value of data passed to the current task, or otherwise the value of `ob` |

