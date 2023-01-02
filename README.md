# Pickle Scheme Grammar

`program`     => `expression`*

`expression`  => `if` | `call` | `define` | `!set` | `atom`

`call`        => `LEFT_PAREN` `expression` `expression`* `RIGHT_PAREN`

`lambda`      => `LEFT_PAREN` "lambda" `LEFT_PAREN` `symbol`* `RIGHT_PAREN` `expression`* `RIGHT_PAREN`

`define`      => `LEFT_PAREN` "define" `symbol` `expression` `RIGHT_PAREN`

`if`          => `LEFT_PAREN` "if" `expression` `expression` `expression`? `RIGHT_PAREN`

`set!`        => `LEFT_PAREN` "set" `symbol` `expression` `RIGHT_PAREN`

`let`         => `LEFT_PAREN` "let" `LEFT_PAREN` `let-binding`* `RIGHT_PAREN` `expression`* `RIGHT_PAREN`

`let-binding` => `LEFT_PAREN` `symbol` `expression` `RIGHT_PAREN`

`atom`        => `symbol` | `number` | `boolean` | `string`

`symbol`      => <`LETTER` | `SPECIAL_CHARACTER`> <`LETTER` | `SPECIAL_CHARACTER` | `DIGIT_0_TO_9`>*

`number`      => `DIGIT_1_TO_9`+ <`DOT DIGIT_0_TO_9`+>?

`boolean`     => `TRUE` | `FALSE`

`string`     => Javascript String

`LETTER`     => [a-z] | [A-Z]

`SPECIAL_CHARACTER` => ! | $ | % | & | * | / | : | < | = | > | ? | @ | ^ | _ | ~ | + | - | DOT

`DIGIT_1_TO_9` => [1-9]

`DIGIT_0_TO_9` => [0-9]

`DOT` => .

`TRUE` => #t

`FALSE` => #f

`LEFT_PAREN` => (

`RIGHT_PAREN` => )

### Grammar Extensions
#### * => zero or more
#### + => one or more
#### ? => optional

#### Based on https://github.com/chidiwilliams/jscheme