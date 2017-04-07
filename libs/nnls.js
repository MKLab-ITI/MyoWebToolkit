/**
 *     nnls Linear least squares with nonnegativity constraints.
 X = nnls(C,d) returns the vector X that minimizes NORM(d-C*X)
 subject to X >= 0. C and d must be real.

 X = nnls(C,d,X0) uses X0 as the starting point if all(X0 > 0);
 otherwise the default is used. The default start point is the
 origin

 *
 *
 */

class nnls {

    constructor(C){
        this.eps = 2.2204460492503130808472633361816E-16;
        this.tol = 10 * this.eps * norm1(C) * maxlength(C);
        this.output = new Object();
        this.output.iter = 0;
    }

    run(C,d,x0){

        var msg = "";

        var dims = numeric.dim(C);
        var m = dims[0];
        var n = dims[1];

        // P has zeros
        var P = new Array(n).fill(-1);

        // Z has incremental values from 0 to n
        var Z = new Array(n);
        for (var i=0; i<n; i++)
            Z[i] = i;

        var x = new Array(n).fill(0);

        // copy Z to ZZ
        var ZZ = Z.slice(0);

        // 1st residual   resid = d - C*x
        var resid = numeric.sub(d, numeric.dot(C,x));

         // w
        var w = numeric.dot(numeric.transpose(C), resid);

        // set up iteration criterion
        var outeriter = 0;
        var iter = 0;
        var itmax = 3*n;
        var exitflag = 1;

        // outer loop to put variables into set to hold positive coefficients
        //while ( numeric.any(Z) && any(w(ZZ) > tol)  ){

        while ( numeric.any(Z) && numeric.any(  numeric.gt(selArr(w,ZZ), this.tol) )  ) {

            outeriter += 1;
            var t = indexOfMax(selArr(w,ZZ));
            t = ZZ[t];
            P[t] = t;
            Z[t] = -1;

            var PP = findM1(P);
            var ZZ = findM1(Z);
            var CP = setCols(C, PP);
            CP = setZerosAtCols(CP, ZZ);
            var z = numeric.dot(pinv(CP), d);
            z = setZerosAtCols(z, ZZ); // at z array

            //inner loop to remove elements from the positive set which no longer belong
            while (  numeric.any(numeric.leq(selArr(z,PP), this.tol))  ){
                iter += 1;
                //console.log('internal loop');
                if (iter > itmax){
                    //var msg  ="Exiting: Iteration count is exceeded, exiting nnls. Try raising the tolerance.";
                    //console.warn(msg);
                    exitflag = 0;
                    this.output.iter = outeriter;
                    this.output.message = msg;
                    var resnorm =  numeric.norm2Squared(resid); //  numeric.sum(numeric.mul(resid,resid));
                    var x = z.slice(0);
                    var lambda = w.slice(0);
                    return [x,resnorm,resid,exitflag,this.output,lambda];
                }
                var QQ = find( numeric.and(numeric.leq(z, this.tol), P));
                var xQQ = selArr(x, QQ);
                var zQQ = selArr(z, QQ);
                var xQQzQQ = numeric.div(xQQ, numeric.sub( xQQ, zQQ)  );
                var alpha = arrayMin(xQQzQQ);
                x = numeric.add(x, numeric.mul(alpha, numeric.sub(z,x)));
                var abstol = numeric.lt( x.map( Math.abs ), this.tol);
                var Pn0 = numeric.neq(P, -1);
                var absP = numeric.and(abstol, Pn0);
                var ij = indicesOfTrues(absP);
                Z = setToArrayArrayElements(Z, ij);
                P = setM1AtCols(P, ij);
                PP = findM1(P);
                ZZ = findM1(Z);
                var nzz = numeric.dim(ZZ);
                var CP = setCols(C, PP);
                CP = setZerosAtCols(CP, ZZ);
                var z = numeric.dot(pinv(CP), d);
                z = setZerosAtCols(z, ZZ); // at z array
            }
            var x = z.slice(0);
            var resid = numeric.sub(d, numeric.dot(C,x));
            var w = numeric.dot(numeric.transpose(C), resid);
        }

        lambda = w.slice(0);
        resnorm = numeric.norm2Squared(resid);

        console.log(resid);

        this.output.iter = outeriter;
        this.output.algorithm = 'active-set using svd';
        msg = 'Optimization terminated.';
        this.output.message = msg;
        return [x,resnorm,resid,exitflag,this.output,lambda]
    }
}