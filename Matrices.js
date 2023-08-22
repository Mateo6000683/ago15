const color = document.querySelector("#color");
color.addEventListener("change", (e)=> {
    document.body.style.backgroundColor=input.value;
})
function byId(id) {
    return document.getElementById(id).value;
}

function strarr2num(arreglo, lim) {
    var arrs = arreglo.split(lim);
    arrn = [];
    arrs.forEach((elem) => {
        arrn.push(Number(elem));
    });
    return arrn;
}

function matrizTraslacion(tx, ty, tz) {
    return [
        [1, 0, 0, tx],
        [0, 1, 0, ty],
        [0, 0, 1, tz],
        [0, 0, 0, 1]
    ];
}

function matrizEscalado(sx, sy, sz) {
    return [
        [sx, 0, 0, 0],
        [0, sy, 0, 0],
        [0, 0, sz, 0],
        [0, 0, 0, 1]
    ];
}

function matrizRotacionX(theta) {
    var cosTheta = Math.cos(theta);
    var sinTheta = Math.sin(theta);
    return [
        [1, 0, 0, 0],
        [0, cosTheta, -sinTheta, 0],
        [0, sinTheta, cosTheta, 0],
        [0, 0, 0, 1]
    ];
}

function matrizRotacionY(theta) {
    var cosTheta = Math.cos(theta);
    var sinTheta = Math.sin(theta);
    return [
        [cosTheta, 0, sinTheta, 0],
        [0, 1, 0, 0],
        [-sinTheta, 0, cosTheta, 0],
        [0, 0, 0, 1]
    ];
}

function matrizRotacionZ(theta) {
    var cosTheta = Math.cos(theta);
    var sinTheta = Math.sin(theta);
    return [
        [cosTheta, -sinTheta, 0, 0],
        [sinTheta, cosTheta, 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1]
    ];
}

function multiplicarMatrizVector(matriz, vector) {
    var resultado = [];
    for (var i = 0; i < matriz.length; i++) {
        var sum = 0;
        for (var j = 0; j < vector.length; j++) {
            sum += matriz[i][j] * vector[j];
        }
        resultado.push(sum);
    }
    return resultado;
}

function traslacion() {
    var vo = strarr2num(byId("vo"), ",");
    var tx = parseFloat(byId("tx"));
    var ty = parseFloat(byId("ty"));
    var tz = parseFloat(byId("tz"));

    var matrizTrasl = matrizTraslacion(tx, ty, tz);
    vo.push(1);
    var resultado = multiplicarMatrizVector(matrizTrasl, vo);

    document.getElementById("vr_tr").value = resultado.slice(0, 3).join(", ");
}

function escalado() {
    var voe = strarr2num(byId("voe"), ",");
    var sx = parseFloat(byId("sx"));
    var sy = parseFloat(byId("sy"));
    var sz = parseFloat(byId("sz"));

    var matrizEscal = matrizEscalado(sx, sy, sz);
    voe.push(1);
    var resultado = multiplicarMatrizVector(matrizEscal, voe);

    document.getElementById("vr_sc").value = resultado.slice(0, 3).join(", ");
}

function rotacion() {
    var vor = strarr2num(byId("vor"), ",");
    var angleX = parseFloat(byId("angleX")) * (Math.PI / 180.0); // Convertir a radianes
    var angleY = parseFloat(byId("angleY")) * (Math.PI / 180.0); // Convertir a radianes
    var angleZ = parseFloat(byId("angleZ")) * (Math.PI / 180.0); // Convertir a radianes

    var matrizRotX = matrizRotacionX(angleX);
    var matrizRotY = matrizRotacionY(angleY);
    var matrizRotZ = matrizRotacionZ(angleZ);

    vor.push(1);
    var resultado = multiplicarMatrizVector(matrizRotZ, multiplicarMatrizVector(matrizRotY, multiplicarMatrizVector(matrizRotX, vor)));

    document.getElementById("vr_rot").value = resultado.slice(0, 3).join(", ");
}