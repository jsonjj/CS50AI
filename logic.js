class Sentence {

    evaluate(model){
        // """Evaluates the logical sentence."""
        throw("nothing to evaluate")
    }
    formula(){
        // """Returns string formula representing logical sentence."""
        return ""
    }
    symbols(){
        // """Returns a set of all symbols in the logical sentence."""
        return []
    }
    static validate(sentence){
        if (!(sentence instanceof Sentence)) {
            throw("must be a logical sentence")
        }
    }

    static balanced(s){
        // """Checks if a string has balanced parentheses."""
        var count = 0
        for (var idx in s) {
            var c = s[idx]
            if (c == "(") {
                count += 1
                console.log(`${c}: +1`)
            } else if (c == ")") {
                if (count <= 0) {
                    break;
                }
                console.log(`${c}: -1`)
                count -= 1
            }
        }
        console.log(`count: ${count}`)
        return count == 0
      }

      static isAlpha(ch){
        return /^[\(\)A-Z]$/i.test(ch);
      }

    static parenthesize(s){
        // """Parenthesizes an expression if not already parenthesized."""

        if (!((s.length > 0) || (isAlpha(s)) || (
            (s[0] == "(") && (s.slice(-1) == ")") && (balanced(s.slice(1, -1)))
        ))) {
            return s
        } else {
            return `(${s})`
        }
    }
}

class Symbol extends Sentence {

    constructor(name) {
        super()
        this.name = name
    }

    __eq__(other) {
        return ((other instanceof Symbol) && (this.name == other.name))
    }

     __hash__() {
        return hash(("symbol", this.name))
    }

    __repr__() {
        return this.name
    }

    evaluate(model) {
        try {
            return !!model[this.name]
        } catch(err) {
            throw(`variable ${this.name} not in model ${err}`)
        }
    }


    formula() {
        return this.name
    }

    symbols() {
        return [this.name]
    }
}
