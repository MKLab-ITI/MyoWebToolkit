function ppr(A){
    console.log(numeric.prettyPrint(A));
}


function nn(A){
    return numeric.neg(A);
}

function na(A,B){

    return numeric.add(A,B);
}

function nd(A,B){
    return numeric.dot(A,B);
}

function ns(A,B){
    return numeric.sub(A,B);
}


/**
 * Find negative values indices in an array
 *
 *
 */
function findNeg(a){

    var res = [];
    for (var i=0; i< a.length; i++)
        if (a[i]<0)
            res.push(i);

    return res;

}


/**
 * concatenate the lines of two matrices
 *
 * [[1,2],[3,4]] with [[5,6],[7,8]]  = [[1,2,5,6],[3,4,7,8]]
 *
 */
function concatLines(A,B){

    var dA = numeric.dim(A);
    var dB = numeric.dim(B);




    var res = initMatrix(dA[0], dA[1] + dB[1] );

    // pass A
    for (var i=0; i<dA[0]; i++)
        for (var j=0; j<dA[1]; j++)
            res[i][j] = A[i][j];



    // pass B
    for (var i=0; i<dB[0]; i++)
        for (var j=0; j<dB[1]; j++)
            res[i][j+dA[1]] = B[i][j];




    return res;

}


/**
 * sum values of an array
 */
function sum(d){

    return d.reduce((a, b) => a + b, 0);
}

/**
 * Maximum dimension of a matrix
 * @param array
 */

function maxlength(array){
    dims = numeric.dim(array);
    return arrayMax(dims);
}

/**
 * Maximum value in the array
 *
 * @param array
 * @returns {Mixed|*}
 */

function arrayMax(array) {
    return array.reduce((a, b) => Math.max(a, b));
}


/**
 * Minimum value in the array
 *
 * @param array
 * @returns {Mixed|*}
 */
function arrayMin(array) {

    try {
        var minv = array.reduce((a, b) => Math.min(a, b));
    } catch (e){
        //console.log(e);
        return 0;
    }



    return minv;
}

// Arrays A, B (1 d)
// return selection of elements of by the indices of B: A(B)
function selArr(A,B){

    var n = B.length;
    var C = new Array(n);

    for (var i=0; i<n; i++)
        C[i] = A[B[i]];

    return C;
}


function selArrM1(A,B){

    var n = B.length;
    var C = new Array(n);

    for (var i=0; i<n; i++)
        C[i] = A[B[i]-1];

    return C;
}


// return positive only elements
function find(A){

    return A.filter(function(x){ return x > 0 });

}

function findM1(A){

    return A.filter(function(x){ return x > -1 });

}


function indicesOfTrues(A){

    var b = [];

    for (var i=0; i< A.length; i++)
        if ( A[i] == true)
            b.push(i);

    return b;

}






// Return index of greatest value in an array
function indexOfMax(arr) {
    if (arr.length === 0) {
        return -1;
    }

    var max = arr[0];
    var maxIndex = 0;

    for (var i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            maxIndex = i;
            max = arr[i];
        }
    }

    return maxIndex;
}


// Return index of second greatest value in an array
function indexOfSecondMax(t, arr) {

    if (arr.length === 0)
        return -1;


    var arr2 = arr.slice();
    // remove the max
    arr2.splice(t, 1);

    var maxval = arr2[0];

    // find the max
    for (var i = 1; i < arr2.length; i++)
        if (arr2[i] > maxval)
             maxval = arr2[i];



    return arr.indexOf(maxval);
}


/**
 * The largest column sum
 *
 * @param A  matrix
 */
function norm1(A){

    var dims = numeric.dim(A);

    var ncols =  dims[1];
    var nrows =  dims[0];
    var sums = new Array(ncols);

    for (var j=0; j< ncols; j++) {
        sums[j] = 0;
        for (var i = 0; i < nrows; i++) {
            sums[j] += A[i][j];
        }
    }


    return this.arrayMax(sums);
}


// init matrix
function initMatrix(nrows, ncols){
    return new Array(nrows).fill(0).map(row => new Array(ncols).fill(0));
}

// set columns of matrix B to M cols according to index indices of A
function setCols(M, A){

    var dims = numeric.dim(M);
    var m = dims[0];
    var n = dims[1];
    var q = A.length;
    var B = initMatrix(m, n);

    for (var i=0; i<m; i++)
        for (var j=0; j<q; j++)
            B[i][A[j]] = M[i][A[j]];

    return B;
}


