# Fourier Transform
Details of each file are shown below.

## Reference
### FT Class (in "ft.js")
In this class, DFT (Discrete Fourier Transform) and FFT (Fast Fourier Transform) are implemented. Furthermore, visualization method also be implemented (2017/08/25).

#### <u>Constructor</u>

```js
function FT(nsample, f , type)
```

It returns an object for Fourier Tranform.
<table>
  <tr>
    <th>arguments</th><th>type</th><th>description</th>
  </tr>
  <tr>
    <td>nsample</td><td>number</td><td>the number of samples</td>
  </tr>
  <tr>
    <td>f</td><td>number</td><td>frquency [Hz]</td>
  </tr>
  <tr>
    <td>type</td><td>string</td><td>"fft" or "dft"</td>
  </tr>
</table>

#### <u>DFT</u>

```js
function dft(data)
```
It returns a spectrum object calculated by DFT, which has "Re" and "Im" property.
<table>
  <tr>
    <th>arguments</th><th>type</th><th>description</th>
  </tr>
  <tr>
    <td>data</td><td>Array</td><td>array of real numbers</td>
  </tr>
</table>

#### <u>FFT</u>

```js
function fft(data)
```
It returns a spectrum object calculated by FFT, which has "Re" and "Im" property.
<table>
  <tr>
    <th>arguments</th><th>type</th><th>description</th>
  </tr>
  <tr>
    <td>data</td><td>Array</td><td>array of real numbers</td>
  </tr>
</table>

#### <u>Visualization</u>

```js
function drawSpec(spec)
```

It shows line chart of spectrum using CanvasJS (https://www.google.co.jp/search?rlz=1C1NDCM_jaJP728JP728&q=canvasJS+credit&spell=1&sa=X&ved=0ahUKEwiCvdKUxPHVAhVGTLwKHSA2DK0QvwUIJSgA&biw=799&bih=684).

<table>
  <tr>
    <th>arguments</th><th>type</th><th>description</th>
  </tr>
  <tr>
    <td>spec</td><td>Array (Complex Object)</td><td>a spectrum obtained by dft or fft function.</td>
  </tr>
</table>


## Dependencies
For basic calculation of complex number (such as addition, subtraction, multiplication, division, and exponential), we use "Complex Class" in file "complex.js".


## Others
The pdf file "FourierTransform.pdf" contains the explanation of the theory and the derivation of the formula in Japanese.

At the last part, it describes an idea for implementation of FFT.
