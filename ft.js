function FT(nsample, f, type) {
    // the number of samples
    this.nsample = Number(nsample);
    this.f = Number(f);
    
    // frequencies
    this.freq = new Array(this.nsample);
    var f0 = this.f / this.nsample;
    for(var i = 0; i < this.nsample; ++i) {
        this.freq[i] = i * f0;
    }

    // angles
    if (type == 'dft') {
        this.thetaArr = new Array(this.nsample);
        for (var i = 0; i < this.nsample; ++i) {
            var thetaVec = new Array(this.nsample);
            for (var j = 0; j < this.nsample; ++j) {
                thetaVec[j] = -2 * Math.PI / this.nsample * i * j;
            }
            this.thetaArr[i] = thetaVec;
        }
    }

    // W
    if (type == 'fft') {
        this.W = [];
        for (var i = 0; i < this.nsample; ++i) {
            var theta = -2 * Math.PI / this.nsample * i;
            var buf = Complex.exp(Complex.init(0, theta));
            this.W.push(buf);
        }
    }

    // discrete fourier transform method
    this.dft = function(data) {
        if (data.length != this.nsample) { return undefined; }

        var spec = [];
        for (var i = 0; i < this.nsample; ++i) {
            var buf = Complex.init();
            for (var j = 0; j < this.nsample; ++j) {
                buf = Complex.add(
                    buf, 
                    Complex.sca(
                        data[j], 
                        Complex.exp(
                            Complex.init(0, this.thetaArr[i][j])
                        )
                    )
                );
            }
            spec.push(buf);
        }

        return spec;
    }

    // fast fourier transform
    this.fft = function(data) {
        if (!(data.length == this.nsample)) { return undefined; }

        var MAX_ITER = Math.log2(this.nsample);
        
        var buf_idx = [];
        var buf_spec = [];
        var idx = new Array(this.nsample);
        var spec = new Array(this.nsample);
        for (var i = 0; i < this.nsample; ++i) {
            idx[i] = i;
            spec[i] = {'Re':data[i], 'Im':0};
        }

        for (var iter = 1; iter <= MAX_ITER; ++iter) {
            buf_idx = [];
            buf_spec = [];
            var ndiv = Math.pow(2, iter);
            var w = this.nsample / ndiv;
            for (var i = 0; i < ndiv / 2; ++i) {
                // even pattern
                for (var j = 0; j < w; ++j) {
                    buf_idx.push(idx[i * (2 * w) + j * 2]);
                    buf_spec.push(
                        Complex.add(
                            spec[i * (2 * w) + j], 
                            Complex.mul(
                                this.W[buf_idx[i * (2 * w)] * w], 
                                spec[i * (2 * w) + w + j]
                            )
                        )
                    );
                }
                // odd pattern
                for (var j = 0; j < w; ++j) {
                    buf_idx.push(idx[i * (2 * w) + j * 2 + 1]);
                    buf_spec.push(
                        Complex.add(
                            spec[i * (2 * w) + j], 
                            Complex.mul(
                                this.W[buf_idx[i * (2 * w) + w] * w], 
                                spec[i * (2 * w) + w + j]
                            )
                        )
                    );
                }
            }
            idx = buf_idx;
            spec = buf_spec;
        }

        buf_spec = spec.slice(0, spec.length);
        for (var i = 0; i < this.nsample; ++i) {
            spec[i] = buf_spec[idx[i]];
        }

        return spec;
    }

    this.drawSpec = function(spec) {
        var re = [], im = [];
        for (var i = 0; i < this.nsample; ++i) {
            re.push({x: this.freq[i], y: Number(spec[i].Re.toFixed(2))});
            im.push({x: this.freq[i], y: Number(spec[i].Im.toFixed(2))});
        }

        var chart = new CanvasJS.Chart("container",
        {
            data:[
                {
                    type: 'line',
                    dataPoints: re,
                    markerType: 'none',
                    lineThickness: 1
                },
                {
                    type: 'line',
                    dataPoints: im,
                    markerType: 'none',
                    lineThickness: 1
                }
            ] 
        });
        chart.render();
    }
}



window.onload = function() {
    var f = 1024;
    var nsample = 1024;
    var vec = new Array(nsample);
    for (var i = 0; i < nsample; ++i) {
        vec[i] = 2 * Math.random() - 1;
    }

    // FFT
    var fft = new FT(nsample, f, 'fft');
    var fft_spec = fft.fft(vec);
    fft.drawSpec(fft_spec);

    // DFT
    var dft = new FT(nsample, f, 'dft');
    var dft_spec = dft.dft(vec);

    var str = '<table border="1" cellspacing="0" cellpadding="10"><tr align="center">';
    for (var i = 0; i < fft_spec.length; ++i) {
        str += '<td>' + String(fft_spec[i].Re.toFixed(2)) + "</td>";
    }
    str += '</tr><tr align="center">'
    for (var i = 0; i < fft_spec.length; ++i) {
        str += '<td>' + String(fft_spec[i].Im.toFixed(2)) + "</td>";
    }
    str += '</tr><tr align="center">'
    for (var i = 0; i < dft_spec.length; ++i) {
        str += '<td>' + String(dft_spec[i].Re.toFixed(2)) + "</td>";
    }
    str += '</tr><tr align="center">'
    for (var i = 0; i < dft_spec.length; ++i) {
        str += '<td>' + String(dft_spec[i].Im.toFixed(2)) + "</td>";
    }
    str += '</tr></table>'

    document.getElementById("result").innerHTML = str;
}