function setColsM1(M, A){

    var dims = numeric.dim(M);
    var m = dims[0];
    var n = dims[1];
    var q = A.length;
    var B = initMatrix(m, n);

    sh('B:' + numeric.prettyPrint(B));

    for (var i=0; i<m; i++)
        for (var j=0; j<q; j++)
            B[i][A[j]-1] = M[i][A[j]-1];

    return B;
}







function setZerosAtCols(M, B){

    var dims = numeric.dim(M);
    var m = dims[0];
    var n = dims[1];
    var A = M.slice(0);

    if (typeof n==="undefined"){ // array only

        for (var i = 0; i < B.length; i++)
            A[B[i]] = 0;


    } else {

        for (var i = 0; i < m; i++)
            for (var j = 0; j < B.length; j++)
                A[i][B[j]] = 0;
    }


    return A;
}


function setM1AtCols(M, B){

    var dims = numeric.dim(M);
    var m = dims[0];
    var n = dims[1];
    var A = M.slice(0);

    if (typeof n==="undefined"){ // array only
        for (var i = 0; i < B.length; i++)
            A[B[i]] = -1;
    } else {
        for (var i = 0; i < m; i++)
            for (var j = 0; j < B.length; j++)
                A[i][B[j]] = -1;
    }

    return A;
}



function setZerosAtColsM1(M, B){

    var dims = numeric.dim(M);
    var m = dims[0];
    var n = dims[1];
    var A = M.slice(0);

    if (typeof n==="undefined"){ // array only
        for (var i = 0; i < B.length; i++)
            A[B[i] - 1] = 0;
    } else {
        for (var i = 0; i < m; i++)
            for (var j = 0; j < B.length; j++)
                A[i][B[j] - 1] = 0;
    }


    return A;
}


/**
 * Set A(B) = numeric.sum(B,1);
 *
 * @param A
 * @param B
 */
function setToArrayArrayElements(A,B){
    n = B.length;
    var C = A.slice(0);

    for (var i=0; i<n; i++)
        C[B[i]] = B[i];

    return C;
}


function findZeroCols(A){

    var res = [];

    var dims = numeric.dim(A);
    var m = dims[0];
    var n = dims[1];

    for (var j=0; j<n; j++){
        var counter = 0;
        for (var i=0; i<m; i++){
            if (A[i][j] == 0)
                counter += 1;
        }
        if (counter == m)
            res.push(j);
    }

    return res
}


function mat2d(nrows,ncols){
    return Array(nrows).fill().map(()=>Array(ncols).fill(0));
}


function incrArray(n){
    var A = new Array(n);
    for (var i=0; i<n; i++)
        A[i] = i;

    return A;
}

function pinv(Ainit) {
    var zeroCols = findZeroCols(Ainit);

    var A = Ainit.slice(0);

    //=== Ververidis : remove first cols so that A become square matrix ========
    var dims = numeric.dim(A);
    var m_init = dims[0];
    var n_init = dims[1];

    var n_to_remove = n_init - m_init;
    var allCols = incrArray(n_init);

    // difference between allCos and zeroCols
    var nonZero = allCols.filter(x => zeroCols.indexOf(x) == -1);

    // When the non zero cols is less than the rows
    var whichCol = 0;
    while (nonZero.length < m_init) {
        nonZero.push(zeroCols[whichCol]);
        whichCol ++;
    }

    // sort ascending
    nonZero.sort(function(a, b){return a-b});

    for (var j=0; j<m_init; j++)
        A[j] = selArr(A[j], nonZero);
    //======================================================================
    var z = numeric.svd(A);

    var foo = z.S[0];
    var U = z.U, S = z.S, V = z.V;

    var m = A.length;
    var n = A[0].length;
    var tol = Math.max(m,n)*numeric.epsilon*foo;
    var M = S.length;
    var i,Sinv = new Array(M);

    for(i=M-1;i!==-1;i--) {
        if(S[i]>tol)
            Sinv[i] = 1/S[i];
        else
            Sinv[i] = 0;
    }

    var res = numeric.dot(numeric.dot(V,numeric.diag(Sinv)),numeric.transpose(U));

    //======= Ververidis : Append zero  ======
    // find which lines to append
    var appendLinesZero = allCols.filter(x => nonZero.indexOf(x) == -1);
    var output = mat2d(n_init, m_init);

    var k = 0;
    for (var i=0; i < n_init; i++){
        if (!appendLinesZero.includes(i)){
             output[i] = res[k];
             k++;
        }
    }
    //==================================================================

    return output;
}


function sm(name,A){
    sh(name,numeric.prettyPrint(A));
}

function sh(name,A){
    console.log(name,A);
}