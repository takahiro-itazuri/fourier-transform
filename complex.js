Complex = {};
Complex.init = function(re, im) {
    if (re == undefined || im == undefined) { return {'Re':0, 'Im':0}; }
    else { return {'Re':re, 'Im':im}; }
}

Complex.sca = function(scalar, val) {
    return {'Re':scalar * val.Re, 'Im':scalar * val.Im};
}

Complex.exp = function(val) {
    var re = Math.exp(val.Re) * Math.cos(val.Im);
    var im = Math.exp(val.Re) * Math.sin(val.Im);
    return {'Re':re, 'Im':im};
}

Complex.add = function(a_val, b_val) {
    var re = a_val.Re + b_val.Re;
    var im = a_val.Im + b_val.Im;
    return {'Re':re, 'Im':im};
}

Complex.sub = function(a_val, b_val) {
    var re = a_val.Re - b_val.Re;
    var im = a_val.Im - b_val.Re;
    return {'Re':re, 'Im':im};
}

Complex.mul = function(a_val, b_val) {
    var re = a_val.Re * b_val.Re - a_val.Im * b_val.Im;
    var im = a_val.Re * b_val.Im + a_val.Im * b_val.Re;
    return {'Re':re, 'Im':im};
}

Complex.div = function(a_val, b_val) {
    var abs = Math.sqrt(Math.pow(b_val.Re, 2) + Math.pow(b_val.Im, 2));
    var re = (a_val.Re * b_val.Re + a_val.Im * b_val.Im) / abs;
    var im = ((-1) * a_val.Re * b_val.Im + a_val.Im * b_val.Re) / abs;
    return {'Re':re, 'Im':im};
}